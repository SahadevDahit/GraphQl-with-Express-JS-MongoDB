import jwt from "jsonwebtoken";

const generateToken = (id: string): string => {
    return jwt.sign({
        id
    }, process.env.JWT_KEY!, {
        expiresIn: "1d"
    });
};


export default generateToken;
