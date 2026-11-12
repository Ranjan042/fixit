import bcrypt from "bcryptjs"
import UserModel from "../models/userModel.js";
import config from "../config/config.js";

import { generateAccessToken, generateRefreshToken, hashToken } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                suceess: "false",
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await UserModel.create({
            username,
            name,
            password: hashedPassword
        })

        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000

        })

        return res.status(201).json({
            suceess: true,
            message: "User registered successfully",
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

