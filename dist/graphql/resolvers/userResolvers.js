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
const userResolvers = {
    Query: {
        getUserById: (_, { userId }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield users_1.default.findById(userId);
        }),
        getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield users_1.default.find();
        }),
    },
    Mutation: {
        createUser: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const validatedInput = (0, index_1.validateUserInput)(input);
            const newUser = yield users_1.default.create(validatedInput);
            return newUser;
        }),
        updateUser: (_, { userId, input }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield users_1.default.findByIdAndUpdate(userId, input, { new: true });
        }),
        deleteUser: (_, { userId }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield users_1.default.findByIdAndDelete(userId);
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
