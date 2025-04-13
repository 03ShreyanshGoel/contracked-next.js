import { Response, RequestHandler, Request } from "express";
import prisma from "../config/db";
import { AuthRequest } from "../middleware/auth";
import { Prisma, Contest, Bookmark, Platform } from "@prisma/client";

// Public endpoint: Get contests (no auth required)
export const getContests: RequestHandler = async (req: Request, res: Response) => {
    try {
        const {
            duration = "week",
            hasSolutions,
            platform,
            bookmarkedOnly,
            userId,
        } = req.query;

        // Narrow `userId` to string or undefined
        const userIdString = typeof userId === "string" ? userId : undefined;

        // Build the Prisma filter
        let filter: Prisma.ContestWhereInput = {};

        // Filter by platform (using Platform enum)
        if (platform && typeof platform === "string" && platform.trim() !== "" && platform !== "all") {
            const platformsArray = platform.split(",").map((p) => p.trim().toUpperCase()).filter((p): p is Platform => {
                return Object.values(Platform).includes(p as Platform);
            });
            if (platformsArray.length === 0) {
                res.status(400).json({ message: "Invalid platform value(s). Use CODEFORCES, CODECHEF, or LEETCODE." });
                return;
            }
            filter.platform = { in: platformsArray };
        }

        // Filter by solutions
        if (hasSolutions === "true") {
            filter.solutionLink = { not: null };
        }

        // Filter by duration (fixed for "last week", "last month", and "last year")
        if (duration && typeof duration === "string") {
            const now = new Date();
            let startDate: Date | undefined;
            let endDate: Date = new Date(); // End date is now for "last" filters

            console.log(`Processing duration: ${duration}`); // Debug: Log duration

            if (duration === "week") {
                startDate = new Date();
                startDate.setDate(now.getDate() - 7); // 7 days ago
                filter.startTime = { gte: startDate, lte: endDate };
            } else if (duration === "month") {
                startDate = new Date();
                startDate.setMonth(now.getMonth() - 1); // 1 month ago
                filter.startTime = { gte: startDate, lte: endDate };
            } else if (duration === "year") {
                startDate = new Date();
                startDate.setFullYear(now.getFullYear() - 1); // 1 year ago
                filter.startTime = { gte: startDate, lte: endDate };
            } else if (duration !== "all") {
                res.status(400).json({ message: "Invalid duration value. Use week, month, year, or all." });
                return;
            }

            console.log("Filter applied:", filter); // Debug: Log the filter
        }

        // Filter by bookmarks
        if (bookmarkedOnly === "true" && userIdString) {
            filter.bookmarks = {
                some: { userId: userIdString },
            };
        }

        // Fetch contests without limit
        const contests = await prisma.contest.findMany({
            where: filter,
            orderBy: { startTime: "desc" },
            ...(userIdString && {
                include: {
                    bookmarks: {
                        where: { userId: userIdString },
                    },
                },
            }),
        });

        console.log(`Found ${contests.length} contests`); // Debug: Log result count

        // Map contests to include `isBookmarked` field
        const contestsWithBookmarks = contests.map((contest) => ({
            ...contest,
            isBookmarked: userIdString && "bookmarks" in contest && (contest as Contest & { bookmarks: Bookmark[] }).bookmarks.length > 0,
        }));

        res.json(contestsWithBookmarks);
    } catch (error) {
        console.error("❌ Error in getContests:", error);
        res.status(500).json({ message: "Server Error", error: error instanceof Error ? error.message : "Unknown error" });
    }
};

// Protected endpoint: Update solution link (requires auth and admin)
export const updateSolutionLink: RequestHandler = async (req: AuthRequest, res: Response) => {
    try {
        const { contestId } = req.params;
        const { solutionUrl } = req.body;

        // Ensure user is authenticated
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        if (!contestId) {
            res.status(400).json({ message: "Contest ID is required" });
            return;
        }

        if (!solutionUrl) {
            res.status(400).json({ message: "Solution URL is required" });
            return;
        }

        const updatedContest = await prisma.contest.update({
            where: { id: contestId },
            data: { solutionLink: solutionUrl },
        });

        res.status(200).json({
            message: "Solution link updated successfully",
            contest: updatedContest,
        });
    } catch (error) {
        console.error("❌ Error in updateSolutionLink:", error);
        res.status(500).json({ message: "Server Error" });
    }
};