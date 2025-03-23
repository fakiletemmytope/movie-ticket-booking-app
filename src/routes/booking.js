import { Router } from "express";
import { createBooking, getBookings, getBooking } from "../controllers/BookingCotroller.js";
import { authenticate, isViewer } from "../middlewares/authenticate.js";
import { validate_bookingCreate } from "../middlewares/validate.js";

const router = Router()

router.get('/', authenticate, getBookings)
router.get('/:id', authenticate, getBooking)
router.post('/', authenticate, isViewer, validate_bookingCreate, createBooking)

export const booking_router = router