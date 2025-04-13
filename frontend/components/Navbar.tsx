"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { ChevronDown, User, LogOut, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
    const { data: session } = useSession();
    console.log("session in navbar:", session);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // Added 'const' here

    return (
        <nav className="w-full bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black text-white shadow-lg transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between py-4">
                {/* Logo, ThemeSwitcher, and Hamburger Section */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    <Link href="/" className="text-2xl font-extrabold tracking-tight hover:text-gray-200 transition-colors duration-200">
                        <span className="text-black text-xs rounded-full bg-gray-50 mx-2 px-1.5 py-0.5">{"<Ct />"}</span>
                        ConTracked
                    </Link>
                    <div className="flex items-center space-x-2 md:hidden">
                        <ThemeSwitcher />
                        {/* Hamburger Menu Button */}
                        <button
                            className="p-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
                            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Navigation Items (Collapsible on Mobile) */}
                <div className="flex flex-col md:flex-row items-center w-full md:w-auto md:space-x-10 mt-4 md:mt-0">
                    {/* ThemeSwitcher for Desktop - Left of Contests */}
                    <div className="hidden md:flex items-center mr-4">
                        <ThemeSwitcher />
                    </div>
                    <div
                        className={`w-full md:w-auto flex flex-col md:flex-row items-center md:space-x-10 space-y-4 md:space-y-0 transition-all duration-300 ${isMobileMenuOpen ? "flex" : "hidden"
                            } md:flex`}
                    >
                        <Link
                            href="/contests"
                            className="text-lg font-medium hover:text-gray-200 transition-colors duration-200 py-2 px-1"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contests
                        </Link>

                        {session?.user ? (
                            isMobileMenuOpen ? (
                                <>
                                    <Link
                                        href="/profile"
                                        className="text-lg font-medium hover:text-gray-200 transition-colors duration-200 py-2 px-1"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <User className="w-5 h-5 mr-2 inline" /> Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            signOut({ callbackUrl: "/" });
                                            setMobileMenuOpen(false);
                                        }}
                                        className="text-lg font-medium hover:text-gray-200 transition-colors duration-200 py-2 px-1 text-left"
                                    >
                                        <LogOut className="w-5 h-5 mr-2 inline" /> Sign Out
                                    </button>
                                </>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center space-x-2 text-lg font-medium hover:text-gray-200 transition-colors duration-200 focus:outline-none"
                                    >
                                        {session?.user?.image && session.user.image.startsWith("http") ? (
                                            <Image
                                                src={session.user.image}
                                                alt="Profile"
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 rounded-full border-2 border-gray-200 shadow-sm object-cover"
                                                priority={true}
                                                unoptimized
                                            />
                                        ) : (
                                            <User className="w-10 h-10 p-2 bg-gray-700 rounded-full" />
                                        )}
                                        <ChevronDown className="w-5 h-5" />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-1 md:mt-3 w-full md:w-48 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-xl z-20">
                                            <Link
                                                href="/profile"
                                                className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 rounded-t-lg"
                                                onClick={() => {
                                                    setDropdownOpen(false);
                                                    setMobileMenuOpen(false);
                                                }}
                                            >
                                                <User className="w-5 h-5 mr-2" /> Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    signOut({ callbackUrl: "/" });
                                                    setMobileMenuOpen(false);
                                                }}
                                                className="w-full flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 rounded-b-lg text-left"
                                            >
                                                <LogOut className="w-5 h-5 mr-2" /> Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )
                        ) : (
                            <Link
                                href="/signin"
                                className="text-lg font-medium hover:text-gray-200 transition-colors duration-200 py-2 px-1"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}