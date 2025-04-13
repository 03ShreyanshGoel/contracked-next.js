"use client";

import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function SignIn() {
    return (
        <div className="min-h-screen flex items-center justify-center pt-20 pb-8 px-4 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md animate-fade-in">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Sign In</h1>
                <GoogleAuthButton
                    action="Sign In"
                    callbackUrl="/contests"
                    prompt="New here? Signing in with Google creates your account."
                />
            </div>
        </div>
    );
}