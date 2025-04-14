"use client";

import { useState } from "react";

export default function SolutionUploadDialog({ contestId }: { contestId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [solutionUrl, setSolutionUrl] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/solutions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contestId, solutionUrl }),
            });
            if (response.ok) {
                setMessage("Solution uploaded successfully!");
                setSolutionUrl("");
                setTimeout(() => setIsOpen(false), 1000);
            } else {
                setMessage("Failed to upload solution.");
            }
        } catch {
            setMessage("An error occurred.");
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
                Upload
            </button>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md transform scale-95 animate-pop-in">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Upload Solution for {contestId}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="solutionUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Solution URL</label>
                                <input
                                    type="url"
                                    id="solutionUrl"
                                    value={solutionUrl}
                                    onChange={(e) => setSolutionUrl(e.target.value)}
                                    className="mt-1 w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                                    placeholder="e.g., https://youtube.com/..."
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-all"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="gradient-btn">Upload</button>
                            </div>
                        </form>
                        {message && <p className="mt-3 text-sm text-center text-green-600 dark:text-green-400">{message}</p>}
                    </div>
                </div>
            )}
        </>
    );
}