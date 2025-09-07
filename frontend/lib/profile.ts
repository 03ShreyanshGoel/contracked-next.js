import axios, { AxiosError } from "axios";

export interface ProfileData {
    user_id: string;
    platform: string;
    current_rating: number;
    max_rating: number;
    questions_solved: number;
    contests_participated: number;
    rank?: string;
    ratings: Array<{
        rating: number;
        date: string;
        contestTitle: string;
    }>;
}

export interface RatingEntry {
    date: string;
    rating: number;
    contestTitle?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchProfile(platform: string, userId: string): Promise<ProfileData> {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/profiles/${platform}/${userId}`);
        console.log("printing response", response.data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(`Failed to fetch ${platform} profile: ${error.message}`);
        }
        throw new Error(`Failed to fetch ${platform} profile: An unknown error occurred`);
    }
}