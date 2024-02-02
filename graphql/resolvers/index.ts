import userResolvers from "./users";
import postResolvers from "./posts";
import commentsResolvers from "./comments";

const resolvers = [userResolvers, postResolvers, commentsResolvers];
export { resolvers }