// "use client";

// import { useMemo } from "react";
// import { Chart as ChartJS, LineElement, PointElement, LinearScale, TimeScale, Tooltip, Legend, Filler, ChartOptions, ChartData, TooltipItem } from "chart.js";
// import { Line } from "react-chartjs-2";
// import "chartjs-adapter-date-fns";
// import { ProfileData } from "@/lib/profile";

// ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Tooltip, Legend, Filler);

// interface RatingGraphProps {
//     profiles: ProfileData[];
//     platform?: string;
// }

// interface DataPoint {
//     x: Date;
//     y: number;
// }

// export default function RatingGraph({ profiles, platform }: RatingGraphProps) {
//     const chartData: ChartData<"line", DataPoint[]> = useMemo(() => {
//         const filteredProfiles = platform
//             ? profiles.filter(p => p.platform === platform)
//             : profiles;

//         const datasets = filteredProfiles.map(profile => {
//             const colorMap: Record<string, string> = {
//                 LeetCode: "rgba(255, 153, 0, 1)",
//                 CodeChef: "rgba(66, 133, 244, 1)",
//                 Codeforces: "rgba(234, 67, 53, 1)",
//             };

//             const color = colorMap[profile.platform as keyof typeof colorMap] || "rgba(75, 192, 192, 1)";

//             const data = profile.ratings
//                 .filter(
//                     entry =>
//                         entry.date &&
//                         typeof entry.rating === "number" &&
//                         !isNaN(new Date(entry.date).getTime())
//                 )
//                 .map(entry => ({
//                     x: new Date(entry.date),
//                     y: entry.rating,
//                 }));

//             return {
//                 label: profile.platform,
//                 data,
//                 fill: "origin", // Fill to the x-axis
//                 backgroundColor: color.replace("1)", "0.2)"), // Semi-transparent fill
//                 borderColor: color,
//                 pointBackgroundColor: color,
//                 pointBorderColor: "#fff",
//                 pointRadius: 4,
//                 pointHoverRadius: 6,
//                 tension: 0.4,
//             };
//         }).filter(dataset => dataset.data.length > 0);

//         return { datasets };
//     }, [profiles, platform]);

//     const chartOptions: ChartOptions<"line"> = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 position: "top",
//                 labels: {
//                     color: "#E5E7EB",
//                     font: {
//                         size: 12,
//                         weight: "bold",
//                     },
//                     usePointStyle: true,
//                     pointStyle: "circle",
//                 },
//             },
//             tooltip: {
//                 backgroundColor: "rgba(17, 24, 39, 0.8)",
//                 bodyColor: "#E5E7EB",
//                 borderColor: "rgba(107, 114, 128, 0.5)",
//                 borderWidth: 1,
//                 padding: 12,
//                 displayColors: true,
//                 callbacks: {
//                     title: (tooltipItems: TooltipItem<"line">[]) => {
//                         if (tooltipItems.length > 0 && tooltipItems[0].raw) {
//                             const rawValue = tooltipItems[0].raw as { x: Date | number };
//                             const date = typeof rawValue.x === "number" ? new Date(rawValue.x) : new Date(rawValue.x);
//                             if (!isNaN(date.getTime())) {
//                                 return date.toLocaleDateString("en-US", {
//                                     month: "short",
//                                     day: "numeric",
//                                     year: "numeric",
//                                     hour: "numeric",
//                                     minute: "numeric",
//                                     hour12: true,
//                                 });
//                             }
//                             return "Invalid Date";
//                         }
//                         return "";
//                     },
//                     label: (context: TooltipItem<"line">) => {
//                         if (context.dataset.label && typeof context.parsed.y === "number") {
//                             return `${context.dataset.label}: ${context.parsed.y.toFixed(0)}`;
//                         }
//                         return "";
//                     },
//                 },
//             },
//         },
//         scales: {
//             x: {
//                 type: "time",
//                 time: {
//                     unit: "month",
//                     displayFormats: { month: "MMM yyyy" },
//                 },
//                 grid: {
//                     display: true,
//                     color: "rgba(75, 85, 99, 0.3)",
//                 },
//                 ticks: {
//                     color: "#E5E7EB",
//                     font: { size: 11 },
//                 },
//                 border: {
//                     display: false,
//                 },
//             },
//             y: {
//                 beginAtZero: false,
//                 grid: {
//                     display: true,
//                     color: "rgba(75, 85, 99, 0.3)",
//                 },
//                 ticks: {
//                     color: "#E5E7EB",
//                     font: { size: 11 },
//                     padding: 10,
//                 },
//                 border: {
//                     display: false,
//                 },
//             },
//         },
//         interaction: {
//             mode: "nearest",
//             axis: "x",
//             intersect: false,
//         },
//         elements: {
//             line: { borderWidth: 3 },
//             point: { hoverBorderWidth: 2 },
//         },
//     };

