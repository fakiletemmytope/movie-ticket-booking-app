import { Router } from "express";
import { isAdminOrOwner, isOwner } from "../middlewares/authenticate";

const router = Router()

router.get('/', getCinemas)
router.get('/:id', getCinema)
router.post('/', authenticate, isOwner, createCinema)
router.put('/', authenticate, isOwner, updateCinema)
router.delete('/', authenticate, isAdminOrOwner, deleteCinema)

export const cinema_router = router