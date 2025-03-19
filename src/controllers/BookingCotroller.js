
import { db_connect, db_close } from "../database/db.js"
import { bookingModel } from "../schema/booking.js"
import { showtimeModel } from "../schema/showtime.js"
const getBooking = async (req, res) => {
    const id = req.params.id
    try {
        await db_connect()
        const booking = bookingModel.findById(id)
        booking ? res.status(200).json(booking) : res.status(404).send("Ticket not found")
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        await db_close()
    }
}

const getBookings = async () => {
    try {
        await db_connect()
        const bookings = bookingModel.find({}).exec()
        res.status(200).json(bookings)

    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        await db_close()
    }
}

const createBooking = async (req, res) => {
    const { showtime_id, seats_booked } = req.body
    const user_id = req.decode._id
    const amount = 5000 // will determine the amount on the backend or add price to each seats
    try {
        await db_connect()
        const show = await showtimeModel.findById(showtime_id)
        if (!show) {
            return res.status(404).send("Showtime does not exist")
        }
        const unavailableSeats = show.booked_seats.filter(seat => seats_booked.includes(seat.toString()))


        if (unavailableSeats.length > 0) {
            return res.status(400).json({ message: 'Some seats are not available', unavailableSeats });
        }

        const remainingAvailableSeats = show.available_seats.filter(seat => !seats_booked.includes(seat.toString()));

        // Update the showtime document
        show.available_seats = remainingAvailableSeats;
        show.booked_seats.push(...seats_booked);

        await show.save();
        const booking = await bookingModel.create({ showtime_id, amount, seats_booked, user_id })

        res.status(201).json(booking)
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        await db_close()
    }
}

export {
    getBooking,
    getBookings,
    createBooking
}