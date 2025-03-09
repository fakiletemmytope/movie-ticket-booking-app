import { Router } from "express";
import { isAdminOrOwner, isOwner, isViewer, authenticate } from "../middlewares/authenticate.js";
import {
    getCinema,
    getCinemas,
    createCinema,
    updateCinema,
    reviewCinema,
    deleteCinema
} from "../controllers/CinemaController.js";

const router = Router()

router.get('/', getCinemas)
router.get('/:id', getCinema)
router.post('/', authenticate, isOwner, createCinema)
router.put('/id', authenticate, isOwner, updateCinema)
router.put("/:id/review", authenticate, isViewer, reviewCinema)
router.delete('/:id', authenticate, isAdminOrOwner, deleteCinema)

export const cinema_router = router