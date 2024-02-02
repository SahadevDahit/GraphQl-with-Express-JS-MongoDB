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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = require("../../utils/index");
const isLoggedIn_1 = require("../../middlewares/isLoggedIn");
const userResolvers = {
    Query: {
        getUserById: (_, { userId }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const loginStatus = yield (0, isLoggedIn_1.isLoggedIn)(context.req, context.res, context.next);
            if (!loginStatus) {
                return;
            }
            return yield users_1.default.findById(userId);
        }),
        getAllUsers: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const loginStatus = yield (0, isLoggedIn_1.isLoggedIn)(context.req, context.res, context.next);
                if (!loginStatus) {
                    return;
                }
                return yield users_1.default.find();
            }
            catch (error) {
                console.error(error);
                throw new Error('Error fetching users');
            }
        }),
    },
    Mutation: {
        createUser: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const validatedInput = (0, index_1.validateUserInput)(input);
            const newUser = yield users_1.default.create(validatedInput);
            return newUser;
        }),
        updateUser: (_, { userId, input }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const loginStatus = yield (0, isLoggedIn_1.isLoggedIn)(context.req, context.res, context.next);
                if (!loginStatus) {
                    return;
                }
                return yield users_1.default.findByIdAndUpdate(userId, input, { new: true });
            }
            catch (error) {
                console.error(error);
                throw new Error('Error updating user');
            }
        }),
        deleteUser: (_, { userId }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const loginStatus = yield (0, isLoggedIn_1.isLoggedIn)(context.req, context.res, context.next);
                if (!loginStatus) {
                    return;
                }
                return yield users_1.default.findByIdAndDelete(userId);
            }
            catch (error) {
                console.error(error);
                throw new Error('Error deleting user');
            }
        }),
        signIn: (_, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield users_1.default.findOne({ email });
            if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                throw new Error('Invalid email or password');
            }
            const token = (0, index_1.generateToken)((user._id).toString());
            return { user, token };
        }),
    },
};
exports.default = userResolvers;
