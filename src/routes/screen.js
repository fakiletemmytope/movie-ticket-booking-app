import {
    createScreen,
    deleteScreen,
    getScreen,
    getScreens,
    updateScreen
} from "../controllers/ScreenController.js";
import {authenticate, isAdminOrOwner, isOwner} from "../middlewares/authenticate.js"
import { Router } from "express";

const router = Router()
router.get('/', getScreens)
router.get('/:id', getScreen)
router.post('/', authenticate, isOwner, createScreen)
router.put('/:id', authenticate, isOwner, updateScreen)
router.delete('/:id', authenticate, isAdminOrOwner, deleteScreen)
export const screen_router = router