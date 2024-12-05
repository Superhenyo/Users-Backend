import jwt from "jsonwebtoken";
import express, { NextFunction, Request, Response } from 'express';

const secret = "BackendAPI";

declare global {
    namespace Express {
        interface Request {
            user: {
                userId: string;
                email: string;
                role: string;
            }
        }
    }
}

interface User {
    userId: string;
    email: string;
    role: string;
}

export const createAccessToken = (user: User) => {
    console.log("User data for token creation:", user);

    const data = {
        userId: user.userId,
        email: user.email,
        role: user.role,
    };

    return jwt.sign(data, secret, { expiresIn: '12h' })
}

export const verify = (req: Request, res: Response, next: NextFunction): void => {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({
            auth: "Failed",
            message: "No Token Provided"
        })
        return;
    }

    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({
                auth: "Failed",
                message: err.message
            })
        }
        console.log(decodedToken)
        req.user = decodedToken as User;
        next();
    })

}

export const verifyAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (req.user?.role === "Staff") {
        next();
    } else {
        res.status(403).json({
            auth: " Failed",
            message: "Action Forbidded",
        });
        return;

    }
}