import { Router } from "express"
import { register, login, me, refreshToken } from "../controllers/authController.js"
import { validateLogin, validateRegister } from "../validators/authValidator.js"
import { identifyUser } from "../middlewares/authMiddleware.js"

const router = Router()

router.post("/register", validateRegister, register)

router.post("/login", validateLogin, login)

router.post("/me", identifyUser, me)

router.post("/refresh", refreshToken);

export default router