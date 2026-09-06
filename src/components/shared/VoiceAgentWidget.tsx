'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type Vapi from '@vapi-ai/web';
import { Mic, MicOff, PhoneCall, PhoneOff, Waves, X } from 'lucide-react';
import { EASE } from '@/lib/motion';
import { site } from '@/lib/site';
import { useReducedMotion } from '@/lib/useReducedMotion';
import {
  CALL_LIMITS,
  VAPI_ASSISTANT_ID,
  VOICE_AGENT_OPEN_EVENT,
  callsRemaining,
  consumeCallQuota,
  formatDuration,
  isVapiConfigured,
  loadVapi,
  prefetchVapi,
} from '@/lib/vapi';

type CallStatus = 'idle' | 'connecting' | 'active' | 'ending';

type TranscriptLine = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

const MAX_LINES = 40;
const IDLE_RING_OPACITY = 0.12;
const CONNECT_TIMEOUT_MS = 30000;

const STATUS_COPY: Record<CallStatus, string> = {
  idle: 'Ready when you are',
  connecting: 'Connecting…',
  active: 'Listening',
  ending: 'Ending call…',
};

function describeError(error: unknown): string {
  const raw =
    typeof error === 'string'
      ? error
      : ((error as any)?.errorMsg ??
        (error as any)?.error?.message ??
        (error as any)?.message ??
        (error as any)?.msg ??
        '');
  const text = String(raw);

  if (/permission|notallowed|denied/i.test(text)) {
    return 'Microphone access was blocked. Allow it in your browser and try again.';
  }
  if (/notfound|no audio|device/i.test(text)) {
    return 'No microphone found. Plug one in and try again.';
  }
  if (/eject|meeting has ended|room/i.test(text)) {
    return 'The call ended unexpectedly. Give it another go.';
  }
  if (/wallet|balance|exceed|quota|limit/i.test(text)) {
    return 'The agent is out of credits right now. Please reach out by email instead.';
  }
  return text ? `Call failed: ${text}` : 'Something went wrong starting the call.';
}

