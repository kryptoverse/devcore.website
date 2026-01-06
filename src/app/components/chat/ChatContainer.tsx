"use client";

import { useChatStore } from "@/store/useChatStore";
import Sidebar from "./Sidebar";
import NoChatSelected from "./NoChatSelected";
import ChatWindow from "./ChatWindow";

const ChatContainer = () => {
    const { selectedUser } = useChatStore();
    // Socket connection is now handled globally in SocketProvider
    // ChatContainer just renders the UI components

    // Mobile responsive logic can be handled via CSS or conditional rendering as below

    // Mobile responsive logic would go here or via CSS classes in components

    return (
        <div className="flex h-screen bg-base-200">
            <div className="flex items-center justify-center pt-20 px-4 w-full h-full">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        {/* Sidebar - hidden on mobile when user selected */}
                        <div className={`${selectedUser ? "hidden" : "block"} lg:block`}>
                            <Sidebar />
                        </div>

                        {/* Chat Window or No Chat Selected */}
                        {/* Hidden on mobile when no user selected */}
                        <div className={`flex-1 flex flex-col ${!selectedUser ? "hidden" : "flex"} lg:flex`}>
                            {!selectedUser ? <NoChatSelected /> : <ChatWindow />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatContainer;
