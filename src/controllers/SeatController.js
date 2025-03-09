import { db_close, db_connect } from "../database/db.js"
import { seatModel } from "../schema/seat.js"
import { screenModel } from "../schema/screen.js"

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


const getSeats = (req, res) => {

}

const createSeat = async (req, res) => {
    const { seats } = req.body
    try {
        await db_connect()
        const seats = await seatModel.insertMany(seats)
        const seatIds = seats.map(seat => seat._id);
        await screenModel.findByIdAndUpdate(screenId, {
            $push: { seats: { $each: seatIds } } // Assuming a 'seats' array exists in ScreenModel
        });

    } catch (error) {

    }
}


const updateSeat = (req, res) => {

}


const deleteSeat = (req, res) => {

}