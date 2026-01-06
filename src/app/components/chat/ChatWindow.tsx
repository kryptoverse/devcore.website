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
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChatStore();
    const { data: session } = useSession();
    const messageEndRef = useRef<HTMLDivElement>(null);

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
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => {
                    const isMyMessage = message.SenderId === session?.user?.id;

                    return (
                        <div
                            key={message._id}
                            className={`chat flex ${isMyMessage ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`
                             max-w-[70%] rounded-2xl p-3 shadow-sm
                             ${isMyMessage
                                    ? "bg-blue-600 text-white rounded-br-none"
                                    : "bg-base-200 dark:bg-gray-800 text-base-content rounded-bl-none border border-base-300"}
                        `}>
                                {/* Image logic future */}
                                <p>{message.Message}</p>
                                <div className={`text-xs mt-1 opacity-70 ${isMyMessage ? "text-blue-100" : "text-gray-500"}`}>
                                    {format(new Date(message.createdAt), "HH:mm")}
                                </div>
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
