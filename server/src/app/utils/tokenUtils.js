import jwt from "jsonwebtoken"
import crypto from "crypto"
import config from "../config/config.js"

export const generateAccessToken = (userId) => {
    return jwt.sign(
        { sub: userId.toString() },
        config.ACCESS_TOKEN_SECRET,
        {
            expiresIn: config.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        { sub: userId.toString() },
        config.REFRESH_TOKEN_SECRET,
        {
            expiresIn:config.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const hashToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};