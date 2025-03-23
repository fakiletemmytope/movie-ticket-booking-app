
import { db_connect, db_close } from "../database/db.js"
import { bookingModel } from "../schema/booking.js"
import { screenModel } from "../schema/screen.js"
import { seatModel } from "../schema/seat.js"
import { showtimeModel } from "../schema/showtime.js"
import { UserType } from "../schema/user.js"
const getBooking = async (req, res) => {
    const id = req.params.id
    try {
        await db_connect()
        let booking = null
        if (req.decode.userType === UserType.ADMIN)
            booking = await bookingModel.findById(id)
        if (req.decode.userType === UserType.VIEWER)
            booking = await bookingModel.findOne({ _id: id, user_id: req.decode._id })
        booking ? res.status(200).json(booking) : res.status(404).send("Ticket not found")
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        await db_close()
    }
}

const getBookings = async (req, res) => {
    try {
        await db_connect()
        let bookings = []
        if (req.decode.userType === UserType.ADMIN)
            bookings = await bookingModel.find({}).exec()
        if (req.decode.userType === UserType.VIEWER)
            bookings = await bookingModel.find({ user_id: req.decode._id }).exec()
        res.status(200).json(bookings)
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        await db_close()
    }
}


const cal_price = async (seatIds = []) => {
    let price = 0
    for (const id of seatIds) {
        const { seat_price, screen } = await seatModel.findById(id);
        console.log("price",seat_price)
        console.log("id", screen)
        const { base_price } = await screenModel.findById(screen);
        console.log(base_price)
        price += seat_price + base_price;
        console.log(price)
    }
    return price
}

const createBooking = async (req, res) => {
    const { showtime_id, seats_booked } = req.body
    const user_id = req.decode._id
    const amount = 5000 // will determine the amount on the backend or add price to each seats
    try {
        await db_connect()
        //chck if showtime exists and upcomi
        const show = await showtimeModel.findById(showtime_id)
        if (!show)
            return res.status(404).send("Showtime does not exist")

        //check if show is completed ot canceled
        if (show.status == 'canceled' || show.status == 'completed')
            return res.status(200).send("Show is completed or canceled")

        //check if seats are still available
        const unavailableSeats = show.booked_seats.filter(seat => seats_booked.includes(seat.toString()))
        if (unavailableSeats.length > 0) {
            return res.status(400).json({ message: 'Some seats are not available', unavailableSeats });
        }

        // book the ticket and update the available and booked seats
        const amount = await cal_price(seats_booked)
        const booking = await bookingModel.create({ showtime_id, amount, seats_booked, user_id, amount })
        await showtimeModel.updateOne(
            { _id: showtime_id },
            {
                $push: { booked_seats: { $each: seats_booked } },
                $pull: { available_seats: { $in: seats_booked } }
            }
        )
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