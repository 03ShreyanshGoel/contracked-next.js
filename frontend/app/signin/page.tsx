"use client";

import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function SignIn() {
    return (
        <div className="min-h-screen flex items-center justify-center pt-0 pb-8 px-4 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
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

// <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 dark:bg-gray-900 ">
// <section
//   className="w-full text-center pt-18 pb-14 px-4 text-white animate-fade-in"
//   style={{
//     background: "linear-gradient(-45deg, #0f172a -30%, transparent 80%), linear-gradient(45deg, #1a0b3a 20%, #3b0764, #740c45 60%, #8b0a34, #4a0d25)",
//   }}
// >
//   <div className="max-w-6xl mx-auto">
//     <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight animate-bounce-in">
//       Master Competitive Programming
//     </h1>
//     <p className="text-lg md:text-xl mb-6 opacity-90  text-