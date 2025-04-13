// frontend/lib/contests.ts
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

export async function fetchContests(filters: ContestFilters): Promise<Contest[]> {
    const queryParams = new URLSearchParams({
        duration: filters.duration,
        hasSolutions: filters.hasSolutions.toString(),
        platform: filters.platform,
        bookmarkedOnly: filters.bookmarkedOnly.toString(),
        ...(filters.userId && { userId: filters.userId }),
    });

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const fullUrl = `${apiUrl}/api/contests?${queryParams.toString()}`;
    console.log("Fetching contests from:", fullUrl);

    const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch contests: ${response.statusText}`);
    }

    const data: Contest[] = await response.json();
    console.log("Fetched contests:", data);
    return data;
}