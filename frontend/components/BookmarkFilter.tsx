// // components/BookmarkFilter.tsx
// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { Switch } from "@headlessui/react";

// export default function BookmarkFilter({ initialChecked }: { initialChecked: boolean }) {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const handleChange = (checked: boolean) => {
//         const params = new URLSearchParams(searchParams);
//         params.set("bookmarkedOnly", checked ? "true" : "false");
//         router.push(`/contests?${params}`);
//     };

//     return (
//         <div className="flex items-center gap-2 mb-4">
//             <Switch
//                 checked={initialChecked}
//                 onChange={handleChange}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${initialChecked ? "bg-blue-600" : "bg-gray-300"
//                     }`}
//             >
//                 <span
//                     className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${initialChecked ? "translate-x-6" : "translate-x-1"
//                         }`}
//                 />
//             </Switch>
//             <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Bookmarked Only</span>
//         </div>
//     );
// }

"use client";

import { Switch } from "@headlessui/react";

export default function BookmarkFilter({
    initialChecked,
    onChange,
}: {
    initialChecked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <div className="flex items-center gap-2 mb-4">
            <Switch
                checked={initialChecked}
                onChange={onChange}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${initialChecked ? "bg-blue-600" : "bg-gray-300"
                    }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${initialChecked ? "translate-x-6" : "translate-x-1"
                        }`}
                />
            </Switch>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Bookmarked Only</span>
        </div>
    );
}