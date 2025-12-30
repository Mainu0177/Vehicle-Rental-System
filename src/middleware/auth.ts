
import jwt, { JwtPayload } from 'jsonwebtoken';
import {Request, Response, NextFunction } from "express"
import config from '../config';

export interface IUserToken{
    id: number;
    role: "admin" | "customer"
}

const auth = (...roles: string[]) => {
    return (req: Request & {user?: IUserToken}, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            const accessToken = token?.split(" ")[1]
            if (!accessToken) {
                throw new Error("You are not allowed!")
            }

            const decoded = jwt.verify(accessToken, config.jwtSecret as string) as IUserToken;
            req.user = decoded;

            if (roles.length && !roles.includes(decoded.role as string)) {
                return res.status(500).json({
                    error: "unauthorized!!",
                });
            }
            next();
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}


export default auth;