import app from "./app.js";
import { userRouter } from "./routes/user.js";
const PORT = 3000

app.listen(PORT, () => {
    console.log(`Movie Ticket Booking Backend listening on port ${PORT}`)
})