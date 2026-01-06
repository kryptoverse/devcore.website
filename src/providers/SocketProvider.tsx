"use client";

import { useChatStore } from "@/store/useChatStore";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { connectSocket, disconnectSocket, socket } = useChatStore();
    const { data: session } = useSession();
    const pathname = usePathname();

    // 1. Connect Socket on Session
    useEffect(() => {
        if (session?.user?.accessToken) {
            connectSocket(session.user.accessToken);
        }

        return () => {
            if (!session?.user?.accessToken) {
                disconnectSocket();
            }
        };
    }, [connectSocket, disconnectSocket, session]);

    // 2. Global Event Listeners
    useEffect(() => {
        if (!socket) return;

        // Handler: Admin Connected
        const handleAdminConnected = (admin: { name: string, id: string }) => {
            if (session?.user?.role === "customer") {
                toast.success(`Admin ${admin.name} is online! Chat with him.`, {
                    duration: 5000,
                    icon: '👋',
                    id: "admin-online-toast"
                });
            }
        };

        // Handler: New Message Notification
        const handleNewMessageNotification = (newMessage: any) => {
            if (pathname === "/chat") return;

            // Loose comparison in case of string vs object mismatch
            const isForMe = newMessage.ReceiverId == session?.user?.id;

            if (isForMe) {
                toast(`New message received!`, {
                    icon: '💬',
                    duration: 4000
                });
            }
        };

        socket.on("adminConnected", handleAdminConnected);
        socket.on("newMessage", handleNewMessageNotification);

        return () => {
            socket.off("adminConnected", handleAdminConnected);
            socket.off("newMessage", handleNewMessageNotification);
        };
    }, [socket, session, pathname]);

    return <>{children}</>;
};

export default SocketProvider;
