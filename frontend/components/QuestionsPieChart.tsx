// "use client";

// import { useMemo } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
// import { ProfileData } from "@/lib/profile";

// ChartJS.register(ArcElement, Tooltip, Legend);

// // Plugin to display total in the center
// const centerTextPlugin = {
//     id: "centerText",
//     afterDatasetsDraw(chart: ChartJS<"doughnut", number[]>) {
//         const { ctx, data } = chart;
//         if (data.datasets.length === 0 || !data.datasets[0].data.length) return;

//         const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);
//         ctx.save();
//         ctx.font = "bold 24px sans-serif";
//         ctx.fillStyle = "#E5E7EB";
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         const centerX = chart.getDatasetMeta(0).data[0].x;
//         const centerY = chart.getDatasetMeta(0).data[0].y;
//         ctx.fillText(total.toString(), centerX, centerY);
//         ctx.restore();
//     },
// };

// interface QuestionsPieChartProps {
//     profiles: ProfileData[];
// }

// // Define colorMap at component level
// const colorMap: Record<string, { bg: string; border: string }> = {
//     LeetCode: {
//         bg: "rgba(255, 153, 0, 0.4)", // Orange with 0.4 opacity
//         border: "rgba(255, 153, 0, 0.8)", // Solid orange
//     },
//     CodeChef: {
//         bg: "rgba(66, 133, 244, 0.4)", // Blue with 0.4 opacity
//         border: "rgba(66, 133, 244, 0.8)", // Solid blue
//     },
//     Codeforces: {
//         bg: "rgba(234, 67, 53, 0.4)", // Red with 0.4 opacity
//         border: "rgba(234, 67, 53, 0.8)", // Solid red
//     },
// };

// export default function QuestionsPieChart({ profiles }: QuestionsPieChartProps) {
//     const data = useMemo(() => {
//         if (profiles.length === 0) {
//             return {
//                 labels: ["No Data"],
//                 datasets: [
//                     {
//                         data: [1],
//                         backgroundColor: ["rgba(100, 100, 100, 0.8)"],
//                         borderColor: ["rgba(100, 100, 100, 1)"],
//                         borderWidth: 1,
//                     },
//                 ],
//             };
//         }

//         const labels = profiles.map((p) => p.platform);
//         const values = profiles.map((p) => p.questions_solved || 0);

//         const backgroundColors = labels.map((label) => colorMap[label]?.bg || "rgba(75, 192, 192, 0.4)");
//         const borderColors = labels.map((label) => colorMap[label]?.border || "rgba(75, 192, 192, 1)");

//         return {
//             labels,
//             datasets: [
//                 {
//                     data: values,
//                     backgroundColor: backgroundColors,
//                     borderColor: borderColors,
//                     borderWidth: 1,
//                 },
//             ],
//         };
//     }, [profiles]);

//     return (
//         <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full h-[500px] flex flex-col">
//             <h2 className="text-2xl font-bold text-white mb-4">Questions Solved</h2>
//             {profiles.length === 0 ? (
//                 <div className="flex-1 flex items-center justify-center text-gray-300">
//                     <p>No data to display</p>
//                 </div>
//             ) : (
//                 <div className="flex-1 flex flex-col justify-between">
//                     <div className="flex-1 flex items-center justify-center">
//                         <div className="w-60 h-60">
//                             <Doughnut
//                                 data={data}
//                                 options={{
//                                     responsive: true,
//                                     maintainAspectRatio: false,
//                                     cutout: "75%",
//                                     plugins: {
//                                         legend: {
//                                             display: false,
//                                         },
//                                         tooltip: {
//                                             callbacks: {
//                                                 label: (context) => `${context.label}: ${context.raw} questions`,
//                                             },
//                                         },
//                                     },
//                                 }}
//                                 plugins={[centerTextPlugin]} // Scoped to this chart only
//                             />
//                         </div>
//                     </div>
//                     <div className="mt-4 text-gray-300">
//                         {profiles.map((profile, index) => (
//                             <div key={index} className="flex justify-between">
//                                 <span style={{ color: colorMap[profile.platform]?.border || "#75C0C0" }}>
//                                     {profile.platform}:
//                                 </span>
//                                 <span>{profile.questions_solved || 0} questions</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

"use client";

import { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ProfileData } from "@/lib/profile";

ChartJS.register(ArcElement, Tooltip, Legend);

// Plugin to display total in the center
const centerTextPlugin = {
    id: "centerText",
    afterDatasetsDraw(chart: ChartJS<"doughnut", number[]>) {
        const { ctx, data } = chart;
        if (data.datasets.length === 0 || !data.datasets[0].data.length) return;

        const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);
        ctx.save();
        ctx.font = "bold 24px sans-serif";
        ctx.fillStyle = "#6a7282";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 40px sans-serif";
        const centerX = chart.getDatasetMeta(0).data[0].x;
        const centerY = chart.getDatasetMeta(0).data[0].y;
        ctx.fillText(total.toString(), centerX, centerY);
        ctx.restore();
    },
};

interface QuestionsPieChartProps {
    profiles: ProfileData[];
}

const colorMap: Record<string, { bg: string; border: string }> = {
    LeetCode: {
        bg: "rgba(255, 153, 0, 0.4)",
        border: "rgba(255, 153, 0, 0.8)",
    },
    CodeChef: {
        bg: "rgba(66, 133, 244, 0.4)",
        border: "rgba(66, 133, 244, 0.8)",
    },
    Codeforces: {
        bg: "rgba(234, 67, 53, 0.4)",
        border: "rgba(234, 67, 53, 0.8)",
    },
};

export default function QuestionsPieChart({ profiles }: QuestionsPieChartProps) {
    const data = useMemo(() => {
        if (profiles.length === 0) {
            return {
                labels: ["No Data"],
                datasets: [
                    {
                        data: [1],
                        backgroundColor: ["rgba(100, 100, 100, 0.8)"],
                        borderColor: ["rgba(100, 100, 100, 1)"],
                        borderWidth: 1,
                    },
                ],
            };
        }

        const labels = profiles.map((p) => p.platform);
        const values = profiles.map((p) => p.questions_solved || 0);

        const backgroundColors = labels.map((label) => colorMap[label]?.bg || "rgba(75, 192, 192, 0.4)");
        const borderColors = labels.map((label) => colorMap[label]?.border || "rgba(75, 192, 192, 1)");

        return {
            labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        };
    }, [profiles]);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full h-[500px] flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Questions Solved</h2>
            {profiles.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-300">
                    <p>No data to display</p>
                </div>
            ) : (
                <div className="flex-1 flex flex-col justify-between">
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-60 h-60">
                            <Doughnut
                                data={data}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    cutout: "75%",
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                        tooltip: {
                                            backgroundColor:
                                                "rgba(17, 24, 39, 0.8)",
                                            bodyColor: "#E5E7EB",
                                            borderColor: "rgba(107, 114, 128, 0.5)",
                                            borderWidth: 1,
                                            callbacks: {
                                                label: (context) => `${context.label}: ${context.raw} questions`,
                                            },
                                        },
                                    },
                                }}
                                plugins={[centerTextPlugin]}
                            />
                        </div>
                    </div>
                    <div className="mt-4 text-gray-600 dark:text-gray-300">
                        {profiles.map((profile, index) => (
                            <div key={index} className="flex justify-between">
                                <span style={{ color: colorMap[profile.platform]?.border || "#75C0C0" }}>
                                    {profile.platform}:
                                </span>
                                <span>{profile.questions_solved || 0} questions</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}