import { create } from "zustand";
import { io, Socket } from "socket.io-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Define Types
interface User {
    _id: string;
    Name: string; // Backend uses Name
    Email: string;
    Role: string;
    isVerified: boolean;
    avatar?: string;
}

interface Message {
    _id: string;
    SenderId: string;
    ReceiverId: string;
    Message: string;
    createdAt: string;
    updatedAt: string;
}

interface ChatStore {
    messages: Message[];
    users: User[];
    selectedUser: User | null;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;
    onlineUsers: string[];
    socket: Socket | null;

    getUsers: (token: string) => Promise<void>;
    getMessages: (userId: string, token: string) => Promise<void>;
    sendMessage: (messageData: { message: string }, token: string) => Promise<void>;
    setSelectedUser: (selectedUser: User | null) => void;
    connectSocket: (token: string) => void;
    disconnectSocket: () => void;
    subscribeToMessages: () => void;
    unsubscribeFromMessages: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    onlineUsers: [],
    socket: null,





    getUsers: async (token) => {
        set({ isUsersLoading: true });
        try {
            // We pass the token in a custom header just in case, and I will update backend to check it.
            const res = await fetch(`${BASE_URL}/api/v1/messages/users`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "token": token // Keeping custom header for backward compatibility/redundancy until backend restart propagates
                }
            });
            const data = await res.json();
            if (res.ok) set({ users: data });
        } catch (error) {
            console.log("Error fetching users", error);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId, token) => {
        set({ isMessagesLoading: true });
        try {
            const res = await fetch(`${BASE_URL}/api/v1/messages/${userId}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) set({ messages: data });
        } catch (error) {
            console.log("Error fetching messages", error);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData, token) => {
        const { selectedUser, messages } = get();
        if (!selectedUser) return;

        try {
            const res = await fetch(`${BASE_URL}/api/v1/messages/send/${selectedUser._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(messageData),
            });
            const data = await res.json();
            if (res.ok) set({ messages: [...messages, data] });
        } catch (error) {
            console.log("Error sending message", error);
        }
    },

    subscribeToMessages: () => {
        const { socket } = get();
        if (!socket) return;

        socket.on("newMessage", (newMessage: Message) => {
            const { selectedUser } = get();
            // Only append message if it's from the selected user
            if (!selectedUser || newMessage.SenderId !== selectedUser._id) return;

            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const { socket } = get();
        if (!socket) return;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    connectSocket: (token) => {
        const { socket } = get();
        if (socket?.connected) return;

        const newSocket = io(BASE_URL, {
            auth: { token },
            query: {
                // userId? No, token has it.
            },
        });

        newSocket.connect();
        set({ socket: newSocket });

        newSocket.on("getOnlineUsers", (userIds: string[]) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        const { socket } = get();
        if (socket?.connected) socket.disconnect();
        set({ socket: null });
    },

}));