const VoiceAgentWidget = () => {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<CallStatus>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [lines, setLines] = useState<TranscriptLine[]>([]);
  const [partial, setPartial] = useState<TranscriptLine | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number>(CALL_LIMITS.maxCallsPerDay);

  const vapiRef = useRef<Vapi | null>(null);
  const detachRef = useRef<(() => void) | null>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const micRingRef = useRef<HTMLDivElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const agentVolumeRef = useRef(0);
  const micVolumeRef = useRef(0);
  const reduced = useReducedMotion();

  const isBusy = status === 'connecting' || status === 'ending';
  const isLive = status === 'active';
  const secondsLeft = CALL_LIMITS.maxDurationSeconds - elapsed;

  /* Stay out of the way until the preloader curtain is gone. */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.__preloaderDone) {
      setReady(true);
      return;
    }
    const onDone = () => setReady(true);
    window.addEventListener('preloaderComplete', onDone);
    return () => window.removeEventListener('preloaderComplete', onDone);
  }, []);

  useEffect(() => {
    setRemaining(callsRemaining());
  }, [status]);

  /* Any CTA on the page can pop the panel open. */
  useEffect(() => {
    const onOpen = () => {
      setReady(true);
      setOpen(true);
      prefetchVapi();
    };
    window.addEventListener(VOICE_AGENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(VOICE_AGENT_OPEN_EVENT, onOpen);
  }, []);

  const resetCallState = useCallback(() => {
    detachRef.current?.();
    detachRef.current = null;
    agentVolumeRef.current = 0;
    micVolumeRef.current = 0;
    setStatus('idle');
    setIsAgentSpeaking(false);
    setIsMuted(false);
    setPartial(null);
    setElapsed(0);
  }, []);

  const attachListeners = useCallback(
    (vapi: Vapi) => {
      detachRef.current?.();

      const onCallStart = () => {
        setStatus('active');
        setElapsed(0);
        setIsMuted(vapi.isMuted());
      };
      const onCallEnd = () => resetCallState();
      const onSpeechStart = () => setIsAgentSpeaking(true);
      const onSpeechEnd = () => setIsAgentSpeaking(false);
      const onVolume = (volume: number) => {
        agentVolumeRef.current = Number.isFinite(volume) ? volume : 0;
      };
      const onLocalVolume = (volume: number) => {
        micVolumeRef.current = Number.isFinite(volume) ? volume : 0;
      };
      const onMessage = (message: any) => {
        if (message?.type !== 'transcript') return;
        const text = String(message.transcript ?? '').trim();
        if (!text) return;
        const role: TranscriptLine['role'] = message.role === 'assistant' ? 'assistant' : 'user';

        if (message.transcriptType === 'partial') {
          setPartial({ id: 'partial', role, text });
          return;
        }
        setPartial(null);
        setLines((prev) => [
          ...prev.slice(-(MAX_LINES - 1)),
          { id: `${Date.now()}-${prev.length}`, role, text },
        ]);
      };
      const onError = (err: any) => {
        setError(describeError(err));
        resetCallState();
      };

      vapi.on('call-start', onCallStart);
      vapi.on('call-end', onCallEnd);
      vapi.on('speech-start', onSpeechStart);
      vapi.on('speech-end', onSpeechEnd);
      vapi.on('volume-level', onVolume);
      vapi.on('local-volume-level', onLocalVolume);
      vapi.on('message', onMessage);
      vapi.on('error', onError);

      detachRef.current = () => {
        vapi.removeListener('call-start', onCallStart);
        vapi.removeListener('call-end', onCallEnd);
        vapi.removeListener('speech-start', onSpeechStart);
        vapi.removeListener('speech-end', onSpeechEnd);
        vapi.removeListener('volume-level', onVolume);
        vapi.removeListener('local-volume-level', onLocalVolume);
        vapi.removeListener('message', onMessage);
        vapi.removeListener('error', onError);
      };
    },
    [resetCallState],
  );

  const endCall = useCallback(async () => {
    const vapi = vapiRef.current;
    if (!vapi) return;
    setStatus('ending');
    try {
      await vapi.stop();
    } catch {
      /* the call-end listener still resets us */
    }
    resetCallState();
  }, [resetCallState]);

  const startCall = useCallback(async () => {
    if (status !== 'idle') return;

    if (callsRemaining() <= 0) {
      setError(
        `You have used your ${CALL_LIMITS.maxCallsPerDay} demo calls for today. Email me instead — ${site.email}.`,
      );
      return;
    }

    setError(null);
    setLines([]);
    setPartial(null);
    setStatus('connecting');

    try {
      const vapi = await loadVapi();
      vapiRef.current = vapi;
      attachListeners(vapi);
      consumeCallQuota();
      setRemaining(callsRemaining());
      await vapi.start(VAPI_ASSISTANT_ID);
    } catch (err) {
      setError(describeError(err));
      resetCallState();
    }
  }, [attachListeners, resetCallState, status]);

  /* Call timer plus the hard stop that protects the Vapi balance. */
  useEffect(() => {
    if (!isLive) return;
    const timer = window.setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (next >= CALL_LIMITS.maxDurationSeconds) {
          void endCall();
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [endCall, isLive]);

  /* Never leave a visitor staring at "Connecting…" if the room never comes up. */
  useEffect(() => {
    if (status !== 'connecting') return;
    const timeout = window.setTimeout(() => {
      setError('Could not reach the agent. Check your connection and try again.');
      void vapiRef.current?.stop();
      resetCallState();
    }, CONNECT_TIMEOUT_MS);
    return () => window.clearTimeout(timeout);
  }, [resetCallState, status]);

  /* Voice-reactive orb: driven straight off refs so audio never triggers re-renders. */
  useEffect(() => {
    const orb = orbRef.current;
    const micRing = micRingRef.current;
    if (!open || !isLive || reduced || !orb || !micRing) return;

    let frame = 0;
    let agent = 0;
    let mic = 0;

    const tick = () => {
      agent += (agentVolumeRef.current - agent) * 0.18;
      mic += (micVolumeRef.current - mic) * 0.18;
      orb.style.transform = `scale(${1 + agent * 0.45})`;
      micRing.style.transform = `scale(${1 + mic * 0.7})`;
      micRing.style.opacity = `${Math.min(0.75, IDLE_RING_OPACITY + mic * 1.2)}`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      orb.style.transform = '';
      micRing.style.transform = '';
      micRing.style.opacity = String(IDLE_RING_OPACITY);
    };
  }, [isLive, open, reduced]);

  /* Keep the newest line in view. */
  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, partial]);

  /* Esc closes the panel — it never hangs up on you by accident. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    return () => {
      detachRef.current?.();
      void vapiRef.current?.stop();
    };
  }, []);

  const toggleMute = () => {
    const vapi = vapiRef.current;
    if (!vapi || !isLive) return;
    const next = !vapi.isMuted();
    vapi.setMuted(next);
    setIsMuted(next);
  };

  if (!isVapiConfigured || !ready) return null;

  const feed = partial ? [...lines, partial] : lines;
  const statusLabel = isLive && isAgentSpeaking ? 'Speaking' : STATUS_COPY[status];

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[9970] pointer-events-none">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Voice agent"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: reduced ? 0.2 : 0.4, ease: EASE.curtain }}
            className="pointer-events-auto w-[calc(100vw-2rem)] max-w-[368px] rounded-3xl border border-elevated-dark bg-surface/95 backdrop-blur-xl text-light shadow-2xl overflow-hidden"
            style={{ transformOrigin: 'bottom left' }}
          >
            <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 border-b border-elevated-dark">
              <div>
                <p className="font-display text-sm font-black uppercase tracking-[0.14em] text-light">
                  Voice Agent
                </p>
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-warm mt-1"
                  aria-live="polite"
                >
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle ${
                      isLive ? 'bg-accent' : isBusy ? 'bg-accent-muted' : 'bg-gray-mid'
                    } ${isLive && !reduced ? 'animate-pulse' : ''}`}
                  />
                  {statusLabel}
                  {isLive && ` · ${formatDuration(elapsed)}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close voice agent"
                className="shrink-0 w-8 h-8 rounded-full border border-elevated-dark text-muted hover:text-accent hover:border-accent transition-colors duration-300 flex items-center justify-center cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <div className="px-5 pt-6 pb-4 flex flex-col items-center">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div
                  ref={micRingRef}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-accent/50"
                  style={{ opacity: IDLE_RING_OPACITY }}
                />
                {isLive && !reduced && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-2 rounded-full bg-accent/10 animate-ping"
                  />
                )}
                <div
                  ref={orbRef}
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, #E07A5F, #C45D3E 70%)',
                    willChange: 'transform',
                  }}
                >
                  <Waves size={22} strokeWidth={2.2} />
                </div>
              </div>

              <p className="mt-5 text-center text-sm text-gray-soft font-sans leading-relaxed max-w-[16rem]">
                {isLive
                  ? 'Ask about my stack, projects, availability or pricing.'
                  : `Talk to ${site.firstName}'s AI agent right from your browser — no dial-in, just your mic.`}
              </p>
            </div>

            {(feed.length > 0 || isLive) && (
              <div
                ref={transcriptRef}
                data-lenis-prevent
                className="mx-5 mb-4 h-36 overflow-y-auto rounded-2xl border border-elevated-dark bg-surface-mid/70 px-4 py-3 space-y-2.5"
              >
                {feed.length === 0 ? (
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-warm">
                    Say hello to get started…
                  </p>
                ) : (
                  feed.map((line) => (
                    <div key={line.id} className={line.role === 'user' ? 'text-right' : 'text-left'}>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-warm block mb-0.5">
                        {line.role === 'user' ? 'You' : 'Agent'}
                      </span>
                      <span
                        className={`inline-block text-[13px] leading-snug font-sans rounded-xl px-3 py-1.5 ${
                          line.role === 'user'
                            ? 'bg-accent/15 text-light'
                            : 'bg-elevated-dark text-gray-soft'
                        } ${line.id === 'partial' ? 'opacity-60' : ''}`}
                      >
                        {line.text}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            {error && (
              <p
                role="status"
                className="mx-5 mb-4 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-[12px] leading-relaxed text-accent-light font-sans"
              >
                {error}
              </p>
            )}

            <div className="px-5 pb-5 pt-1 border-t border-elevated-dark">
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={isLive ? endCall : startCall}
                  disabled={isBusy}
                  className={`flex-1 h-12 rounded-full font-display text-xs font-black uppercase tracking-[0.14em] inline-flex items-center justify-center gap-2 transition-colors duration-300 cursor-pointer disabled:cursor-wait disabled:opacity-70 ${
                    isLive
                      ? 'bg-elevated-dark text-light border border-white/10 hover:bg-elevated'
                      : 'bg-accent text-white hover:bg-accent-light'
                  }`}
                >
                  {isLive ? <PhoneOff size={16} /> : <PhoneCall size={16} />}
                  {isLive ? 'End call' : isBusy ? STATUS_COPY[status] : 'Start call'}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  disabled={!isLive}
                  aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                  aria-pressed={isMuted}
                  className={`w-12 h-12 shrink-0 rounded-full border flex items-center justify-center transition-colors duration-300 cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed ${
                    isMuted
                      ? 'border-accent text-accent bg-accent/10'
                      : 'border-elevated-dark text-muted hover:text-accent hover:border-accent'
                  }`}
                >
                  {isMuted ? <MicOff size={17} /> : <Mic size={17} />}
                </button>
              </div>

              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-warm/80 text-center">
                {isLive && secondsLeft <= CALL_LIMITS.warnAtSecondsLeft
                  ? `Call ends in ${formatDuration(Math.max(0, secondsLeft))}`
                  : `Mic required · ${Math.floor(CALL_LIMITS.maxDurationSeconds / 60)} min max · ${remaining} left today`}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="fab"
            type="button"
            onClick={() => setOpen(true)}
            onMouseEnter={prefetchVapi}
            onFocus={prefetchVapi}
            aria-label="Talk to my AI voice agent"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: reduced ? 0.2 : 0.45, ease: EASE.curtain }}
            className="group pointer-events-auto relative flex items-center h-14 px-[3px] rounded-full border border-elevated-dark bg-surface/95 backdrop-blur-xl text-light shadow-2xl hover:border-accent transition-colors duration-300 cursor-pointer"
          >
            <span className="relative shrink-0 w-[50px] h-[50px] rounded-full bg-accent flex items-center justify-center text-white">
              {isLive && !reduced && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-accent/40 animate-ping"
                />
              )}
              <Mic size={19} strokeWidth={2.2} className="relative" />
            </span>
            <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap font-display text-xs font-black uppercase tracking-[0.14em] transition-all duration-500 ease-out group-hover:max-w-[220px] group-hover:opacity-100 group-hover:px-4 group-focus-visible:max-w-[220px] group-focus-visible:opacity-100 group-focus-visible:px-4">
              {isLive ? `On call · ${formatDuration(elapsed)}` : 'Talk to my AI agent'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceAgentWidget;
