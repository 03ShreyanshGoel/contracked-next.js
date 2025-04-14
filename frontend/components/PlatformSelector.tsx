"use client";

import { useState, useEffect } from "react";
import { PlatformLogo } from "@/components/PlatformLogo";
import { toast } from "react-toastify";

interface PlatformSelectorProps {
    platforms: { platform: string; handle: string }[];
    selectedPlatform: string;
    onSelect: (platform: string) => void;
    onUpdate: (platform: string, handle: string) => Promise<void>;
}

type Platform = "LeetCode" | "CodeChef" | "Codeforces";
type Handles = Record<Platform, string>;

export default function PlatformSelector({
    platforms,
    selectedPlatform,
    onSelect,
    onUpdate,
}: PlatformSelectorProps) {
    const [handles, setHandles] = useState<Handles>({
        LeetCode: "",
        CodeChef: "",
        Codeforces: "",
    });

    const availablePlatforms: Platform[] = ["LeetCode", "CodeChef", "Codeforces"];

    // Map platforms to their profile URL templates
    const platformUrls: Record<Platform, string> = {
        LeetCode: "https://leetcode.com/u/{handle}",
        CodeChef: "https://www.codechef.com/users/{handle}",
        Codeforces: "https://codeforces.com/profile/{handle}",
    };

    const handleInitializeHandles = () => {
        const updatedHandles: Handles = { ...handles };
        platforms.forEach((p) => {
            if (availablePlatforms.includes(p.platform as Platform)) {
                updatedHandles[p.platform as Platform] = p.handle;
            }
        });
        setHandles(updatedHandles);
    };

    const handleInputChange = (platform: Platform, value: string) => {
        setHandles((prev) => ({ ...prev, [platform]: value }));
    };

    const handleSubmit = async (platform: Platform) => {
        if (handles[platform].trim()) {
            try {
                await onUpdate(platform, handles[platform]);
                toast.success(`Linked ${platform} handle`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } catch {
                toast.error(`Failed to link ${platform} handle`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } else if (platforms.find((p) => p.platform === platform)?.handle) {
            try {
                await onUpdate(platform, "");
                toast.info(`Unlinked ${platform} handle`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } catch {
                toast.error(`Failed to unlink ${platform} handle`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }
    };

    const handleSelect = (platform: Platform) => {
        if (handles[platform].trim()) {
            onSelect(platform);
        } else {
            toast.error(`Enter your handle for ${platform}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const handleVisit = (platform: Platform) => {
        const handle = handles[platform].trim();
        if (handle) {
            const url = platformUrls[platform].replace("{handle}", handle);
            window.open(url, "_blank", "noopener,noreferrer");
        }
    };

    useEffect(() => {
        handleInitializeHandles();
    }, [platforms]);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full h-[300px] flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Platforms</h2>
            <div className="flex-1 flex flex-col space-y-4 overflow-auto">
                {availablePlatforms.map((platform) => {
                    const isLinked = !!handles[platform].trim();

                    return (
                        <div key={platform} className="flex items-center gap-4">
                            <div
                                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 bg-gray-100 dark:bg-gray-700 ${selectedPlatform === platform && isLinked
                                    ? "border-gray-900 dark:border-gray-200 border-2"
                                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                                    }`}
                                onClick={() => handleSelect(platform)}
                            >
                                <PlatformLogo platform={platform} />
                            </div>
                            <div className="flex-1 flex items-center gap-2">
                                <input
                                    type="text"
                                    value={handles[platform]}
                                    onChange={(e) => handleInputChange(platform, e.target.value)}
                                    onBlur={() => handleSubmit(platform)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSubmit(platform);
                                        }
                                    }}
                                    placeholder={`Enter ${platform} Handle`}
                                    className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                />
                                <button
                                    onClick={() => handleVisit(platform)}
                                    disabled={!isLinked}
                                    className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${isLinked
                                        ? "text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                                        : "text-gray-500 cursor-not-allowed"
                                        }`}
                                    aria-label={`Visit ${platform} profile`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}