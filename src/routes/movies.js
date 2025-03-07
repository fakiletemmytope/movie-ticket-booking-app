import { Router } from "express";
import { createMovie, deleteMovie, getMovie, getMovies, rateMovie, reviewMovie, updateMovie } from "../controllers/MovieController.js";
import { authenticate, isAdmin, isAdminOrOwner, isViewer } from "../middlewares/authenticate.js";
import { validate_movieCreate } from "../middlewares/validate.js";

const router = Router()

router.get('/', getMovies)
router.get('/:id', getMovie)
router.post('/', authenticate, isAdminOrOwner, validate_movieCreate, createMovie)
router.put('/:id', authenticate, isAdmin, validate_movieCreate, updateMovie)
router.put('/:id/rating', authenticate, isViewer, validate_movieCreate, rateMovie)
router.put('/:id/review', authenticate, isViewer, validate_movieCreate, reviewMovie)
router.delete('/:id', isAdmin, deleteMovie)


export const moviesRouter = router