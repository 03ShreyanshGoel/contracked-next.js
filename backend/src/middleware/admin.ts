import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== "ADMIN") {
        res.status(403).json({ message: "Access denied: Admins only" });
        return; // Explicit return after sending response
    }
    next(); // Call next() without returning it
};