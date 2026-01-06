"use client";

import { useRef, useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { Send, Image as ImageIcon, X } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const MessageInput = () => {
    const [text, setText] = useState("");
    //   const [imagePreview, setImagePreview] = useState<string | null>(null); // Future use
    //   const fileInputRef = useRef<HTMLInputElement>(null);
    const { sendMessage } = useChatStore();
    const { data: session } = useSession();

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        if (!session?.user?.accessToken) {
            toast.error("Not authenticated");
            return;
        }

        try {
            await sendMessage({
                message: text.trim(),
                // image: imagePreview, // Future use
            }, session.user.accessToken);

            // Clear form
            setText("");
            //   setImagePreview(null);
            //   if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
            toast.error("Failed to send message");
        }
    };

    return (
        <div className="p-4 w-full">
            {/* Image preview area if we had images */}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md border border-gray-300 dark:border-gray-700 bg-transparent p-2.5 "
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    {/* <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon size={20} />
          </button> */}
                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-circle bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 disabled:bg-gray-400"
                    disabled={!text.trim()}
                >
                    <Send size={22} className="ml-0.5" />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
