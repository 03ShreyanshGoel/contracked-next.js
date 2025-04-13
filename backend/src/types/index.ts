// export interface User {
//     id: string;
//     name?: string; // Now optional
//     email: string;
//     role: 'USER' | 'ADMIN'; // Updated to match Role enum
//     name?: string; // Added
//     image?: string; // Added
// }

// export interface Contest {
//     id: string;
//     title: string;
//     platform: 'CODEFORCES' | 'CODECHEF' | 'LEETCODE'; // Updated to match Platform enum
//     startTime: Date;
//     endTime: Date;
//     url: string;
//     status: 'UPCOMING' | 'PAST'; // Updated to match Status enum
//     solutionLink?: string | null;
// }

// export interface Bookmark {
//     id: string;
//     userId: string;
//     contestId: string;
//     notes: string;
//     contest: Contest;
// }

// backend/src/types/index.ts
import { Request, Response } from 'express';

// User response type
export interface UserResponse {
    id: string;
    email: string;
    name: string | null;
    role: 'ADMIN' | 'USER';
    token?: string; // JWT token
}

// Controller handler type
export type ControllerHandler = (req: Request, res: Response) => Promise<void>;

// Auth request body type
export interface AuthRequestBody {
    email: string;
    name?: string;
    token: string;
}

// src/types/userPayload.ts
export interface JwtPayload {
    id: string;
    email: string;
    name?: string | null;
    role: 'USER' | 'ADMIN';
}
