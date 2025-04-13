import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

// Define the User type that matches your Prisma schema or backend response
export interface User {
    id: string;
    email: string;
    name: string | null;
    role: "ADMIN" | "USER";
}

// Extend the NextAuth module
declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: {
            id: string;
            email: string;
            name?: string | null;
            role: "ADMIN" | "USER";
        } & DefaultSession["user"];
    }

    interface User extends User { } // Directly use User interface
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        name?: string | null;
        role: "ADMIN" | "USER";
    }
}

// Define the response type from your backend
export interface AuthResponse {
    id: string;
    email: string;
    name: string | null;
    role: "ADMIN" | "USER";
    token?: string; // JWT token from backend
}