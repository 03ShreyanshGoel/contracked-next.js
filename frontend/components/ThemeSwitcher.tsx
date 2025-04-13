// "use client";
// import { useEffect, useState } from "react";
// import type { NextPage } from "next";
// import { useTheme } from "next-themes";

// import { Sun, Moon } from "lucide-react";

// const ThemeSwitcher: NextPage = () => {
//     const { resolvedTheme, setTheme } = useTheme();
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => setMounted(true), []);

//     if (!mounted) return null;

//     const IconText = resolvedTheme === "light" ? "LIGHT" : "DARK";

//     return (

//         <button
//             type="button"
//             aria-label="Theme Switcher"
//             onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
//             className="p-2 rounded-full bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-900 hover:bg-gray-600 dark:hover:bg-gray-300 transition-colors"
//         >
//             {resolvedTheme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
//         </button>
//     );
// };

// export default ThemeSwitcher;
"use client";
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const ThemeSwitcher: NextPage = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const handleThemeToggle = () => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
    };

    return (
        <button
            type="button"
            aria-label="Theme Switcher"
            onClick={handleThemeToggle}
            className="relative flex items-center w-16 h-8 p-1 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 ease-in-out"
        >
            {/* Sliding background */}
            <span
                className={`absolute w-6 h-6 rounded-full bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out ${resolvedTheme === "light" ? "translate-x-0" : "translate-x-8"
                    }`}
            />

            {/* Icons */}
            <div className="relative flex items-center justify-between w-full px-1">
                <Sun
                    size={16}
                    className={`flex items-center justify-center transition-colors duration-300 ${resolvedTheme === "light" ? "text-yellow-500" : "text-gray-500"
                        }`}
                />
                <Moon
                    size={16}
                    className={`flex items-center justify-center transition-colors duration-300 ${resolvedTheme === "dark" ? "text-blue-300" : "text-gray-500"
                        }`}
                />
            </div>
        </button>
    );
};

export default ThemeSwitcher;