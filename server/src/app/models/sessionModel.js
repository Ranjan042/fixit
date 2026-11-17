import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    refreshTokenHash: {
        type: String,
        required: true
    },
    device: {
        type: String,
        default: "Unknown"
    },
    expiresAt: {
        type: Date,
        required: true
    },
    revokedAt: {
        type: Date,
        default: null
    }
},{
        timestamps: true
    }
)

const sessionModel = mongoose.model("session",sessionSchema)

export default sessionModel