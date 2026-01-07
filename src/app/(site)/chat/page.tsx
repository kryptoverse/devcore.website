"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import ChatContainer from "@/app/components/chat/ChatContainer";

const ChatPage = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin inline-block size-12 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (status === "unauthenticated") {
        return (
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-white dark:bg-dark_black border border-dark_black/10 dark:border-white/10">
                    <div className="space-y-3">
                        <h2 className="text-3xl font-semibold">Please Login</h2>
                        <p className="text-base opacity-70">
                            You need to be logged in to access the chat feature. Sign in to start chatting with us!
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/signin"
                            className="group w-full sm:w-auto text-white font-medium bg-dark_black dark:bg-white dark:text-dark_black rounded-full flex items-center justify-center gap-4 py-3 px-6 hover:bg-transparent hover:text-dark_black dark:hover:bg-transparent dark:hover:text-white border border-dark_black dark:border-white transition-all duration-200 ease-in-out">
                            <span>Sign In</span>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="group-hover:translate-x-1 transition-transform duration-200 ease-in-out">
                                <path
                                    d="M11.832 11.3334H20.1654M20.1654 11.3334V19.6668M20.1654 11.3334L11.832 19.6668"
                                    stroke="currentColor"
                                    strokeWidth="1.42857"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                        <Link
                            href="/"
                            className="w-full sm:w-auto text-dark_black dark:text-white font-medium bg-transparent rounded-full flex items-center justify-center gap-2 py-3 px-6 border border-dark_black/20 dark:border-white/20 hover:border-dark_black dark:hover:border-white transition-all duration-200 ease-in-out">
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (status === "authenticated") {
        return <ChatContainer />;
    }

    return null;
};

export default ChatPage;
