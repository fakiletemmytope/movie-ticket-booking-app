import { db_close, db_connect } from "../database/db.js"
import { cinemaModel } from "../schema/cinema.js"
import { screenModel } from "../schema/screen.js"
import { seatModel } from "../schema/seat.js"

const getScreens = async (req, res) => {
    const cinema = req.query.cinema
    try {
        await db_connect()
        let screens = []
        if (cinema) {
            screens = await screenModel.find({ cinema: cinema }).populate('seats').populate('showtimes').exec()
        }
        else {
            screens = await screenModel.find({}).populate('seats').populate('showtimes').exec()
        }
        res.status(200).json(screens)
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        await db_close()
    }

}

const getScreen = async (req, res) => {
    const id = req.params.id
    try {
        await db_connect()
        const screen = await screenModel.findById(id)
        screen ? res.status(200).json(screen) : res.status(404).send("Screen not found")
    } catch (error) {
        res.status(500).send(error.message)
    }
    finally {
        await db_close()
    }
}


const createScreen = async (req, res) => {
    const { screenType, capacity, cinema } = req.body
    try {
        await db_connect()
        const cinema_exist = await cinemaModel.findById(cinema)
        if (cinema_exist) {
            const screen = await screenModel.create({ capacity, screenType, cinema })
            await cinemaModel.findByIdAndUpdate(
                cinema,
                { $addToSet: { screens: screen._id } },
            )
            res.status(201).json(screen)
        } else {
            res.status(404).send("Cinema does not exist")
        }

    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}

const updateScreen = async (req, res) => {
    const id = req.params.id
    const { screenType, capacity } = req.body
    const update = {}
    if (screenType)
        update.screenType = screenType
    if (capacity)
        update.capacity = capacity
    try {
        await db_connect()
        const updated = await screenModel.findByIdAndUpdate(id, update, { new: true })
        updated ? res.status(200).json(updated) : res.status(404).send("Screen not found")
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}

const deleteScreen = async (req, res) => {
    const id = req.params.id
    try {
        await db_connect()
        const screen = await screenModel.findById(id)
        if (screen) {
            await seatModel.deleteMany({ screen: id }) //delete all seats in the screen
            await screenModel.findByIdAndDelete(id)
            res.status(204).send()
        } else {
            res.status(404).send("Screen not found")
        }
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}


export {
    getScreen,
    getScreens,
    updateScreen,
    deleteScreen,
    createScreen

}