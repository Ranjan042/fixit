import mongoose from 'mongoose';
import config from "./config.js";
import dns from 'dns';

const connectDB = async () => {
    try {
        dns.setServers(["8.8.8.8", "8.8.4.4"]);
        const conn = await mongoose.connect(config.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;