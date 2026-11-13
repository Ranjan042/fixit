import { verifyAccessToken } from "../utils/tokenUtils.js";
import { devLog } from "../loger/devloger.js";

export const identifyUser = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];

        if (!accessToken) {
            return res.status(401).json({
                success: "false",
                message: "Unauthorized: Access token missing"
            })
        }

        const result = verifyAccessToken(accessToken);

        devLog("result: ", result)

        if (!result.success) {
            return res.status(401).json({
                success: "false",
                message: "Invalid access token"
            })
        }

        req.user = result.decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Authentication failed"
        });
    }
}