import express from "express"
import { userRouter } from "./routes/user.js";
import { authRouter } from "./routes/auth.js";
import bodyParser from "body-parser";
import { moviesRouter } from "./routes/movies.js";
import { cinema_router } from "./routes/cinema.js";
import { screen_router } from "./routes/screen.js";

const app = express()
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/users', userRouter)
app.use('/auth', authRouter)
app.use('/api/movies', moviesRouter)
app.use('/api/cinemas', cinema_router)
app.use('/api/screens', screen_router)
export default app