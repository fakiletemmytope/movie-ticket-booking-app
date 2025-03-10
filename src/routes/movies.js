import { Router } from "express";
import { createMovie, deleteMovie, getMovie, getMovies, rateMovie, reviewMovie, updateMovie, upload_image_to_cloud } from "../controllers/MovieController.js";
import { authenticate, isAdmin, isAdminOrOwner, isViewer } from "../middlewares/authenticate.js";
import multer from "multer"
import { validate_movieCreate, validate_movieUpdate } from "../middlewares/validate.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router()

router.get('/', getMovies)
router.get('/:id', getMovie)
router.post('/', authenticate, isAdminOrOwner, validate_movieCreate, createMovie)
router.put('/:id', authenticate, isAdmin, validate_movieCreate, updateMovie)
router.put('/:id/rating', authenticate, isViewer, validate_movieCreate, rateMovie)
router.put('/:id/review', authenticate, isViewer, validate_movieCreate, reviewMovie)
router.delete('/:id', isAdmin, deleteMovie)
router.post("/:id/upload", authenticate, isAdminOrOwner, upload.single('image'), upload_image_to_cloud)


export const moviesRouter = router