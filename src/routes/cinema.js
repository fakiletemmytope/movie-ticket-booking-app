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
import { validate_cinemaCreate, validate_cinemaUpdate } from "../middlewares/validate.js";

const router = Router()

router.get('/', getCinemas)
router.get('/:id', getCinema)
router.post('/', authenticate, isOwner, validate_cinemaCreate, createCinema)
router.put('/id', authenticate, isOwner, validate_cinemaUpdate, updateCinema)
router.put("/:id/review", authenticate, isViewer, validate_cinemaUpdate, reviewCinema)
router.delete('/:id', authenticate, isAdminOrOwner, deleteCinema)

export const cinema_router = router