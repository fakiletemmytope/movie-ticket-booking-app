import { Router } from "express";
import { createSeat, deleteSeat, getSeat, getSeats, updateSeat } from "../controllers/SeatController.js";
import { authenticate, isAdminOrOwner, isOwner } from "../middlewares/authenticate.js";
import { validate_seatUpdate, validate_seatCreate } from "../middlewares/validate.js";

const router = Router()

router.get('/', authenticate, isAdminOrOwner, getSeats)
router.get('/:id', authenticate, isAdminOrOwner, getSeat)
router.post('/', authenticate, isOwner, validate_seatCreate, createSeat)
router.put('/:id', authenticate, isOwner, validate_seatUpdate, updateSeat)
router.delete('/:id', authenticate, isAdminOrOwner, deleteSeat)

export const seat_router = router