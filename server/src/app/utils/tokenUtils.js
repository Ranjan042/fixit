import jwt from "jsonwebtoken"
import crypto from "crypto"
import config from "../config/config.js"
import { decode } from "punycode"


export const generateAccessToken = (userId) => {
    return jwt.sign(
        { sub: userId.toString() },
        config.ACCESS_TOKEN_SECRET,
        {
            expiresIn: config.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const verifyAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        return {
            success: "true",
            decoded
        }
    } catch (error) {
        return {
            success: "false",
            message: error.message
        }
    }
}

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        { sub: userId.toString() },
        config.REFRESH_TOKEN_SECRET,
        {
            expiresIn: config.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET)

        return {
            success: "true",
            decoded
        }
    } catch (error) {
        return {
            success: "false",
            message: error.message
        }
    }
}

export const hashToken = (token) => {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
};