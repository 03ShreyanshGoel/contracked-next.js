import prisma from "../config/db";
import { Platform } from "@prisma/client";

export const getUserPlatforms = async (userId: string) => {
    try {
        const platforms = await prisma.userPlatform.findMany({
            where: { userId },
            select: { platform: true, handle: true },
        });
        return platforms;
    } catch (error) {
        console.log("error while fething user platform ids: ", error);
        throw new Error("Failed to fetch platforms");
    }
};

export const updateUserPlatform = async (
    userId: string,
    platform: Platform,
    handle: string
) => {
    try {
        if (!userId || !platform) {
            throw new Error("userId and platform are required");
        }
        const validPlatforms = ["CODEFORCES", "CODECHEF", "LEETCODE"];
        if (!validPlatforms.includes(platform)) {
            throw new Error("Invalid platform");
        }
        if (!handle) {
            // Treat empty handle as deletion
            await prisma.userPlatform.delete({
                where: { userId_platform: { userId, platform } },
                select: { platform: true, handle: true },
            });
            return { platform, handle: "" };
        }
        const updated = await prisma.userPlatform.upsert({
            where: { userId_platform: { userId, platform } },
            update: { handle },
            create: { userId, platform, handle },
        });
        return updated;
    } catch (error) {
        throw new Error("Failed to update platform");
    }
};

export const deleteUserPlatform = async (userId: string, platform: Platform) => {
    try {
        if (!userId || !platform) {
            throw new Error("userId and platform are required");
        }
        await prisma.userPlatform.delete({
            where: { userId_platform: { userId, platform } },
        });
        return { success: true };
    } catch (error) {
        throw new Error("Failed to delete platform");
    }
};