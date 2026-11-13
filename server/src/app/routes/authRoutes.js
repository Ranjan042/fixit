import { Router } from "express"
import { register, login, me } from "../controllers/authController.js"
import { validateLogin, validateRegister } from "../validators/authValidator.js"
import { identifyUser } from "../middlewares/authMiddleware.js"

const router = Router()

router.post("/register", validateRegister, register)

router.post("/login", validateLogin, login)

router.post("/me", identifyUser, me)

export default router