import {
    createScreen,
    deleteScreen,
    getScreen,
    getScreens,
    updateScreen
} from "../controllers/ScreenController.js";
import { authenticate, isAdminOrOwner, isOwner } from "../middlewares/authenticate.js"
import { Router } from "express";
import { validate_screenCreate, validate_screenUpdate } from "../middlewares/validate.js";

const router = Router()
router.get('/', authenticate, getScreens)
router.get('/:id', getScreen)
router.post('/', authenticate, isOwner, validate_screenCreate, createScreen)
router.put('/:id', authenticate, isOwner, validate_screenUpdate, updateScreen)
router.delete('/:id', authenticate, isAdminOrOwner, deleteScreen)
export const screen_router = router