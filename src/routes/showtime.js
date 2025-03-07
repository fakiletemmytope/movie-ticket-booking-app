import { Router } from "express";
import { isAdminOrOwner, isOwner } from "../middlewares/authenticate.js";

const router = Router()

router.get('/', getShowtimes)
router.get('/:id', getShowtime)
router.post('/', authenticate, isOwner, createShowtime)
router.put('/', authenticate, isOwner, updateShowtime)
router.delete('/', authenticate, isAdminOrOwner, deleteShowtime)

export const showtime_router = router