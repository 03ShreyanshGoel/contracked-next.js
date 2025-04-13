// // components/ContestFilter.tsx
// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { Session } from "next-auth";
// import { Switch } from "@headlessui/react";

// export default function ContestFilter({ session }: { session: Session | null }) {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const updateFilter = (key: string, value: string) => {
//         const params = new URLSearchParams(searchParams.toString());
//         if (value === "all" || value === "false") params.delete(key);
//         else params.set(key, value);
//         router.push(`/contests?${params.toString()}`);
//     };

//     return (
//         <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
//             <select
//                 onChange={(e) => updateFilter("platform", e.target.value)}
//                 defaultValue={searchParams.get("platform") || "all"}
//                 className="p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md focus:ring-2 focus:ring-blue-500 transition-all"
//             >
//                 <option value="all">All Platforms</option>
//                 <option value="codechef">CodeChef (CC)</option>
//                 <option value="codeforces">Codeforces (CF)</option>
//                 <option value="leetcode">LeetCode (LC)</option>
//             </select>
//             <select
//                 onChange={(e) => updateFilter("duration", e.target.value)}
//                 defaultValue={searchParams.get("duration") || "week"}
//                 className="p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md focus:ring-2 focus:ring-blue-500 transition-all"
//             >
//                 <option value="week">Last Week</option>
//                 <option value="month">Last Month</option>
//                 <option value="year">Last Year</option>
//             </select>
//             <div className="flex items-center gap-2">
//                 <Switch
//                     checked={searchParams.get("hasSolutions") === "true"}
//                     onChange={(checked) => updateFilter("hasSolutions", checked ? "true" : "false")}
//                     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${searchParams.get("hasSolutions") === "true" ? "bg-blue-600" : "bg-gray-300"
//                         }`}
//                 >
//                     <span
//                         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${searchParams.get("hasSolutions") === "true" ? "translate-x-6" : "translate-x-1"
//                             }`}
//                     />
//                 </Switch>
//                 <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Have Solution</span>
//             </div>
//         </div>
//     );
// }

"use client";

import { Session } from "next-auth";
import { Switch } from "@headlessui/react";

interface ContestFilters {
    duration: string;
    hasSolutions: boolean;
    platform: string;
    bookmarkedOnly: boolean;
    userId?: string;
}

export default function ContestFilter({
    session,
    filters,
    onFilterChange,
}: {
    session: Session | null;
    filters: ContestFilters;
    onFilterChange: (key: string, value: string | boolean) => void;
}) {
    return (
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
            <select
                onChange={(e) => onFilterChange("platform", e.target.value)}
                value={filters.platform}
                className="p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md focus:ring-2 focus:ring-blue-500 transition-all"
            >
                <option value="all">All Platforms</option>
                <option value="codechef">CodeChef (CC)</option>
                <option value="codeforces">Codeforces (CF)</option>
                <option value="leetcode">LeetCode (LC)</option>
            </select>
            <select
                onChange={(e) => onFilterChange("duration", e.target.value)}
                value={filters.duration}
                className="p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md focus:ring-2 focus:ring-blue-500 transition-all"
            >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
            </select>
            <div className="flex items-center gap-2">
                <Switch
                    checked={filters.hasSolutions}
                    onChange={(checked) => onFilterChange("hasSolutions", checked)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${filters.hasSolutions ? "bg-blue-600" : "bg-gray-300"
                        }`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${filters.hasSolutions ? "translate-x-6" : "translate-x-1"
                            }`}
                    />
                </Switch>
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Have Solution</span>
            </div>
        </div>
    );
}