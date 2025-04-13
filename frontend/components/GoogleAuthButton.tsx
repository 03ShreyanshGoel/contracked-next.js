"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

interface GoogleAuthButtonProps {
    action: "Sign In" | "Sign Up";
    callbackUrl: string;
    prompt?: string;
}

export default function GoogleAuthButton({ action, callbackUrl, prompt }: GoogleAuthButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleGoogleAuth = async () => {
        setLoading(true);
        await signIn("google", { callbackUrl });
        setLoading(false);
    };

    const loadingText = action === "Sign In" ? "Signing in..." : "Signing up...";

    return (
        <div className="flex flex-col items-center">
            {prompt && <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-lg">{prompt}</p>}
            <button
                onClick={handleGoogleAuth}
                disabled={loading}
                className={`flex items-center justify-center gap-3 px-6 py-3 text-white font-semibold rounded-full relative overflow-hidden shine-button transition-all duration-300 transform hover:scale-103 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                style={{
                    background: "linear-gradient(45deg, #1e40af, #2563eb)", // Same gradient as "Get Started"
                }}
            >
                <span className="bg-white p-1 rounded-full shadow-sm">
                    <FcGoogle className="text-2xl" />
                </span>
                <span className="text-lg">
                    {loading ? loadingText : `${action} with Google`}
                </span>
            </button>
        </div>
    );
}