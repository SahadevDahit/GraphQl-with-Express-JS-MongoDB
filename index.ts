import { server } from "./connection/server"
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const dbConnect = async () => {
    try {
        mongoose.set("strictQuery", false);
        const connected = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`Mongodb connected ${connected.connection.host}`);
        const { url, port } = await server.listen({ port: process.env.PORT || 5000 });
        console.log(`Server listening at ${url}`);
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

dbConnect();
