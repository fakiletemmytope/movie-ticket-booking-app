import { Router } from "express";
import { isAdminOrOwner, isOwner, authenticate } from "../middlewares/authenticate.js";
import { getShowtime, getShowtimes, createShowtime, updateShowtime, deleteShowtime } from "../controllers/ShowtimeController.js";
import { validate_showtimeCreate, validate_showtimeUpdate } from "../middlewares/validate.js";

const router = Router()

router.get('/', getShowtimes)
router.get('/:id', getShowtime)
router.post('/', authenticate, isOwner, validate_showtimeCreate, createShowtime)
router.put('/', authenticate, isOwner, validate_showtimeUpdate, updateShowtime)
router.delete('/', authenticate, isAdminOrOwner, deleteShowtime)

export const showtime_router = router