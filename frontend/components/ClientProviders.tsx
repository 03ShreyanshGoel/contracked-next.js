"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>

            <SessionProvider>
                <Navbar />
                <main >{children}</main>
            </SessionProvider>
        </ThemeProvider>
    );
}