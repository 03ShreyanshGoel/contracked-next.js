// backend/src/lib/profiles/codeforces.ts
import axios from 'axios';
import { ProfileData } from './index';

export async function fetchCodeforcesProfile(userId: string): Promise<ProfileData> {
    const baseUrl = 'https://codeforces.com/api';

    const userInfoResponse = await axios.get(`${baseUrl}/user.info?handles=${userId}`);
    const userData = userInfoResponse.data.result[0];
    if (!userData) throw new Error('User not found');

    const ratingResponse = await axios.get(`${baseUrl}/user.rating?handle=${userId}`);
    const ratingHistory = ratingResponse.data.result.map((entry: any) => ({
        contestId: entry.contestId,
        contestName: entry.contestName,
        rank: entry.rank,
        rating: entry.newRating,
        date: new Date(entry.ratingUpdateTimeSeconds * 1000).toISOString().split('T')[0],
    }));

    const submissionsResponse = await axios.get(`${baseUrl}/user.status?handle=${userId}`);
    const submissions = submissionsResponse.data.result;
    const solvedProblems = new Set();
    submissions.forEach((sub: any) => {
        if (sub.verdict === 'OK') {
            solvedProblems.add(`${sub.problem.contestId}-${sub.problem.index}`);
        }
    });

    return {
        user_id: userId,
        platform: 'CODEFORCES',
        current_rating: userData.rating || 0,
        max_rating: userData.maxRating || userData.rating || 0,
        questions_solved: solvedProblems.size,
        ratings: ratingHistory,
    };
}