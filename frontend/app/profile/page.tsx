// "use client";

// import { useState, useEffect } from "react";
// import PlatformSelector from "@/components/PlatformSelector";
// import QuestionsPieChart from "@/components/QuestionsPieChart";
// import RatingGraph from "@/components/RatingGraph";
// import ProfileStats from "@/components/ProfileStats";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { ProfileData } from "@/lib/profile";
// import { useSession } from "next-auth/react";

// interface PlatformData {
//     platform: string;
//     handle: string;
// }

// export default function Profile() {
//     const { data: session } = useSession();
//     const [platforms, setPlatforms] = useState<PlatformData[]>([]);
//     const [selectedPlatform, setSelectedPlatform] = useState<string>("");
//     const [profiles, setProfiles] = useState<ProfileData[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         console.log("Session:", session);
//     }, [session]);

//     const mapPlatformToBackend = (platform: string): string => {
//         const map: Record<string, string> = {
//             LeetCode: "LEETCODE",
//             CodeChef: "CODECHEF",
//             Codeforces: "CODEFORCES",
//         };
//         console.log("Mapping to backend:", { platform, mapped: map[platform] });
//         return map[platform] || platform;
//     };

//     const mapPlatformToFrontend = (platform: string): string => {
//         const map: Record<string, string> = {
//             LEETCODE: "LeetCode",
//             CODECHEF: "CodeChef",
//             CODEFORCES: "Codeforces",
//         };
//         console.log("Mapping to frontend:", { platform, mapped: map[platform] });
//         return map[platform] || platform;
//     };

//     const fetchUserPlatforms = async () => {
//         try {
//             console.log("Fetching platforms with token:", session?.accessToken);
//             const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/platforms`, {
//                 headers: {
//                     Authorization: `Bearer ${session?.accessToken}`,
//                 },
//             });
//             console.log("fetchUserPlatforms response:", response.data);
//             const mappedPlatforms = response.data.map((p: { platform: string; handle: string }) => ({
//                 platform: mapPlatformToFrontend(p.platform),
//                 handle: p.handle,
//             }));
//             console.log("Mapped platforms:", mappedPlatforms);
//             setPlatforms(mappedPlatforms);
//             if (mappedPlatforms.length > 0) {
//                 setSelectedPlatform(mappedPlatforms[0].platform);
//             } else {
//                 setSelectedPlatform("");
//             }
//         } catch (error: any) {
//             console.error("Failed to fetch platforms:", {
//                 message: error.message,
//                 response: error.response?.data,
//                 status: error.response?.status,
//             });
//             toast.error("Failed to load platforms", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 theme: "dark",
//             });
//         }
//     };

//     const fetchAllProfiles = async () => {
//         setLoading(true);
//         try {
//             console.log("Fetching profiles for platforms:", platforms);
//             const profilePromises = platforms.map((p) =>
//                 axios
//                     .get(`${process.env.NEXT_PUBLIC_API_URL}/api/profiles/${mapPlatformToBackend(p.platform).toLowerCase()}/${p.handle}`, {
//                         headers: {
//                             Authorization: `Bearer ${session?.accessToken}`,
//                         },
//                     })
//                     .then((res) => ({
//                         ...res.data,
//                         platform: mapPlatformToFrontend(res.data.platform),
//                     }))
//                     .catch((err) => {
//                         console.error("Failed to fetch profile:", {
//                             platform: p.platform,
//                             handle: p.handle,
//                             error: err.message,
//                         });
//                         return null;
//                     })
//             );
//             const profileResponses = await Promise.all(profilePromises);
//             const fetchedProfiles = profileResponses.filter((p): p is ProfileData => p !== null);
//             console.log("Fetched profiles:", fetchedProfiles.map((p) => ({
//                 platform: p.platform,
//                 questions_solved: p.questions_solved,
//                 current_rating: p.current_rating,
//             })));
//             setProfiles(fetchedProfiles);
//         } catch (error: any) {
//             console.error("Failed to fetch profiles:", {
//                 message: error.message,
//                 response: error.response?.data,
//                 status: error.response?.status,
//             });
//             toast.error("Failed to load profile data", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 theme: "dark",
//             });
//         } finally {
//             setLoading(false);
//             console.log("Loading state:", false);
//         }
//     };

//     useEffect(() => {
//         if (session) {
//             fetchUserPlatforms();
//         }
//     }, [session]);

//     useEffect(() => {
//         if (platforms.length > 0) {
//             fetchAllProfiles();
//         } else {
//             setProfiles([]);
//             setLoading(false);
//         }
//     }, [platforms]);

//     const handleUpdate = async (platform: string, handle: string) => {
//         try {
//             console.log("handleUpdate:", { platform, handle, token: session?.accessToken });
//             const response = await axios.post(
//                 `${process.env.NEXT_PUBLIC_API_URL}/api/user/platforms`,
//                 {
//                     platform: mapPlatformToBackend(platform),
//                     handle,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${session?.accessToken}`,
//                     },
//                 }
//             );
//             console.log("handleUpdate response:", response.data);
//             await fetchUserPlatforms();
//         } catch (error: any) {
//             console.error("Failed to update platform:", {
//                 message: error.message,
//                 response: error.response?.data,
//                 status: error.response?.status,
//                 platform,
//                 handle,
//             });
//             throw error;
//         }
//     };

