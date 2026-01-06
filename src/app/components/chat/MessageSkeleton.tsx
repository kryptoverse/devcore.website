const MessageSkeleton = () => {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {[...Array(6)].map((_, idx) => (
                <div key={idx} className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
                    <div className="flex-col gap-1 w-full max-w-[320px]">
                        <div className="flex items-center gap-2">
                            <div className="skeleton w-10 h-10 rounded-full shrink-0 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="skeleton h-4 w-28 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                                <div className="skeleton h-10 w-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageSkeleton;
