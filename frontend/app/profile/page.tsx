"use client";

import { useState, useEffect } from "react";
import PlatformSelector from "@/components/PlatformSelector";
import QuestionsPieChart from "@/components/QuestionsPieChart";
import RatingGraph from "@/components/RatingGraph";
import ProfileStats from "@/components/ProfileStats";
import axios, { isAxiosError } from "axios"; // Added isAxiosError for better error handling
import { toast } from "react-toastify";
import { ProfileData } from "@/lib/profile";
import { useSession } from "next-auth/react";

interface PlatformData {
    platform: string;
    handle: string;
}

export default function Profile() {
    const { data: session, status } = useSession(); // Added status to check session state
    const [platforms, setPlatforms] = useState<PlatformData[]>([]);
    const [selectedPlatform, setSelectedPlatform] = useState<string>("");
    const [profiles, setProfiles] = useState<ProfileData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Session:", { status, session, accessToken: session?.accessToken });
    }, [session, status]);

    const mapPlatformToBackend = (platform: string): string => {
        const map: Record<string, string> = {
            LeetCode: "LEETCODE",
            CodeChef: "CODECHEF",
            Codeforces: "CODEFORCES",
        };
        return map[platform] || platform;
    };

    const mapPlatformToFrontend = (platform: string): string => {
        const map: Record<string, string> = {
            LEETCODE: "LeetCode",
            CODECHEF: "CodeChef",
            CODEFORCES: "Codeforces",
        };
        return map[platform] || platform;
    };

    const fetchUserPlatforms = async () => {
        if (status !== "authenticated" || !session?.accessToken) {
            console.warn("Skipping fetchUserPlatforms: No valid session or token");
            toast.error("Please sign in to load platforms", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
            return;
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/platforms`, {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });
            const mappedPlatforms = response.data.map((p: { platform: string; handle: string }) => ({
                platform: mapPlatformToFrontend(p.platform),
                handle: p.handle,
            }));
            setPlatforms(mappedPlatforms);
            if (mappedPlatforms.length > 0) {
                setSelectedPlatform(mappedPlatforms[0].platform);
            } else {
                setSelectedPlatform("");
            }
        } catch (error: unknown) {
            console.error("Failed to fetch platforms:", error);
            if (isAxiosError(error) && error.response?.status === 401) {
                toast.error("Session expired. Please sign in again.", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                });
            } else {
                toast.error("Failed to load platforms", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                });
            }
        }
    };

    const fetchAllProfiles = async () => {
        if (status !== "authenticated" || !session?.accessToken) {
            console.warn("Skipping fetchAllProfiles: No valid session or token");
            setProfiles([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const profilePromises = platforms.map((p) =>
                axios
                    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/profiles/${mapPlatformToBackend(p.platform).toLowerCase()}/${p.handle}`, {
                        headers: {
                            Authorization: `Bearer ${session.accessToken}`,
                        },
                    })
                    .then((res) => ({
                        ...res.data,
                        platform: mapPlatformToFrontend(res.data.platform),
                    }))
                    .catch(() => {
                        console.error("Failed to fetch profile:", p.platform);
                        return null;
                    })
            );
            const profileResponses = await Promise.all(profilePromises);
            const fetchedProfiles = profileResponses.filter((p): p is ProfileData => p !== null);
            console.log("Fetched profiles:", fetchedProfiles);
            setProfiles(fetchedProfiles);
        } catch (error: unknown) {
            console.error("Failed to fetch profiles:", error);
            if (isAxiosError(error) && error.response?.status === 401) {
                toast.error("Session expired. Please sign in again.", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                });
            } else {
                toast.error("Failed to load profile data", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === "authenticated" && session) {
            fetchUserPlatforms();
        } else if (status === "unauthenticated") {
            console.log("User is not authenticated");
            setPlatforms([]);
            setProfiles([]);
            setLoading(false);
        }
    }, [session, status]);

    useEffect(() => {
        if (platforms.length > 0 && status === "authenticated") {
            fetchAllProfiles();
        } else {
            setProfiles([]);
            setLoading(false);
        }
    }, [platforms, status]);

    const handleUpdate = async (platform: string, handle: string) => {
        if (status !== "authenticated" || !session?.accessToken) {
            console.warn("Cannot update platform: No valid session or token");
            toast.error("Please sign in to update platforms", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
            return;
        }

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/platforms`,
                {
                    platform: mapPlatformToBackend(platform),
                    handle,
                },
                {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                }
            );
            toast.success("Platform updated successfully", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
            await fetchUserPlatforms();
        } catch (error: unknown) {
            console.error("Failed to update platform:", error);
            if (isAxiosError(error)) {
                if (error.response?.status === 401) {
                    toast.error("Session expired. Please sign in again.", {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "dark",
                    });
                } else {
                    toast.error(`Failed to update platform: ${error.message}`, {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "dark",
                    });
                }
            } else {
                toast.error("An unexpected error occurred", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                });
            }
            throw error;
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-7xl min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Profile Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="md:col-span-2 space-y-6">
                    {loading ? (
                        <>
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full h-[300px] flex items-center justify-center">
                                <p className="text-gray-500 dark:text-gray-300">Loading...</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full h-[400px] flex items-center justify-center">
                                <p className="text-gray-500 dark:text-gray-300">Loading...</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <PlatformSelector
                                platforms={platforms}
                                selectedPlatform={selectedPlatform}
                                onSelect={setSelectedPlatform}
                                onUpdate={handleUpdate}
                            />
                            <RatingGraph profiles={profiles} platform={selectedPlatform} />
                        </>
                    )}
                </div>

                {/* Right Column */}
                <div className="md:col-span-1 space-y-6">
                    {loading ? (
                        <>
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full h-[500px] flex items-center justify-center">
                                <p className="text-gray-500 dark:text-gray-300">Loading...</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full h-[200px] flex items-center justify-center">
                                <p className="text-gray-500 dark:text-gray-300">Loading...</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <QuestionsPieChart profiles={profiles} />
                            <ProfileStats
                                profile={profiles.find((p) => p.platform === selectedPlatform)}
                                platform={selectedPlatform || "Select a platform"}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}