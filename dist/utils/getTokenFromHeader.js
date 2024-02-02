"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromHeader = void 0;
const getTokenFromHeader = (req) => {
    try {
        // Get token from header
        const token = req === null || req === void 0 ? void 0 : req.headers["token"];
        if (token === undefined) {
            throw new Error("No token found in the header");
        }
        return token;
    }
    catch (error) {
        // Handle the error, log it, or throw a custom error if needed
        console.error(error);
        throw new Error("Error while extracting token from header");
    }
};
exports.getTokenFromHeader = getTokenFromHeader;