//     // Log profile selection for ProfileStats
//     console.log("ProfileStats selection:", {
//         selectedPlatform,
//         profile: profiles.find((p) => p.platform === selectedPlatform),
//         profiles: profiles.map((p) => ({ platform: p.platform })),
//     });

//     console.log("Profile state:", {
//         platforms: platforms.map((p) => ({ platform: p.platform, handle: p.handle })),
//         selectedPlatform,
//         profiles: profiles.map((p) => ({ platform: p.platform })),
//         loading,
//     });

//     return (
//         <div className="container mx-auto p-6 max-w-7xl">
//             <h1 className="text-3xl font-bold text-white mb-8">Profile Dashboard</h1>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Left Column */}

//                 <div className="md:col-span-2 space-y-6">
//                     {loading ? (
//                         <>
//                             <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full h-[300px] flex items-center justify-center">
//                                 <p className="text-gray-300">Loading...</p>
//                             </div>
//                             <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full h-[400px] flex items-center justify-center">
//                                 <p className="text-gray-300">Loading...</p>
//                             </div>
//                         </>
//                     ) : (
//                         <>

//                             <PlatformSelector
//                                 platforms={platforms}
//                                 selectedPlatform={selectedPlatform}
//                                 onSelect={setSelectedPlatform}
//                                 onUpdate={handleUpdate}
//                             />
//                             <RatingGraph profiles={profiles} platform={selectedPlatform} />
//                         </>
//                     )}
//                 </div>



//                 {/* Right Column */}

//                 <div className="md:col-span-1 space-y-6">
//                     {loading ? (
//                         <>
//                             <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full h-[500px] flex items-center justify-center">
//                                 <p className="text-gray-300">Loading...</p>
//                             </div>
//                             <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full h-[200px] flex items-center justify-center">
//                                 <p className="text-gray-300">Loading...</p>
//                             </div>
//                         </>
//                     ) : (
//                         <>

//                             <QuestionsPieChart profiles={profiles} />
//                             <ProfileStats
//                                 profile={profiles.find((p) => {
//                                     console.log("Finding profile:", { profilePlatform: p.platform, selectedPlatform });
//                                     return p.platform === selectedPlatform;
//                                 })}
//                                 platform={selectedPlatform || "Select a platform"}
//                             />

//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }


"use client";

import { useState, useEffect } from "react";
import PlatformSelector from "@/components/PlatformSelector";
import QuestionsPieChart from "@/components/QuestionsPieChart";
import RatingGraph from "@/components/RatingGraph";
import ProfileStats from "@/components/ProfileStats";
import axios from "axios";
import { toast } from "react-toastify";
import { ProfileData } from "@/lib/profile";
import { useSession } from "next-auth/react";

interface PlatformData {
    platform: string;
    handle: string;
}

export default function Profile() {
    const { data: session } = useSession();
    const [platforms, setPlatforms] = useState<PlatformData[]>([]);
    const [selectedPlatform, setSelectedPlatform] = useState<string>("");
    const [profiles, setProfiles] = useState<ProfileData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Session:", session);
    }, [session]);

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
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/platforms`, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
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
        } catch (error: any) {
            console.error("Failed to fetch platforms:", error);
            toast.error("Failed to load platforms", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
        }
    };

    const fetchAllProfiles = async () => {
        setLoading(true);
        try {
            const profilePromises = platforms.map((p) =>
                axios
                    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/profiles/${mapPlatformToBackend(p.platform).toLowerCase()}/${p.handle}`, {
                        headers: {
                            Authorization: `Bearer ${session?.accessToken}`,
                        },
                    })
                    .then((res) => ({
                        ...res.data,
                        platform: mapPlatformToFrontend(res.data.platform),
                    }))
                    .catch((err) => {
                        console.error("Failed to fetch profile:", p.platform, err);
                        return null;
                    })
            );
            const profileResponses = await Promise.all(profilePromises);
            const fetchedProfiles = profileResponses.filter((p): p is ProfileData => p !== null);
            console.log("Fetched profiles:", fetchedProfiles);
            setProfiles(fetchedProfiles);
        } catch (error: any) {
            console.error("Failed to fetch profiles:", error);
            toast.error("Failed to load profile data", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session) {
            fetchUserPlatforms();
        }
    }, [session]);

    useEffect(() => {
        if (platforms.length > 0) {
            fetchAllProfiles();
        } else {
            setProfiles([]);
            setLoading(false);
        }
    }, [platforms]);

    const handleUpdate = async (platform: string, handle: string) => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/platforms`,
                {
                    platform: mapPlatformToBackend(platform),
                    handle,
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                }
            );
            await fetchUserPlatforms();
        } catch (error: any) {
            console.error("Failed to update platform:", error);
            throw error;
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-7xl  min-h-screen">
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
                            <ProfileStats profile={profiles.find((p) => p.platform === selectedPlatform)} platform={selectedPlatform || "Select a platform"} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}