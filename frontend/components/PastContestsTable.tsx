// components/PastContestsTable.tsx
"use client";

import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { fetchContests } from "@/lib/contests";
import ContestFilter from "@/components/ContestFilter";
import BookmarkFilter from "@/components/BookmarkFilter";
import BookmarkButton from "@/components/BookmarkButton";
import SolutionUploadDialog from "@/components/SolutionUploadDialog";
import { getDuration, formatDate } from "../app/contests/utils";
import { PlatformLogo } from "./PlatformLogo";

interface Contest {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    platform: string;
    status: "UPCOMING" | "PAST";
    solutionLink?: string | null;
    isBookmarked: boolean;
}

interface ContestFilters {
    duration: string;
    hasSolutions: boolean;
    platform: string;
    bookmarkedOnly: boolean;
    userId?: string;
}

export default function PastContestsTable({
    session,
    initialSearchParams,
}: {
    session: Session | null;
    initialSearchParams: { [key: string]: string };
}) {
    const [pastContests, setPastContests] = useState<Contest[]>([]);
    const [filters, setFilters] = useState<ContestFilters>({
        duration: initialSearchParams.duration || "week",
        hasSolutions: initialSearchParams.hasSolutions === "true",
        platform: initialSearchParams.platform || "all",
        bookmarkedOnly: initialSearchParams.bookmarkedOnly === "true" && session ? true : false,
        userId: session?.user.id,
    });
    const [loading, setLoading] = useState(true);
    const isAdmin = session?.user?.role === "ADMIN";

    // Function to fetch contests
    const loadPastContests = async () => {
        setLoading(true);
        try {
            const contests = await fetchContests(filters);
            setPastContests(contests.filter((c) => c.status === "PAST"));
        } catch (error) {
            console.error("Failed to fetch past contests:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPastContests();
    }, [filters]);

    const updateFilter = (key: string, value: string | boolean) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Handle bookmark change by refetching contests
    const handleBookmarkChange = async (contestId: string, newBookmarkStatus: boolean) => {
        // Simply refetch contests from the server to ensure table re-renders with latest data
        await loadPastContests();
    };

    return (
        <>
            {session && (
                <BookmarkFilter
                    initialChecked={filters.bookmarkedOnly}
                    onChange={(checked) => updateFilter("bookmarkedOnly", checked)}
                />
            )}
            <ContestFilter session={session} filters={filters} onFilterChange={updateFilter} />
            <div className="overflow-x-auto rounded-lg shadow-md">
                {loading ? (
                    <p>Loading past contests...</p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead className="bg-blue-800 text-gray-200">
                            <tr>
                                <th className="p-4 text-left">Title</th>
                                <th className="p-4 text-left">Time & Date (IST)</th>
                                <th className="p-4 text-left">Solution</th>
                                {isAdmin && <th className="p-4 text-left">Upload (Admin)</th>}
                                <th className="p-4 text-left">Bookmark</th>
                                <th className="p-4 text-left">Platform</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastContests.map((contest) => (
                                <tr key={contest.id} className="border-b dark:border-gray-700">
                                    <td className="p-4">{contest.title}</td>
                                    <td className="p-4">{formatDate(contest.startTime)}</td>
                                    <td className="p-4">
                                        {contest.solutionLink ? (
                                            <a
                                                href={contest.solutionLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                            >
                                                View
                                            </a>
                                        ) : (
                                            "N/A"
                                        )}
                                    </td>
                                    {isAdmin && (
                                        <td className="p-4">
                                            <SolutionUploadDialog contestId={contest.id} />
                                        </td>
                                    )}
                                    <td className="p-4">
                                        <BookmarkButton
                                            contestId={contest.id}
                                            isBookmarked={contest.isBookmarked}
                                            onBookmarkChange={handleBookmarkChange}
                                        />
                                    </td>
                                    <td className="p-4">
                                        <PlatformLogo platform={contest.platform} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}