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
// resolvers/postResolvers.ts
const posts_1 = __importDefault(require("../../models/posts"));
const isLoggedIn_1 = require("../../middlewares/isLoggedIn");
const postResolvers = {
    Query: {
        getPostById: (_, { postId }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield posts_1.default.findById(postId);
        }),
        getAllPosts: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const posts = yield posts_1.default.find().populate('userId').lean();
                return posts.map(post => {
                    return Object.assign(Object.assign({}, post), { user: post.userId });
                });
            }
            catch (error) {
                console.error(error);
                throw new Error('Error fetching posts');
            }
        }),
    },
    Mutation: {
        createPost: (_, { input }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const loginStatus = yield (0, isLoggedIn_1.isLoggedIn)(context.req, context.res, context.next);
                if (!loginStatus) {
                    return;
                }
                const post = yield posts_1.default.create(Object.assign(Object.assign({}, input), { userId: context.req.userAuthId }));
                return post;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error creating post');
            }
        }),
        updatePost: (_, { postId, input }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const loginStatus = yield (0, isLoggedIn_1.isLoggedIn)(context.req, context.res, context.next);
                if (!loginStatus) {
                    return;
                }
                return yield posts_1.default.findByIdAndUpdate(postId, input, { new: true });
            }
            catch (error) {
                console.error(error);
                throw new Error('Error updating post');
            }
        }),
        deletePost: (_, { postId }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const loginStatus = yield (0, isLoggedIn_1.isLoggedIn)(context.req, context.res, context.next);
                if (!loginStatus) {
                    return;
                }
                return yield posts_1.default.findByIdAndDelete(postId);
            }
            catch (error) {
                console.error(error);
                throw new Error('Error deleting post');
            }
        }),
    },
};
exports.default = postResolvers;
