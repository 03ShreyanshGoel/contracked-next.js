// backend/src/lib/profiles/index.ts
import { fetchCodechefProfile } from './codechef';
import { fetchCodeforcesProfile } from './codeforces';
import { fetchLeetcodeProfile } from './leetcode';

export interface ProfileData {
    user_id: string;
    platform: 'CODECHEF' | 'CODEFORCES' | 'LEETCODE';
    current_rating: number;
    max_rating: number;
    questions_solved: number;
    ratings: { contestId?: string | number; contestName?: string; rank?: number; rating: number; date: string }[];
}

export async function fetchProfile(platform: string, userId: string): Promise<ProfileData> {
    switch (platform.toUpperCase()) {
        case 'CODECHEF':
            return fetchCodechefProfile(userId);
        case 'CODEFORCES':
            return fetchCodeforcesProfile(userId);
        case 'LEETCODE':
            return fetchLeetcodeProfile(userId);
        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }
}