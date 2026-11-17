import bcrypt from "bcryptjs"
import UserModel from "../models/userModel.js";
import sessionModel from "../models/sessionModel.js";
import config from "../config/config.js";
import { generateAccessToken, generateRefreshToken, hashToken, verifyRefreshToken } from "../utils/tokenUtils.js";
import { devLog } from "../loger/devloger.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                suceess: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await UserModel.create({
            name,
            email,
            role,
            password: hashedPassword
        })

        return res.status(201).json({
            suceess: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })


    } catch (error) {
        devLog("Register error: ",error.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"

        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await UserModel.findOne({ email }).select("+password");

        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const sessionId = new mongoose.Types.ObjectId();
        const newAccessToken = generateAccessToken(existingUser._id,sessionId);
        const newRefreshToken = generateRefreshToken(existingUser._id,sessionId);
       
        const expiresAt = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        );

        await sessionModel.create({
            _id:sessionId,
            userId: existingUser._id,
            refreshTokenHash: hashToken(newRefreshToken),
            device: req.headers["user-agent"] || "Unknown",
            expiresAt
        });

   
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        });


        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            accessToken: newAccessToken,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const me = async (req, res) => {
    try {
        const userId = req.user.sub;

        const user = await UserModel.findById(userId)
            .select("name email avatar phone isEmailVerified role createdAt");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                phone: user.phone,
                isEmailVerified: user.isEmailVerified,
                role: user.role,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token missing"
            });
        }

        const result = verifyRefreshToken(refreshToken);

        if (!result.success) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired refresh token"
            })
        }

        const user = await UserModel.findById(result.decoded.sub).select("+refreshTokenHash")

        const incomingTokenHash = hashToken(refreshToken);

        if (!user || user.refreshTokenHash !== incomingTokenHash) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token"
            });
        }

        const newAccessToken = GenerateAccessToken(user._id);
        const newRefreshToken = GenerateRefreshToken(user._id);

        user.refreshTokenHash = hashToken(newRefreshToken);
        await user.save();

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            accessToken: newAccessToken
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token"
        });
    }
}
