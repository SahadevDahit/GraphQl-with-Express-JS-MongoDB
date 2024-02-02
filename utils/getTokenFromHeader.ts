import { Request } from 'express';

export const getTokenFromHeader = (req: Request) => {
    try {
        // Get token from header
        const token = req?.headers["token"];

        if (token === undefined) {
            throw new Error("No token found in the header");
        }

        return token;
    } catch (error) {
        // Handle the error, log it, or throw a custom error if needed
        console.error(error);
        throw new Error("Error while extracting token from header");
    }
};
