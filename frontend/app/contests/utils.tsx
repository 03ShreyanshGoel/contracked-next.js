// pages/contests/utils.tsx
export function getDuration(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end.getTime() - start.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(minutes).padStart(2, "0");

    return `${paddedHours}h ${paddedMinutes}m`;
}

export function getTimeLeft(startTime: string, endTime: string, status: "UPCOMING" | "PAST") {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (status === "PAST") return "Ended";

    if (now < start) {
        const diffMs = start.getTime() - now.getTime();
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        let timeLeft = "Before start : ";
        if (days > 0) timeLeft += `${days} day${days > 1 ? "s" : ""} `;
        if (hours > 0 || days > 0) timeLeft += `${hours}h `;
        timeLeft += `${minutes}m`;
        return timeLeft.trim() || "Starting soon";
    }

    if (now >= start && now <= end) {
        const diffMs = end.getTime() - now.getTime();
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        let timeLeft = "Ending in : ";
        if (days > 0) timeLeft += `${days} day${days > 1 ? "s" : ""} `;
        if (hours > 0 || days > 0) timeLeft += `${hours}h `;
        timeLeft += `${minutes}m`;
        return timeLeft.trim() || "Ending soon";
    }

    return "N/A";
}

export function formatDate(startTime: string) {
    return new Date(startTime).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
    });
}
