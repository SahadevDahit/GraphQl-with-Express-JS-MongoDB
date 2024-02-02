// graphql/userResolvers.ts
import IUser from '../../models/users';
import userModel from '../../models/users';
import bcrypt from 'bcrypt';
import { generateToken, UserInput, validateUserInput } from '../../utils/index';
import { isLoggedIn } from '../../middlewares/isLoggedIn';

const userResolvers = {
    Query: {
        getUserById: async (_: any, { userId }: { userId: string }, context: any) => {
            const loginStatus = await isLoggedIn(context.req, context.res, context.next);
            if (!loginStatus) {
                return
            }
            return await userModel.findById(userId);
        },
        getAllUsers: async (_: any, __: any, context: any) => {
            try {
                const loginStatus = await isLoggedIn(context.req, context.res, context.next);
                if (!loginStatus) {
                    return
                }

                return await userModel.find();
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching users');
            }
        },
    },
    Mutation: {
        createUser: async (_: any, { input }: { input: UserInput }) => {
            const validatedInput = validateUserInput(input);
            const newUser = await userModel.create(validatedInput);
            return newUser;
        },
        updateUser: async (_: any, { userId, input }: { userId: string, input: typeof IUser }, context: any) => {
            try {
                const loginStatus = await isLoggedIn(context.req, context.res, context.next);
                if (!loginStatus) {
                    return
                }
                return await userModel.findByIdAndUpdate(userId, input, { new: true });
            } catch (error) {
                console.error(error);
                throw new Error('Error updating user');
            }
        },
        deleteUser: async (_: any, { userId }: { userId: string }, context: any) => {
            try {
                const loginStatus = await isLoggedIn(context.req, context.res, context.next);
                if (!loginStatus) {
                    return
                }
                return await userModel.findByIdAndDelete(userId);
            } catch (error) {
                console.error(error);
                throw new Error('Error deleting user');
            }
        },
        signIn: async (_: any, { email, password }: { email: string, password: string }) => {
            const user = await userModel.findOne({ email });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new Error('Invalid email or password');
            }
            const token = generateToken((user._id).toString());
            return { user, token };
        },
    },
};

export default userResolvers;
