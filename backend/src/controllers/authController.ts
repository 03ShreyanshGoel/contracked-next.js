// backend/src/controllers/authController.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { UserResponse, ControllerHandler, AuthRequestBody } from "../types";

const prisma = new PrismaClient();

export const authenticateUser: ControllerHandler = async (
    req: Request<{}, {}, AuthRequestBody>,
    res: Response
) => {
    const { email, name, token } = req.body;

    try {
        if (!email || !token) {
            res.status(400).json({ error: "Email and token are required" });
            return;
        }

        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    name,
                    role: "USER",
                },
            });
        }

        // Generate a JWT for the user
        const jwtPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
        const accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
            expiresIn: "7d", // Adjust expiration as needed
        });

        const response: UserResponse = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            token: accessToken, // Add the token to the response
        };

        res.json(response);
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ error: "Authentication failed" });
    } finally {
        await prisma.$disconnect();
    }
};

export const getUser: ControllerHandler = async (req: Request, res: Response) => {
    const { email } = req.query;

    try {
        if (typeof email !== 'string') {
            res.status(400).json({ error: 'Email is required' });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const response: UserResponse = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        res.json(response);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Server error' });
    } finally {
        await prisma.$disconnect();
    }
};