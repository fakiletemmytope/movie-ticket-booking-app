import express from "express"
import { userRouter } from "./routes/user.js";
import { authRouter } from "./routes/auth.js";
import bodyParser from "body-parser";
import { moviesRouter } from "./routes/movies.js";

const app = express()
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/users', userRouter)
app.use('/auth', authRouter)
app.use('/api/movies', moviesRouter)
export default app