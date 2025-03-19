import { db_close, db_connect } from "../database/db.js"
import { seatModel } from "../schema/seat.js"
import { screenModel } from "../schema/screen.js"
import { cinemaModel } from "../schema/cinema.js"

const getSeat = async (req, res) => {
    const id = req.params.id
    try {
        await db_connect()
        const seat = await seatModel.findById(id)
        seat ? res.status(200).json(seat) : res.status(404).send("Seat not found")
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}


const getSeats = async (req, res) => {
    try {
        await db_connect()
        const seats = await seatModel.find({}).exec()
        res.status(200).json(seats)
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}

const createSeat = async (req, res) => {
    const { seats, screen_id } = req.body
    const user_id = req.decode._id
    try {
        await db_connect()
        const screen = await screenModel.findById(screen_id)
        if (!screen) {
            return res.status(404).send("screen not found")
        }
        const cinema = await cinemaModel.findOne({ _id: screen.cinema, manager: user_id });
        if (cinema) {
            seats.forEach(seat => seat.screen = screen_id);
            const seats_created = await seatModel.insertMany(seats)
            const seatIds = seats_created.map(({ _id }) => _id);
            await screenModel.findByIdAndUpdate(screen_id, {
                $push: { seats: { $each: seatIds } }
            });
            res.status(201).json(seats_created)
        }
        else {
            res.status(403).send("Authorised user")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    finally {
        db_close()
    }
}


const updateSeat = async (req, res) => {
    const id = req.params.id
    const { row, seat_number } = req.body
    const update = {}
    if (row)
        update.row = row
    if (seat_number)
        update.seat_number = seat_number
    try {
        await db_connect()
        const seat = await seatModel.findByIdAndUpdate(id, update, { new: true })
        seat ? res.status(200).json(seat) : res.status(404).send("Seat not found")
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}


const deleteSeat = async (req, res) => {
    const id = req.params.id
    try {
        await db_connect()
        const deleted_seat = await seatModel.findByIdAndDelete(id)
        deleted_seat ? res.status(204).send("Seat deleted") : res.status(404).send("Seat not found")
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}

export {
    getSeat,
    getSeats,
    createSeat,
    deleteSeat,
    updateSeat
}