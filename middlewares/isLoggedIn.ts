import { Request, Response, NextFunction } from 'express';
import { getTokenFromHeader } from '../utils/getTokenFromHeader';
import { verifyToken } from '../utils/verifyToken';

// Extend the Request interface to include the custom property
interface CustomRequest extends Request {
    userAuthId?: string; // or whatever type your userAuthId is
}

export const isLoggedIn = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Boolean> => {
    try {
        // get token from header
        const token = getTokenFromHeader(req);
        // verify the token
        const decodedUser: any = verifyToken(token as string);
        if (!decodedUser) {
            console.log('Invalid/Expired token, please login again or no token found ')
            return false;
        } else {
            // save the user into req obj
            req.userAuthId = decodedUser?.id;
            return true;
        }
    } catch (error) {
        console.log('Invalid/Expired token, please login again or no token found')
        return false;


    }
};
