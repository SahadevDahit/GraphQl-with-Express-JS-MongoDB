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
// graphql/resolvers/commentsResolvers.ts
const comments_1 = __importDefault(require("../../models/comments"));
const isLoggedIn_1 = require("../../middlewares/isLoggedIn");
const commentsResolvers = {
    Query: {
        getAllComments: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const comments = yield comments_1.default.find().populate('userId').populate('postId').lean();
                return comments.map(comment => {
                    return Object.assign(Object.assign({}, comment), { user: comment.userId, postId: comment.postId._id });
                });
            }
            catch (error) {
                console.error(error);
                throw new Error('Error fetching comments');
            }
        }),
        getCommentById: (_, { commentId }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const comment = yield comments_1.default.findOne({ _id: commentId });
            if (!comment) {
                throw new Error('Comment not found or unauthorized');
            }
            return comment;
        }),
    },
    Mutation: {
        createComment: (_, { input }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const loginStatus = yield (0, isLoggedIn_1.isLoggedIn)(context.req, context.res, context.next);
            if (!loginStatus) {
                return;
            }
            if (input.userId !== context.req.userAuthId) {
                throw new Error('You can only create a comment for your own user.');
            }
            // Add the user ID from the authenticated user to the input
            const comment = yield comments_1.default.create(Object.assign({}, input));
            return comment;
        }),
        updateComment: (_, { commentId, input }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const loginStatus = yield (0, isLoggedIn_1.isLoggedIn)(context.req, context.res, context.next);
            if (!loginStatus) {
                return;
            }
            const comment = yield comments_1.default.findById(commentId);
            if (comment && comment.userId.toString() !== context.req.userAuthId) {
                throw new Error('You are not authorized to update this comment.');
            }
            // Use commentId directly for the update
            return yield comments_1.default.findByIdAndUpdate(commentId, { $set: input }, { new: true });
        }),
        deleteComment: (_, { commentId }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const loginStatus = yield (0, isLoggedIn_1.isLoggedIn)(context.req, context.res, context.next);
            if (!loginStatus) {
                return;
            }
            const comment = yield comments_1.default.findById(commentId);
            if (comment && comment.userId.toString() !== context.req.userAuthId) {
                throw new Error('You are not authorized to delete this comment.');
            }
            return yield comments_1.default.findByIdAndDelete(commentId);
        }),
    },
};
exports.default = commentsResolvers;
