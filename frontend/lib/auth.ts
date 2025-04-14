// frontend/lib/auth.ts
import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios, { isAxiosError } from "axios";
import { AuthResponse } from "@/types/next-auth";

interface ExtendedUser extends NextAuthUser {
    role?: "ADMIN" | "USER";
    accessToken?: string; // Add accessToken to user
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log("signIn started", { user, account, profile });
            try {
                if (!account || !account.id_token) {
                    console.log("No account or id_token provided");
                    return false;
                }

                const response = await axios.post<AuthResponse>(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`,
                    {
                        email: user.email,
                        name: user.name,
                        token: account.id_token,
                    }
                );
                console.log("Backend response:", response.data);

                const extendedUser = user as ExtendedUser;
                extendedUser.role = response.data.role;
                extendedUser.accessToken = response.data.token; // Store the backend JWT
                extendedUser.id = response.data.id; // Ensure user.id is set

                return true;
            } catch (error) {
                if (isAxiosError(error)) {
                    console.error("API call failed:", {
                        message: error.message,
                        status: error.response?.status,
                        data: error.response?.data,
                    });
                } else {
                    console.error("Unexpected error:", error);
                }
                return false;
            }
        },
        async jwt({ token, user }) {
            if (user) {
                const extendedUser = user as ExtendedUser;
                token.id = extendedUser.id;
                token.role = extendedUser.role || "USER";
                token.accessToken = extendedUser.accessToken; // Use backend JWT
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.accessToken = token.accessToken as string;
                session.user.id = token.id as string;
                session.user.role = token.role as "ADMIN" | "USER";
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);