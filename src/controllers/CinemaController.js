import { cinemaModel } from "../schema/cinema.js"
import { userModel } from "../schema/user.js"
import { db_close, db_connect } from "../database/db.js"

const getCinemas = async (req, res) => {
    try {
        await db_connect()
        const cinemas = await cinemaModel.find({}).populate("screens")
        res.status(200).json(cinemas)
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        await db_close()
    }
}

const getCinema = async (req, res) => {
    const id = req.params.id
    try {
        await db_connect()
        const cinema = await cinemaModel.findById(id)
        cinema ? res.status(200).json(cinema) : res.status(404).send("Cinema not found")
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}

const createCinema = async (req, res) => {
    const { name, address, city, state } = req.body
    const manager = req.decode._id
    try {
        await db_connect()
        const cinema = await cinemaModel.create({ name, address, city, state, manager })
        await userModel.findByIdAndUpdate(
            manager,
            { $addToSet: { cinemas: cinema._id } }, // Use $addToSet to avoid duplicates
            { new: true }
        );
        res.status(201).json(cinema)
    } catch (error) {
        res.status(500).send(error.message)
    }
    finally {
        await db_close()
    }
}

const updateCinema = async (req, res) => {
    const { id } = req.params
    const { name, address, city, state } = req.body
    const update = {}
    if (name)
        update.name = name
    if (address)
        update.address = address
    if (city)
        update.city = city
    if (state)
        update.state = state
    try {
        await db_connect()
        const updated = await cinemaModel.findByIdAndUpdate(id, update, { new: true })
        update ? res.status(200).json(updated) : res.status(404).send("Cinema not found or updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
    finally {
        db_close()
    }
}

const deleteCinema = async (req, res) => {
    const { id } = req.params
    try {
        await db_connect()
        const deleted = await cinemaModel.findByIdAndDelete(id)
        deleted ? res.status(204) : res.status(404).send("Cinema not found")
    } catch (error) {
        res.status(500).send(error.message)
    }
    finally {
        db_close()
    }
}

const reviewCinema = async (req, res) => {
    const id = req.params.id
    const { _id } = req.decode
    const { review } = req.body
    try {
        await db_connect()
        const cinema = await cinemaModel.findById(id)
        if (cinema) {
            const { reviews = [] } = cinema
            if (review) {
                const exists = reviews.find(({ user }) => user == _id)
                if (exists) {
                    exists.review = review
                }
                else {
                    const new_review = {
                        user: _id,
                        review: review
                    }
                    reviews.push(new_review)
                }
            }
            else {
                reviews = [{ user: _id, review: review }]
            }
            const update = { reviews: reviews }
            const updated = await cinemaModel.findByIdAndUpdate(id, update, { new: true })
            updated ? res.status(200).json(updated) : res.status(404).send("Review not updated")
        }
        else {
            res.status(404).send("Cinema not found")
        }
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}

export {
    getCinema,
    getCinemas,
    createCinema,
    updateCinema,
    deleteCinema,
    reviewCinema
}