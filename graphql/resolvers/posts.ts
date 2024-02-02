// resolvers/postResolvers.ts
import postsModel from '../../models/posts';
import { isLoggedIn } from '../../middlewares/isLoggedIn';

const postResolvers = {
    Query: {
        getPostById: async (_: any, { postId }: { postId: string }) => {
            return await postsModel.findById(postId);
        },
        getAllPosts: async () => {
            try {
                const posts = await postsModel.find().populate('userId').lean();
                return posts.map(post => {
                    return {
                        ...post,
                        user: post.userId,
                    };
                });
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching posts');
            }
        },
    },
    Mutation: {
        createPost: async (_: any, { input }: { input: any }, context: any) => {
            try {
                const loginStatus = await isLoggedIn(context.req, context.res, context.next);
                if (!loginStatus) {
                    return
                }
                const post = await postsModel.create({
                    ...input,
                    userId: context.req.userAuthId, // Assign the user ID from the authenticated user
                });
                return post;
            } catch (error) {
                console.error(error);
                throw new Error('Error creating post');
            }
        },
        updatePost: async (_: any, { postId, input }: { postId: string, input: any }, context: any) => {
            try {
                const loginStatus = await isLoggedIn(context.req, context.res, context.next);
                if (!loginStatus) {
                    return
                }
                return await postsModel.findByIdAndUpdate(postId, input, { new: true });
            } catch (error) {
                console.error(error);
                throw new Error('Error updating post');
            }
        },
        deletePost: async (_: any, { postId }: { postId: string }, context: any) => {
            try {
                const loginStatus = await isLoggedIn(context.req, context.res, context.next);
                if (!loginStatus) {
                    return
                }
                return await postsModel.findByIdAndDelete(postId);
            } catch (error) {
                console.error(error);
                throw new Error('Error deleting post');
            }
        },
    },
};

export default postResolvers;
