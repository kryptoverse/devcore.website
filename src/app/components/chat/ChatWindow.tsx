"use client";

import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import ChatHeader from "./ChatHeaderComponent";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

// We need a simple header inside the window usually
const ChatWindow = () => {
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        onlineUsers,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChatStore();
    const { data: session } = useSession();
    const messageEndRef = useRef<HTMLDivElement>(null);
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedUser?._id && session?.user?.accessToken) {
            getMessages(selectedUser._id, session.user.accessToken);
        }

        subscribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages, session?.user?.accessToken]);

    // useEffect(() => {
    //     if (messageEndRef.current && messages) {
    //         messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    //     }
    // }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <ChatHeader />

            {/* Offline Admin Banner */}
            {selectedUser && !onlineUsers.includes(selectedUser._id) && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-blue-800 dark:text-blue-300">
                            <span className="font-semibold">{selectedUser.Name}</span> is currently offline.
                            Drop a message and they'll be notified via email! We'll get back to you shortly. 💬
                        </p>
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messageContainerRef}>
                {messages.map((message) => {
                    const isMyMessage = message.SenderId === session?.user?.id;

                    return (
                        <div
                            key={message._id}
                            className={`chat flex ${isMyMessage ? "justify-end" : "justify-start"} group`}
                        >
                            <div className={`flex items-end gap-2 max-w-[85%] ${isMyMessage ? "flex-row-reverse" : "flex-row"}`}>
                                <div className={`
                                     rounded-2xl px-4 py-2.5 text-[15px] shadow-sm
                                     ${isMyMessage
                                        ? "bg-blue-600 text-white rounded-br-[4px]"
                                        : "bg-base-200 dark:bg-gray-800 text-base-content rounded-bl-[4px] border border-base-300"}
                                `}>
                                    {/* Image logic future */}
                                    <p className="leading-relaxed break-words whitespace-pre-wrap">{message.Message}</p>
                                </div>
                                <span className={`text-[11px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap px-1 pb-1 ${isMyMessage ? "text-right" : "text-left"}`}>
                                    {format(new Date(message.createdAt), "HH:mm")}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div ref={messageEndRef} />
            </div>

            <MessageInput />
        </div>
    );
};

export default ChatWindow;
