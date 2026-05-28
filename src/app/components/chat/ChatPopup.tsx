"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useChatStore } from "@/store/useChatStore";
import { format } from "date-fns";
import { X, Send, MessageCircle, Users, ChevronLeft, Search } from "lucide-react";
import { usePathname } from "next/navigation";

/* ─────────────────────────────────────────────────────────
   Atoms / sub-components used only inside this file
───────────────────────────────────────────────────────── */

/** The glowing pulse ring on the chat button */
const PulseRing = () => (
    <span className="absolute inset-0 rounded-full animate-ping bg-purple_blue opacity-30 pointer-events-none" />
);

/** Skeleton rows while users list is loading */
const UsersSkeleton = () => (
    <div className="flex flex-col gap-3 p-4">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
            </div>
        ))}
    </div>
);

/** Skeleton bubbles while messages are loading */
const MessagesSkeleton = () => (
    <div className="flex flex-col gap-3 p-4 flex-1 overflow-hidden">
        {[...Array(4)].map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"} animate-pulse`}>
                <div className={`h-8 rounded-2xl bg-gray-200 dark:bg-gray-700 ${i % 2 === 0 ? "w-48" : "w-36"}`} />
            </div>
        ))}
    </div>
);

/* ─────────────────────────────────────────────────────────
   Main ChatPopup component
───────────────────────────────────────────────────────── */
export default function ChatPopup() {
    const { data: session, status } = useSession();
    const pathname = usePathname();

    const {
        users,
        messages,
        selectedUser,
        isUsersLoading,
        isMessagesLoading,
        onlineUsers,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChatStore();

    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [unread, setUnread] = useState(false);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Don't show on the dedicated /chat page — no need for duplicate
    if (pathname === "/chat") return null;

    const isAuthenticated = status === "authenticated";
    const isAdmin = session?.user?.email === "kryptochaingames@gmail.com";

    // Backend already filters: customers only get admins, admins get everyone.
    // Apply client-side search on top of that.
    const filteredUsers = users.filter((user) =>
        user.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fetch users when popup opens and user is authenticated
    useEffect(() => {
        if (isOpen && isAuthenticated && session?.user?.accessToken) {
            getUsers(session.user.accessToken);
        }
    }, [isOpen, isAuthenticated, session?.user?.accessToken, getUsers]);

    // Auto-select admin for regular users as soon as users load
    useEffect(() => {
        if (!isAdmin && !selectedUser && users.length > 0) {
            // Backend guarantees the list contains only admins for customers.
            // Pick the first admin automatically so chat opens right away.
            const admin = users.find((u) => u.Role === "admin") ?? users[0];
            if (admin) setSelectedUser(admin);
        }
    }, [users, isAdmin, selectedUser, setSelectedUser]);

    // Fetch messages when a user is selected
    useEffect(() => {
        if (selectedUser?._id && session?.user?.accessToken) {
            getMessages(selectedUser._id, session.user.accessToken);
            subscribeToMessages();
        }
        return () => unsubscribeFromMessages();
    }, [selectedUser?._id, session?.user?.accessToken, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    // Auto-scroll to latest message
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Focus input when chat window appears
    useEffect(() => {
        if (selectedUser && isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [selectedUser, isOpen]);

    // Mark as unread when a message arrives and popup is closed
    useEffect(() => {
        if (!isOpen && messages.length > 0) {
            setUnread(true);
        }
    }, [messages.length, isOpen]);

    // Clear unread badge when popup opens
    useEffect(() => {
        if (isOpen) setUnread(false);
    }, [isOpen]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || !session?.user?.accessToken) return;
        try {
            await sendMessage({ message: text.trim() }, session.user.accessToken);
            setText("");
        } catch {
            // silent
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend(e as unknown as React.FormEvent);
        }
    };

    return (
        <>
            {/* ── Floating Trigger Button ── */}
            <div
                className="fixed bottom-[5.5rem] right-6 z-[9998] flex flex-col items-end gap-2"
                style={{ bottom: "calc(5.5rem)" }}
            >
                {/* Label pill — only show when closed */}
                {!isOpen && (
                    <span
                        className="
                            hidden sm:flex items-center gap-1.5
                            bg-dark_black dark:bg-white text-white dark:text-dark_black
                            text-xs font-medium px-3 py-1.5 rounded-full shadow-lg
                            cursor-pointer select-none
                            transition-all duration-200 hover:scale-105
                        "
                        onClick={() => setIsOpen(true)}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                        Chat with us
                    </span>
                )}

                {/* Circle button */}
                <button
                    id="chat-popup-trigger"
                    onClick={() => setIsOpen((v) => !v)}
                    aria-label={isOpen ? "Close chat" : "Open chat"}
                    className="
                        relative w-14 h-14 rounded-full shadow-2xl
                        bg-purple_blue hover:bg-[#3a1fe0]
                        text-white flex items-center justify-center
                        transition-all duration-300 hover:scale-110 active:scale-95
                        focus:outline-none focus:ring-2 focus:ring-purple_blue focus:ring-offset-2
                    "
                >
                    {!isOpen && <PulseRing />}
                    <span
                        className={`transition-all duration-300 ${isOpen ? "rotate-90 scale-110" : ""}`}
                    >
                        {isOpen ? <X size={22} strokeWidth={2.5} /> : <MessageCircle size={22} strokeWidth={2} fill="white" />}
                    </span>

                    {/* Unread badge */}
                    {unread && !isOpen && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-dark_black">
                            !
                        </span>
                    )}
                </button>
            </div>

            {/* ── Chat Popup Window ── */}
            <div
                id="chat-popup-window"
                className={`
                    fixed z-[9997]
                    /* mobile: full screen slide-up */
                    inset-0 sm:inset-auto
                    /* desktop: floating bottom-right */
                    sm:bottom-[9.5rem] sm:right-6
                    sm:w-[380px] sm:max-w-[calc(100vw-3rem)]
                    sm:h-[520px] sm:max-h-[calc(100vh-12rem)]
                    /* panel styles */
                    bg-white dark:bg-dark_black
                    border border-gray-200 dark:border-white/10
                    sm:rounded-2xl rounded-none
                    shadow-2xl
                    flex flex-col overflow-hidden
                    /* animation */
                    transition-all duration-300 ease-out
                    ${isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-4 pointer-events-none sm:translate-y-8"
                    }
                `}
                aria-hidden={!isOpen}
            >
                {/* ── Panel: Unauthenticated ── */}
                {!isAuthenticated && status !== "loading" && (
                    <UnauthenticatedPanel onClose={() => setIsOpen(false)} />
                )}

                {/* ── Panel: Loading session ── */}
                {status === "loading" && (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-purple_blue border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {/* ── Panel: Authenticated ── */}
                {isAuthenticated && (
                    <>
                        {/* Header */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-white/10 bg-white dark:bg-dark_black shrink-0">
                            {selectedUser ? (
                                <>
                                    <button
                                        onClick={() => setSelectedUser(null)}
                                        className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors"
                                        aria-label="Back to contacts"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <div className="w-8 h-8 rounded-full bg-purple_blue/20 flex items-center justify-center text-purple_blue font-bold text-sm shrink-0">
                                        {selectedUser.Name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm text-dark_black dark:text-white truncate leading-tight">
                                            {selectedUser.Name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {onlineUsers.includes(selectedUser._id) ? (
                                                <span className="text-green-500 font-medium">● Online</span>
                                            ) : (
                                                "Offline"
                                            )}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-8 h-8 rounded-full bg-purple_blue flex items-center justify-center shrink-0">
                                        <MessageCircle size={16} className="text-white" fill="white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm text-dark_black dark:text-white leading-tight">Chat with Developer</p>
                                        <p className="text-xs text-gray-500">
                                            {isAdmin ? "Select a contact to start" : "Connecting to developer…"}
                                        </p>
                                    </div>
                                </>
                            )}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="ml-auto text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors shrink-0"
                                aria-label="Close chat"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Body — Contacts list (only for admins, regular users auto-jump to chat) */}
                        {!selectedUser && (
                            <div className="flex flex-col flex-1 overflow-hidden">
                                {isAdmin ? (
                                    // Admin sees full searchable contacts list
                                    <>
                                        {/* Search */}
                                        <div className="px-4 py-2 border-b border-gray-100 dark:border-white/10 shrink-0">
                                            <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 rounded-lg px-3 py-2">
                                                <Search size={14} className="text-gray-400 shrink-0" />
                                                <input
                                                    type="text"
                                                    placeholder="Search..."
                                                    className="bg-transparent text-sm outline-none w-full text-dark_black dark:text-white placeholder-gray-400"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {/* Users */}
                                        <div className="flex-1 overflow-y-auto">
                                            {isUsersLoading ? (
                                                <UsersSkeleton />
                                            ) : filteredUsers.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center h-full text-center p-6 gap-3">
                                                    <Users size={36} className="text-gray-300 dark:text-gray-600" />
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">No contacts found</p>
                                                </div>
                                            ) : (
                                                <ul className="py-2">
                                                    {filteredUsers.map((user) => (
                                                        <li key={user._id}>
                                                            <button
                                                                onClick={() => setSelectedUser(user)}
                                                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left"
                                                            >
                                                                <div className="relative shrink-0">
                                                                    <div className="w-10 h-10 rounded-full bg-purple_blue/10 flex items-center justify-center overflow-hidden">
                                                                        {user.avatar ? (
                                                                            <img src={user.avatar} alt={user.Name} className="object-cover w-full h-full" />
                                                                        ) : (
                                                                            <span className="text-base font-bold text-purple_blue">
                                                                                {user.Name.charAt(0).toUpperCase()}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    {onlineUsers.includes(user._id) && (
                                                                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-dark_black" />
                                                                    )}
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <p className="text-sm font-medium text-dark_black dark:text-white truncate">{user.Name}</p>
                                                                    <p className="text-xs text-gray-500">
                                                                        {onlineUsers.includes(user._id) ? (
                                                                            <span className="text-green-500">Online</span>
                                                                        ) : (
                                                                            "Offline"
                                                                        )}
                                                                    </p>
                                                                </div>
                                                                <ChevronLeft size={14} className="text-gray-400 rotate-180 shrink-0" />
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    // Regular user: auto-connecting, show spinner
                                    <div className="flex flex-col flex-1 items-center justify-center gap-3 p-6 text-center">
                                        <div className="w-8 h-8 border-2 border-purple_blue border-t-transparent rounded-full animate-spin" />
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Connecting to developer…</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Body — Chat window */}
                        {selectedUser && (
                            <div className="flex flex-col flex-1 overflow-hidden">
                                {/* Offline banner */}
                                {!onlineUsers.includes(selectedUser._id) && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/40 px-4 py-2 shrink-0">
                                        <p className="text-xs text-blue-700 dark:text-blue-300">
                                            <span className="font-semibold">{selectedUser.Name}</span> is offline — leave a message and we'll reply soon 💬
                                        </p>
                                    </div>
                                )}

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                                    {isMessagesLoading ? (
                                        <MessagesSkeleton />
                                    ) : messages.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full text-center gap-2">
                                            <MessageCircle size={32} className="text-gray-300 dark:text-gray-600" />
                                            <p className="text-sm text-gray-500 dark:text-gray-400">No messages yet. Say hi! 👋</p>
                                        </div>
                                    ) : (
                                        messages.map((msg) => {
                                            const isMine = msg.SenderId === session?.user?.id;
                                            return (
                                                <div key={msg._id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                                                    <div
                                                        className={`
                                                            max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm
                                                            ${isMine
                                                                ? "bg-purple_blue text-white rounded-br-none"
                                                                : "bg-gray-100 dark:bg-white/10 text-dark_black dark:text-white rounded-bl-none"
                                                            }
                                                        `}
                                                    >
                                                        <p className="leading-relaxed break-words">{msg.Message}</p>
                                                        <p className={`text-[10px] mt-1 opacity-60 text-right ${isMine ? "text-white" : "text-gray-500"}`}>
                                                            {format(new Date(msg.createdAt), "HH:mm")}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                    <div ref={messageEndRef} />
                                </div>

                                {/* Input */}
                                <form
                                    onSubmit={handleSend}
                                    className="shrink-0 flex items-center gap-2 px-3 py-3 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-dark_black"
                                >
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type a message…"
                                        className="
                                            flex-1 bg-gray-50 dark:bg-white/5
                                            border border-gray-200 dark:border-white/10
                                            rounded-full px-4 py-2 text-sm
                                            text-dark_black dark:text-white placeholder-gray-400
                                            outline-none focus:border-purple_blue dark:focus:border-purple_blue
                                            transition-colors
                                        "
                                    />
                                    <button
                                        type="submit"
                                        disabled={!text.trim()}
                                        aria-label="Send message"
                                        className="
                                            w-9 h-9 rounded-full bg-purple_blue flex items-center justify-center text-white
                                            hover:bg-[#3a1fe0] active:scale-95 transition-all
                                            disabled:opacity-40 disabled:cursor-not-allowed
                                            shrink-0
                                        "
                                    >
                                        <Send size={15} className="ml-0.5" />
                                    </button>
                                </form>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[9996] bg-black/40 sm:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}
        </>
    );
}

/* ─────────────────────────────────────────────────────────
   Unauthenticated Panel
───────────────────────────────────────────────────────── */
function UnauthenticatedPanel({ onClose }: { onClose: () => void }) {
    return (
        <div className="flex flex-col flex-1">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-white/10 shrink-0">
                <div className="w-8 h-8 rounded-full bg-purple_blue flex items-center justify-center shrink-0">
                    <MessageCircle size={16} className="text-white" fill="white" />
                </div>
                <p className="flex-1 font-semibold text-sm text-dark_black dark:text-white">Chat with Developer</p>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                    aria-label="Close chat"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 items-center justify-center px-6 py-8 text-center gap-5">
                {/* Icon ring */}
                <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-purple_blue/10 flex items-center justify-center">
                        <MessageCircle size={36} className="text-purple_blue" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white dark:bg-dark_black border-2 border-gray-100 dark:border-white/10 flex items-center justify-center text-base">
                        💬
                    </span>
                </div>

                <div className="space-y-2">
                    <h3 className="text-base font-semibold text-dark_black dark:text-white">
                        Sign in to start chatting
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        Connect directly with our developer team. Get real-time support and answers.
                    </p>
                </div>

                <div className="flex flex-col w-full gap-2.5">
                    <Link
                        href="/signin"
                        onClick={onClose}
                        className="
                            w-full flex items-center justify-center gap-2
                            bg-purple_blue hover:bg-[#3a1fe0] text-white
                            font-medium text-sm rounded-full py-2.5 px-5
                            transition-all duration-200 hover:scale-[1.02] active:scale-95
                            shadow-md shadow-purple_blue/30
                        "
                    >
                        Sign In
                        <Send size={13} />
                    </Link>
                    <Link
                        href="/signup"
                        onClick={onClose}
                        className="
                            w-full flex items-center justify-center
                            border border-gray-200 dark:border-white/15
                            text-dark_black dark:text-white font-medium text-sm
                            rounded-full py-2.5 px-5
                            hover:border-gray-400 dark:hover:border-white/40
                            transition-all duration-200
                        "
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
}
