// frontend/types/contest.ts

// Enum types mirroring Prisma schema
export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}

export enum Platform {
    CODEFORCES = "CODEFORCES",
    CODECHEF = "CODECHEF",
    LEETCODE = "LEETCODE",
}

export enum Status {
    UPCOMING = "UPCOMING",
    PAST = "PAST",
}

// Interface for the Contest model
export interface Contest {
    id: string;
    name: string; // Maps to 'title' in Prisma schema
    date: string; // Will be derived from 'startTime' as an ISO string
    timeLeft?: string; // Calculated field, not directly in schema
    platform: Platform;
    status: Status;
    solutionUrl?: string | null; // Maps to 'solutionLink' in Prisma schema
    isBookmarked: boolean; // Derived from bookmarks relation
}

// Optional: Interface for filters used in fetchContests
export interface ContestFilters {
    duration: string;
    hasSolutions: boolean;
    platform: string; // Could be refined to Platform | "all" if needed
    bookmarkedOnly: boolean;
    limit: number;
    userId?: string;
}

// Optional: Interface for Bookmark if needed elsewhere
export interface Bookmark {
    id: string;
    userId: string;
    contestId: string;
    notes: string;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
}