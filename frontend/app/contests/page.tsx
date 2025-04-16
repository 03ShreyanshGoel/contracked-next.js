// app/contests/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchContests } from "@/lib/contests";
import PastContestsTable from "@/components/PastContestsTable";
import { getDuration, getTimeLeft, formatDate } from "./utils";
import { PlatformLogo } from "@/components/PlatformLogo";
import { type NextPage } from "next";

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

const ContestsPage: NextPage<{
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}> = async ({ searchParams }) => {
    const session = await getServerSession(authOptions);
    const resolvedSearchParams = await searchParams;

    // Normalize searchParams to { [key: string]: string }
    const normalizedSearchParams = Object.fromEntries(
        Object.entries(resolvedSearchParams).map(([key, value]) => [
            key,
            Array.isArray(value) ? value.join(",") : value ?? "",
        ])
    ) as { [key: string]: string };

    const upcomingFilters: ContestFilters = {
        duration: "all",
        hasSolutions: false,
        platform: "all",
        bookmarkedOnly: false,
    };

    let upcomingContests: Contest[] = [];
    try {
        const allContests = await fetchContests(upcomingFilters);
        upcomingContests = allContests.filter((c) => c.status === "UPCOMING").sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    } catch (error) {
        console.error("Failed to fetch upcoming contests:", error);
    }

    return (
        <div className="min-h-screen pt-9 pb-8 px-4 max-w-6xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-12 text-center bg-gradient-to-t from-blue-900 to-purple-700 text-transparent bg-clip-text animate-fade-in">
                Contests
            </h1>

            {/* Ongoing/Upcoming Table */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Ongoing & Upcoming</h2>
                <div className="overflow-x-auto rounded-lg shadow-md">
                    <table className="w-full border-collapse">
                        <thead className="bg-blue-800 text-gray-200">
                            <tr>
                                <th className="p-4 text-left">Title</th>
                                <th className="p-4 text-left">Time & Date (IST)</th>
                                <th className="p-4 text-left">Duration</th>
                                <th className="p-4 text-left">Start/End</th>
                                <th className="p-4 text-left">Platform</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingContests.map((contest) => (
                                <tr key={contest.id} className="border-b dark:border-gray-700">
                                    <td className="p-4">{contest.title}</td>
                                    <td className="p-4">{formatDate(contest.startTime)}</td>
                                    <td className="p-4">{getDuration(contest.startTime, contest.endTime)}</td>
                                    <td className="p-4">{getTimeLeft(contest.startTime, contest.endTime, contest.status)}</td>
                                    <td className="p-4">
                                        <PlatformLogo platform={contest.platform} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Past Contests Section */}
            <section>
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Past Contests</h2>
                <PastContestsTable session={session} initialSearchParams={normalizedSearchParams} />
            </section>
        </div>
    );
};

export default ContestsPage;
