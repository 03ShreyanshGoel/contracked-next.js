import axios from "axios";

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

export async function fetchProfile(platform: string, userId: string): Promise<ProfileData> {
    try {
        const response = await axios.get(`http://localhost:5000/api/profiles/${platform}/${userId}`);
        console.log("printing response", response.data);
        return response.data;
    } catch (error: any) {
        throw new Error(`Failed to fetch ${platform} profile: ${error.message}`);
    }
}
