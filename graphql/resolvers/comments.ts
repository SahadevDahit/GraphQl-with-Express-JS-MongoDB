// graphql/resolvers/commentsResolvers.ts
import commentsModel from '../../models/comments';
import { isLoggedIn } from '../../middlewares/isLoggedIn';

const commentsResolvers = {
    Query: {
        getAllComments: async (_: any, __: any, context: any) => {
            try {
                const comments = await commentsModel.find().populate('userId').populate('postId').lean();
                return comments.map(comment => {
                    return {
                        ...comment,
                        user: comment.userId,
                        postId: comment.postId._id
                    };
                });
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching comments');
            }

        },
        getCommentById: async (_: any, { commentId }: { commentId: string }, context: any) => {
            const comment = await commentsModel.findOne({ _id: commentId });

            if (!comment) {
                throw new Error('Comment not found or unauthorized');
            }
            return comment;
        },
    },
    Mutation: {
        createComment: async (_: any, { input }: { input: any }, context: any) => {
            const loginStatus = await isLoggedIn(context.req, context.res, context.next);
            if (!loginStatus) {
                return
            }
            if (input.userId !== context.req.userAuthId) {
                throw new Error('You can only create a comment for your own user.');
            }

            // Add the user ID from the authenticated user to the input
            const comment = await commentsModel.create({
                ...input,
            });

            return comment;
        },
        updateComment: async (_: any, { commentId, input }: { commentId: string, input: any }, context: any) => {
            const loginStatus = await isLoggedIn(context.req, context.res, context.next);
            if (!loginStatus) {
                return
            }
            const comment = await commentsModel.findById(commentId);

            if (comment && comment.userId.toString() !== context.req.userAuthId) {
                throw new Error('You are not authorized to update this comment.');
            }

            // Use commentId directly for the update
            return await commentsModel.findByIdAndUpdate(commentId, { $set: input }, { new: true });
        },

        deleteComment: async (_: any, { commentId }: { commentId: string }, context: any) => {
            const loginStatus = await isLoggedIn(context.req, context.res, context.next);
            if (!loginStatus) {
                return
            }
            const comment = await commentsModel.findById(commentId);

            if (comment && comment.userId.toString() !== context.req.userAuthId) {
                throw new Error('You are not authorized to delete this comment.');
            }

            return await commentsModel.findByIdAndDelete(commentId);
        },
    },
};

export default commentsResolvers;