//     return (
//         <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full h-[400px] flex flex-col">
//             <h2 className="text-xl font-bold text-white mb-4">Rating Progress</h2>
//             {profiles.length > 0 ? (
//                 <div className="flex-1">
//                     <Line data={chartData} options={chartOptions} />
//                 </div>
//             ) : (
//                 <div className="flex-1 flex items-center justify-center text-gray-400">
//                     <p>Connect at least one platform to see your rating progress</p>
//                 </div>
//             )}
//         </div>
//     );
// }

"use client";

import { useMemo } from "react";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, TimeScale, Tooltip, Legend, Filler, ChartOptions, ChartData, TooltipItem } from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { ProfileData } from "@/lib/profile";

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Tooltip, Legend, Filler);

interface RatingGraphProps {
    profiles: ProfileData[];
    platform?: string;
}

interface DataPoint {
    x: Date;
    y: number;
}

export default function RatingGraph({ profiles, platform }: RatingGraphProps) {
    const chartData: ChartData<"line", DataPoint[]> = useMemo(() => {
        const filteredProfiles = platform ? profiles.filter(p => p.platform === platform) : profiles;

        const datasets = filteredProfiles.map(profile => {
            const colorMap: Record<string, string> = {
                LeetCode: "rgba(255, 153, 0, 1)",
                CodeChef: "rgba(66, 133, 244, 1)",
                Codeforces: "rgba(234, 67, 53, 1)",
            };

            const color = colorMap[profile.platform as keyof typeof colorMap] || "rgba(75, 192, 192, 1)";

            const data = profile.ratings
                .filter(
                    entry =>
                        entry.date &&
                        typeof entry.rating === "number" &&
                        !isNaN(new Date(entry.date).getTime())
                )
                .map(entry => ({
                    x: new Date(entry.date),
                    y: entry.rating,
                }));

            return {
                label: profile.platform,
                data,
                fill: "origin",
                backgroundColor: color.replace("1)", "0.2)"),
                borderColor: color,
                pointBackgroundColor: color,
                pointBorderColor: document.documentElement.classList.contains("dark") ? "#fff" : " #101828",
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
            };
        }).filter(dataset => dataset.data.length > 0);

        return { datasets };
    }, [profiles, platform]);

    const chartOptions: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "#6a7282",
                    font: {
                        size: 12,
                        weight: "bold",
                    },
                    usePointStyle: true,
                    pointStyle: "circle",
                },
            },
            tooltip: {
                backgroundColor:
                    "rgba(17, 24, 39, 0.8)",
                bodyColor: "#E5E7EB",
                borderColor: "rgba(107, 114, 128, 0.5)",
                borderWidth: 1,
                padding: 12,
                displayColors: true,
                callbacks: {
                    title: (tooltipItems: TooltipItem<"line">[]) => {
                        if (tooltipItems.length > 0 && tooltipItems[0].raw) {
                            const rawValue = tooltipItems[0].raw as { x: Date | number };
                            const date = typeof rawValue.x === "number" ? new Date(rawValue.x) : new Date(rawValue.x);
                            if (!isNaN(date.getTime())) {
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                });
                            }
                            return "Invalid Date";
                        }
                        return "";
                    },
                    label: (context: TooltipItem<"line">) => {
                        if (context.dataset.label && typeof context.parsed.y === "number") {
                            return `${context.dataset.label}: ${context.parsed.y.toFixed(0)}`;
                        }
                        return "";
                    },
                },
            },
        },
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "month",
                    displayFormats: { month: "MMM yyyy" },
                },
                grid: {
                    display: true,
                    color: document.documentElement.classList.contains("dark")
                        ? "rgba(75, 85, 99, 0.3)"
                        : "rgba(0, 0, 0, 0.1)",
                },
                ticks: {
                    color: "#6a7282",
                    font: { size: 11 },
                },
                border: {
                    display: false,
                },
            },
            y: {
                beginAtZero: false,
                grid: {
                    display: true,
                    color: document.documentElement.classList.contains("dark")
                        ? "rgba(75, 85, 99, 0.3)"
                        : "rgba(0, 0, 0, 0.1)",
                },
                ticks: {
                    color: "#6a7282",
                    font: { size: 11 },
                    padding: 10,
                },
                border: {
                    display: false,
                },
            },
        },
        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
        elements: {
            line: { borderWidth: 3 },
            point: { hoverBorderWidth: 2 },
        },
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full h-[400px] flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Rating Progress</h2>
            {profiles.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <p>Connect at least one platform to see your rating progress</p>
                </div>
            ) : (
                <div className="flex-1">
                    <Line data={chartData} options={chartOptions} />
                </div>
            )}
        </div>
    );
}