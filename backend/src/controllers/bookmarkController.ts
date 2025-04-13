import { Response, RequestHandler } from "express";
import prisma from "../config/db";
import { AuthRequest } from "../middleware/auth"; // Import AuthRequest from your auth middleware file

export const toggleBookmark: RequestHandler = async (req: AuthRequest, res: Response) => {

    try {
        const userId = req.user!.id; // Non-null assertion is still here, but see notes below
        const contestId = req.params.id;

        const contest = await prisma.contest.findUnique({ where: { id: contestId } });
        if (!contest) {
            res.status(404).json({ message: "Contest not found" });
            return;
        }

        const existingBookmark = await prisma.bookmark.findUnique({
            where: { userId_contestId: { userId, contestId } },
        });

        if (existingBookmark) {
            await prisma.bookmark.delete({ where: { id: existingBookmark.id } });
            res.json({ message: "Bookmark removed" });
        } else {
            await prisma.bookmark.create({
                data: { userId, contestId },
            });
            res.status(201).json({ message: "Bookmark added" });
        }
    } catch (error) {
        console.error("❌ Error in toggleBookmark:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getUserBookmarks: RequestHandler = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.id; // Non-null assertion is still here, but see notes below
        const bookmarks = await prisma.bookmark.findMany({
            where: { userId },
            include: { contest: true },
        });

        res.json(bookmarks.map(b => b.contest));
    } catch (error) {
        console.error("❌ Error in getUserBookmarks:", error);
        res.status(500).json({ message: "Server Error" });
    }
};