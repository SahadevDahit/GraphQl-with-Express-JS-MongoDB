"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const getTokenFromHeader_1 = require("../utils/getTokenFromHeader");
const verifyToken_1 = require("../utils/verifyToken");
const isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get token from header
        const token = (0, getTokenFromHeader_1.getTokenFromHeader)(req);
        // verify the token
        const decodedUser = (0, verifyToken_1.verifyToken)(token);
        if (!decodedUser) {
            console.log('Invalid/Expired token, please login again or no token found ');
            return false;
        }
        else {
            // save the user into req obj
            req.userAuthId = decodedUser === null || decodedUser === void 0 ? void 0 : decodedUser.id;
            return true;
        }
    }
    catch (error) {
        console.log('Invalid/Expired token, please login again or no token found');
        return false;
    }
});
exports.isLoggedIn = isLoggedIn;
