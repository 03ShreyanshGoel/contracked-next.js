"use client"; // Required for styled-jsx and client-side animations
import Link from "next/link";
import { Calendar, BookOpen, BarChart, Code } from "lucide-react";

export default function Home() {
  const features = [
    {
      name: "Contest Tracker",
      icon: <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-300" />,
      description: "Monitor upcoming contests in real-time.",
      iconBg: "bg-blue-200 dark:bg-blue-800/50",
    },
    {
      name: "Solutions Hub",
      icon: <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-300" />,
      description: "Access solutions to enhance your skills.",
      iconBg: "bg-purple-200 dark:bg-purple-800/50",
    },
    {
      name: "Profile Stats",
      icon: <BarChart className="w-8 h-8 text-pink-600 dark:text-pink-300" />,
      description: "Track your progress with detailed stats.",
      iconBg: "bg-pink-200 dark:bg-pink-800/50",
    },
    {
      name: "Code Editor",
      icon: <Code className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />,
      description: "Practice coding with an integrated editor.",
      iconBg: "bg-indigo-200 dark:bg-indigo-800/50",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 dark:bg-gray-900 ">
      <section
        className="w-full text-center pt-18 pb-14 px-4 text-white animate-fade-in"
        style={{
          background: "linear-gradient(-45deg, #0f172a -30%, transparent 80%), linear-gradient(45deg, #1a0b3a 20%, #3b0764, #740c45 60%, #8b0a34, #4a0d25)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight animate-bounce-in">
            Master Competitive Programming
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-90  text-gray-400">Track contests, explore solutions, code smarter.</p>
          {/* <Link href="/contests">
            <button
              className="px-6 py-3 text-white font-semibold rounded-full relative overflow-hidden shine-button"
              style={{
                background: "linear-gradient(45deg, #1e40af, #2563eb)", // Gradient from blue-800 to blue-600
              }}
            >
              Get Started
            </button>
          </Link> */}
          <Link href="/contests">
            <button
              className="px-6 py-3 text-white font-semibold rounded-full relative overflow-hidden shine-button"
              style={{
                background: "linear-gradient(45deg, #1e40af, #2563eb)",
              }}
            >
              Get Started
              <span className="absolute inset-0 border-2 border-transparent rounded-full animate-shine"></span>
            </button>
          </Link>

        </div>
      </section>
      <section className="py-10 px-4 max-w-6xl mx-auto w-full">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-t from-blue-900 to-purple-700 text-transparent bg-clip-text animate-fade-in">Discover Features</h2>
          <p className="text-base font-extralight text-gray-600 dark:text-gray-400 mb-8">
            Explore our powerful tools designed to enhance your workflow.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-5 bg-white dark:bg-gray-800 rounded-lg transition-all transform hover:-translate-y-2 hover:shadow-xl"
            >
              <div className={`flex items-center justify-center mb-4 w-14 h-14 rounded-lg ${feature.iconBg}`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 text-left">
                {feature.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-left text-xs">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CSS for the shine effect */}

    </div>
  );
}
