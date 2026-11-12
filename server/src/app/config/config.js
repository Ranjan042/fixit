import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY
const NODE_ENV = process.env.NODE_ENV

if (!MONGO_URI) throw new Error("MONGO_URI is missing")
if (!ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is missing")
if (!ACCESS_TOKEN_EXPIRY) throw new Error("ACCESS_TOKEN_EXPIRY is missing")
if (!REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET is missing")
if (!REFRESH_TOKEN_EXPIRY) throw new Error("REFRESH_TOKEN_EXPIRY is missing")


const config = {
    MONGO_URI,
    PORT,
    ACCESS_TOKEN_EXPIRY,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET,
    NODE_ENV
};

export default config;