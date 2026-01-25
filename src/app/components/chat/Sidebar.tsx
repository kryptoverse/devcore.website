"use client";

import { useChatStore } from "@/store/useChatStore";
import { Users, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading, onlineUsers } = useChatStore();
    const { data: session } = useSession();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (session?.user?.accessToken) getUsers(session.user.accessToken);
    }, [getUsers, session?.user?.accessToken]);

    // Filter users logic
    // If I am Admin (kryptochaingames@gmail.com): Show all users
    // If I am Customer: Show ONLY Admin
    const isAdmin = session?.user?.email === "kryptochaingames@gmail.com";

    const filteredUsers = users.filter((user) => {
        const matchesSearch = user.Name.toLowerCase().includes(searchTerm.toLowerCase());
        const isSelf = user._id === session?.user?.id;

        if (isSelf) return false;

        if (isAdmin) {
            // Admin sees everyone
            return matchesSearch;
        } else {
            // Clients only see Admins
            return matchesSearch && (user.Email === "kryptochaingames@gmail.com" || user.Role === "admin");
        }
    });

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
                {/* Search input (optional, can be expanded) */}
                <div className="mt-3 hidden lg:flex items-center gap-2 bg-base-200 rounded px-2 py-1 border border-gray-200 dark:border-gray-700">
                    <Search className="size-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none text-sm w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-y-auto w-full py-3">
                {filteredUsers.length === 0 ? (
                    <div className="text-center text-gray-500 py-4">No users found</div>
                ) : (
                    filteredUsers.map((user) => (
                        <button
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`
                                w-full p-3 flex items-center gap-3
                                hover:bg-base-300 transition-colors
                                ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                            `}
                        >
                            <div className="relative mx-auto lg:mx-0">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    {/* Avatar placeholder or image */}
                                    {user.avatar ? (
                                        <img src={user.avatar} alt={user.Name} className="object-cover w-full h-full" />
                                    ) : (
                                        <span className="text-lg font-bold text-gray-500">{user.Name.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>
                                {onlineUsers.includes(user._id) && (
                                    <span
                                        className="absolute bottom-0 right-0 size-3 bg-green-500 
                                        rounded-full ring-2 ring-zinc-900"
                                    />
                                )}
                            </div>

                            {/* User info - only visible on larger screens */}
                            <div className="hidden lg:block text-left min-w-0">
                                <div className="font-medium truncate">{user.Name}</div>
                                <div className="text-sm text-zinc-400">
                                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </aside>
    );
};

// Skeleton component for loading state
function SidebarSkeleton() {
    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            {/* Header Skeleton */}
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
            </div>

            {/* Users Skeleton */}
            <div className="overflow-y-auto w-full py-3">
                {[...Array(5)].map((_, idx) => (
                    <div key={idx} className="w-full p-3 flex items-center gap-3">
                        <div className="relative mx-auto lg:mx-0">
                            <div className="skeleton size-12 rounded-full animate-pulse bg-gray-200 dark:bg-gray-700" />
                        </div>
                        <div className="hidden lg:block text-left min-w-0 flex-1">
                            <div className="skeleton h-4 w-32 mb-2 animate-pulse bg-gray-200 dark:bg-gray-700" />
                            <div className="skeleton h-3 w-16 animate-pulse bg-gray-200 dark:bg-gray-700" />
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default Sidebar;
