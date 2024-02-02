import jwt from "jsonwebtoken";

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_KEY!, (err, decoded) => {
        if (err) {
            return false;
        } else {
            return decoded;
        }
    });
};