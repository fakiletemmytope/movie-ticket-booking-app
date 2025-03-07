import { Router } from "express";
import { activate_user, get_activation_token, login, logout } from "../controllers/AuthController.js"

const router = Router()

router.post('/login', login)
router.get('/logout', logout)
router.get('/activate', activate_user)
router.post('/get-activation-token', get_activation_token)

export const authRouter = router