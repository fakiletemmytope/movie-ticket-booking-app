import { Router } from "express";
import { getUser, getUsers, updateUser, deleteUser, createUser } from "../controllers/UserController.js";
import { hashPassword, isAdmin } from "../middlewares/authenticate.js";
import { validate_userCreate, validate_userUpdate } from "../middlewares/validate.js";
import { authenticate } from "../middlewares/authenticate.js";
const router = Router()

router.get('/', authenticate, isAdmin, getUsers)
router.get('/:id', authenticate, getUser)
router.post('/', validate_userCreate, hashPassword, createUser)
router.put('/:id', authenticate, validate_userUpdate, updateUser)
router.delete('/:id', authenticate, deleteUser)

export const userRouter = router
