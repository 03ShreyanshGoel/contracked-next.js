// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { Bookmark, BookmarkCheck } from "lucide-react";

// export default function BookmarkButton({
//     contestId,
//     isBookmarked,
// }: {
//     contestId: string;
//     isBookmarked: boolean;
// }) {
//     const { data: session } = useSession();
//     const router = useRouter();

//     const handleBookmark = async () => {
//         if (!session) {
//             router.push(`/signin?callbackUrl=/contests`);
//             return;
//         }

//         try {
//             const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
//             const response = await fetch(`${apiUrl}/api/bookmarks/${contestId}`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${session.accessToken}`,
//                 },
//                 body: JSON.stringify({ userId: session.user.id }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 console.error(`❌ Failed to toggle bookmark for contest ${contestId}: ${errorData.message}`);
//                 return;
//             }

//             const result = await response.json();
//             console.log(
//                 `✅ Successfully ${isBookmarked ? "unbookmarked" : "bookmarked"} contest ${contestId}: ${result.message
//                 }`
//             );

//             router.refresh();
//         } catch (error) {
//             console.error(`❌ Error during bookmark toggle for contest ${contestId}:`, error);
//         }
//     };

//     return (
//         <button
//             onClick={handleBookmark}
//             className={`p-2 rounded-full transition-all duration-300 transform hover:scale-107 ${session
//                 ? isBookmarked

//                     ? "text-blue-500 hover:text-blue-700 dark:text-indigo-600 dark:hover:text-indigo-700"
//                     : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//                 : "text-gray-400 dark:text-gray-500"
//                 } `}
//         >
//             {isBookmarked ? <BookmarkCheck size={28} /> : <Bookmark size={28} />}
//         </button>
//     );
// }

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface BookmarkButtonProps {
    contestId: string;
    isBookmarked: boolean;
    onBookmarkChange?: (contestId: string, newBookmarkStatus: boolean) => void; // New callback prop
}

export default function BookmarkButton({
    contestId,
    isBookmarked: initialIsBookmarked,
    onBookmarkChange,
}: BookmarkButtonProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked); // Local state for immediate UI update
    const [loading, setLoading] = useState(false); // Optional: to disable button during request

    const handleBookmark = async () => {
        if (!session) {
            router.push(`/signin?callbackUrl=/contests`);
            return;
        }

        setLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const response = await fetch(`${apiUrl}/api/bookmarks/${contestId}`, {
                method: "POST", // Assuming POST toggles bookmark (add/delete)
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
                body: JSON.stringify({ userId: session.user.id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`❌ Failed to toggle bookmark for contest ${contestId}: ${errorData.message}`);
                setLoading(false);
                return;
            }

            const result = await response.json();
            const newBookmarkStatus = !isBookmarked; // Toggle the status
            setIsBookmarked(newBookmarkStatus); // Update local state immediately
            console.log(
                `✅ Successfully ${newBookmarkStatus ? "bookmarked" : "unbookmarked"} contest ${contestId}: ${result.message
                }`
            );

            // Notify parent component of the change
            if (onBookmarkChange) {
                onBookmarkChange(contestId, newBookmarkStatus);
            }
        } catch (error) {
            console.error(`❌ Error during bookmark toggle for contest ${contestId}:`, error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleBookmark}
            disabled={loading} // Disable button while request is in progress
            className={`p-2 rounded-full transition-all duration-300 transform hover:scale-107 ${session
                    ? isBookmarked
                        ? "text-blue-500 hover:text-blue-700 dark:text-indigo-600 dark:hover:text-indigo-700"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    : "text-gray-400 dark:text-gray-500"
                }`}
        >
            {loading ? (
                <span className="animate-pulse">...</span> // Optional: loading indicator
            ) : isBookmarked ? (
                <BookmarkCheck size={28} />
            ) : (
                <Bookmark size={28} />
            )}
        </button>
    );
}