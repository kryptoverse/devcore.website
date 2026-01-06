"use client";

import { useChatStore } from "@/store/useChatStore";
import { X } from "lucide-react";

// Header component for the chat window
const ChatHeader = () => {
    const { selectedUser, setSelectedUser, onlineUsers } = useChatStore();

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center relative overflow-hidden">
                        {/* Img */}
                        <span className="font-bold text-gray-500">{selectedUser?.Name.charAt(0)}</span>
                    </div>
                    <div>
                        <h3 className="font-medium">{selectedUser?.Name}</h3>
                        <p className="text-sm text-base-content/70">
                            {onlineUsers.includes(selectedUser?._id || "") ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                {/* Close button for mobile */}
                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
