import { Router } from "express";
import { createSeat, deleteSeat, getSeat, getSeats, updateSeat } from "../controllers/SeatController.js";

const router = Router()

router.get('/', getSeats)
router.get('/:id', getSeat)
router.post('/', createSeat)
router.put('/:id', updateSeat)
router.delete('/:id', deleteSeat)

export const seat_router = router