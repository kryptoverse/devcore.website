'use client';

import type Vapi from '@vapi-ai/web';

/**
 * Browser (web) calling with the Vapi voice agent.
 *
 * Only the PUBLIC key is used here — it is designed to be shipped to the browser.
 * The private key must never be exposed client-side (i.e. never NEXT_PUBLIC_*).
 */
export const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '';

/** Assistant ID falls back to the deployed agent so the widget works without extra config. */
export const VAPI_ASSISTANT_ID =
  process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '11c4d4b9-1f3f-4c2e-b140-7430ac8a51f2';

export const isVapiConfigured = Boolean(VAPI_PUBLIC_KEY && VAPI_ASSISTANT_ID);

/**
 * Guard rails for a public portfolio: the public key is visible to anyone, so cap
 * how much a single visitor can spend of the Vapi balance.
 */
export const CALL_LIMITS = {
  /** Hard stop for a single call. */
  maxDurationSeconds: 300,
  /** Start showing the countdown this many seconds before the hard stop. */
  warnAtSecondsLeft: 45,
  /** Calls a single browser can start per day. */
  maxCallsPerDay: 5,
} as const;

let vapiPromise: Promise<Vapi> | null = null;

/**
 * Loads the SDK on demand — it pulls in daily-js, which is far too heavy to sit in
 * the initial bundle of a portfolio that is mostly animation work.
 */
export function loadVapi(): Promise<Vapi> {
  if (!vapiPromise) {
    vapiPromise = import('@vapi-ai/web')
      .then(({ default: VapiClient }) => new VapiClient(VAPI_PUBLIC_KEY))
      .catch((error) => {
        vapiPromise = null;
        throw error;
      });
  }
  return vapiPromise;
}

/** Warms the chunk so clicking "start call" does not wait on a network fetch. */
export function prefetchVapi(): void {
  if (!isVapiConfigured) return;
  void loadVapi().catch(() => {});
}

const QUOTA_KEY = 'voice-agent-quota';

const today = (): string => new Date().toISOString().slice(0, 10);

function readQuota(): { day: string; count: number } {
  try {
    const raw = window.localStorage.getItem(QUOTA_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { day?: string; count?: number };
      if (parsed?.day === today() && typeof parsed.count === 'number') {
        return { day: parsed.day, count: parsed.count };
      }
    }
  } catch {}
  return { day: today(), count: 0 };
}

export function callsRemaining(): number {
  if (typeof window === 'undefined') return CALL_LIMITS.maxCallsPerDay;
  return Math.max(0, CALL_LIMITS.maxCallsPerDay - readQuota().count);
}

export function consumeCallQuota(): void {
  if (typeof window === 'undefined') return;
  const quota = readQuota();
  try {
    window.localStorage.setItem(
      QUOTA_KEY,
      JSON.stringify({ day: quota.day, count: quota.count + 1 }),
    );
  } catch {}
}

/** Fired by any CTA that wants to pop the voice widget open. */
export const VOICE_AGENT_OPEN_EVENT = 'voice-agent:open';

export function openVoiceAgent(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(VOICE_AGENT_OPEN_EVENT));
}

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
