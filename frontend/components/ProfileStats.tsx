// "use client";

// import { ProfileData } from "@/lib/profile";

// interface ProfileStatsProps {
//     profile: ProfileData | undefined;
//     platform: string;
// }

// export default function ProfileStats({ profile, platform }: ProfileStatsProps) {
//     console.log("ProfileStats props:", {
//         profile: profile
//             ? {
//                 platform: profile.platform,
//                 questions_solved: profile.questions_solved,
//                 current_rating: profile.current_rating,
//                 max_rating: profile.max_rating,
//                 rank: profile.rank,
//                 contests_participated: profile.ratings?.length,
//             }
//             : undefined,
//         platform,
//     });

//     const platformColors: Record<string, { bg: string; icon: string; border: string }> = {
//         LeetCode: {
//             bg: "rgba(255, 153, 0, 0.2)", // Matches RatingGraph borderColor
//             icon: "🧩",
//             border: "border-yellow-600", // Tailwind class for border
//         },
//         CodeChef: {
//             bg: "rgba(66, 133, 244, 0.2)", // Matches RatingGraph borderColor
//             icon: "👨‍🍳",
//             border: "border-blue-600", // Tailwind class for border
//         },
//         Codeforces: {
//             bg: "rgba(234, 67, 53, 0.2)", // Matches RatingGraph borderColor
//             icon: "🏆",
//             border: "border-red-600", // Tailwind class for border
//         },
//     };

//     const platformStyle = platformColors[platform] || {
//         bg: "rgba(75, 192, 192, 1)", // Default from RatingGraph
//         icon: "💻",
//         border: "border-gray-600",
//     };

//     return (
//         <div
//             className={`bg-gradient-to-br p-3 rounded-lg shadow-lg border ${platformStyle.border} w-full h-[200px] flex flex-col`}
//             style={{ backgroundColor: platformStyle.bg }} // Inline style for specific color
//         >
//             <div className="flex items-center mb-4">
//                 <span className="text-2xl mr-2">{platformStyle.icon}</span>
//                 <h3 className="text-xl font-bold text-white">{platform}</h3>
//             </div>
//             {profile ? (
//                 <div className="space-y-1 max-h-[120px] mb-4 overflow-hidden">
//                     <div className="flex justify-between">
//                         <span className="text-gray-400">Problems Solved:</span>
//                         <span className="font-semibold text-white">{profile.questions_solved || "N/A"}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-gray-400">Current Rating:</span>
//                         <span className="font-semibold text-white">{profile.current_rating?.toFixed(0) || "N/A"}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-gray-400">Max Rating:</span>
//                         <span className="font-semibold text-white">{profile.max_rating?.toFixed(0) || "N/A"}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-gray-400">Contests Participated:</span>
//                         <span className="font-semibold text-white">{profile.ratings?.length || "N/A"}</span>
//                     </div>
//                     {profile.rank && (
//                         <div className="flex justify-between">
//                             <span className="text-gray-400">Rank:</span>
//                             <span className="font-semibold text-white">{profile.rank}</span>
//                         </div>
//                     )}
//                 </div>
//             ) : (
//                 <div className="flex-1 flex items-center">
//                     <p className="text-gray-300">No stats available for {platform}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

"use client";

import { ProfileData } from "@/lib/profile";

interface ProfileStatsProps {
    profile: ProfileData | undefined;
    platform: string;
}

export default function ProfileStats({ profile, platform }: ProfileStatsProps) {
    const platformColors: Record<string, { bg: string; border: string }> = {
        LeetCode: {
            bg: "rgba(255, 153, 0, 0.3)",
            // icon: "🧩",
            border: "border-yellow-600",
        },
        CodeChef: {
            bg: "rgba(66, 133, 244, 0.3)",
            // icon: "👨‍🍳",
            border: "border-blue-600",
        },
        Codeforces: {
            bg: "rgba(234, 67, 53, 0.3)",
            // icon: "🏆",
            border: "border-red-600",
        },
    };

    const platformStyle = platformColors[platform] || {
        bg: "rgba(75, 192, 192, 0.2)",
        // icon: "",
        border: "border-gray-600",
    };

    return (
        <div
            className={`p-3 rounded-lg shadow-lg border ${platformStyle.border} w-full h-[200px] flex flex-col bg-white dark:bg-gray-800`}
            style={{ backgroundColor: platformStyle.bg }}
        >
            <div className="flex items-center mb-4">
                {/* <span className="text-2xl mr-2">{platformStyle.icon}</span> */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{platform}</h3>
            </div>
            {profile ? (
                <div className="space-y-1 max-h-[120px] mb-4 overflow-hidden">
                    <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Problems Solved:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{profile.questions_solved || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Current Rating:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{profile.current_rating?.toFixed(0) || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Max Rating:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{profile.max_rating?.toFixed(0) || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Contests Participated:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{profile.ratings?.length || "N/A"}</span>
                    </div>
                    {profile.rank && (
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Rank:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{profile.rank}</span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex-1 flex items-center">
                    <p className="text-gray-500 dark:text-gray-300">No stats available for {platform}</p>
                </div>
            )}
        </div>
    );
}