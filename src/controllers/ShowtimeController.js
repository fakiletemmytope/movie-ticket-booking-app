import { db_close, db_connect } from "../database/db.js"
import { movieModel } from "../schema/movie.js"
import { screenModel } from "../schema/screen.js"
import { showtimeModel } from "../schema/showtime.js"

const getShowtime = async (req, res) => {
    const id = req.params.id
    try {
        await db_connect()
        const showtime = await showtimeModel.findById(id)
            .populate('screen_id').populate('movie_id')
            .populate('available_seats')
            .populate('booked_seats')
        showtime ? res.status(200).json(showtime) : res.status(404).send("Seat not found")
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}

const getShowtimes = async (req, res) => {
    try {
        await db_connect()
        const showtimes = await showtimeModel.find({}).populate('screen_id').exec()
        res.status(200).json(showtimes)
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}

const createShowtime = async (req, res) => {
    const { movie_id, screen_id, dateTime } = req.body
    try {
        await db_connect()
        const screen = await screenModel.findOne({_id: screen_id})
        const movie = await movieModel.findById(movie_id)
        if (screen && movie) {
            await db_connect()
            const showtime = await showtimeModel.create({ movie_id, screen_id, dateTime, available_seats: screen.seats, manager: res.decode._id })
            screen.showtimes.push(showtime._id)
            await screen.save()
            res.status(201).json(showtime)
        }
        else {
            res.status(404).json("Screen or movie not found ")
        }
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        await db_close()
    }
}

const updateShowtime = async (req, res) => {
    const { dateTime } = req.body
    const id = req.params.id
    const user_id = req.decode._id
    try {
        await db_connect()
        const show_updated = await showtimeModel.findOneAndUpdate(
            { _id: id, manager: user_id },
            { dateTime },
            { new: true }
        )
        show_updated ? res.status(200).json(show_updated) : res.status(404).send("show not found")

    } catch (error) {
        res.status(500).send(error.message)
    }
    finally {
        await db_close()
    }
}


const deleteShowtime = async (req, res) => {
    const id = req.params.id
    try {
        await db_connect()
        const deleted_show = await showtimeModel.findByIdAndDelete(id)
        seat ? res.status(200).json(deleted_show) : res.status(404).send("Showtime not found")
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}


export {
    getShowtime,
    getShowtimes,
    createShowtime,
    updateShowtime,
    deleteShowtime
}