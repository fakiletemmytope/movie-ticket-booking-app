import { db_close, db_connect } from "../database/db.js"
import { moviesRouter } from "../routes/movies.js"
import { movieModel } from "../schema/movie.js"

const getMovie = async (req, res) => {
    const id = req.params.id
    try {
        await db_connect()
        const movie = await movieModel.findById(id)
        movie ? res.status(200).json(movie) : res.status(404).send('movie not found')
    } catch (error) {
        res.status(500).send(error.message)
    }
    finally {
        db_close()
    }
}

const getMovies = async (req, res) => {
    try {
        await db_connect()
        const movies = await movieModel.find({}).exec()
        res.status(400).json(movies)
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}

const createMovie = async (req, res) => {
    const { title, cast, duration, genre, description, released_date, imageURL, director } = req.body
    try {
        await db_connect()
        const movie = await movieModel.create({ title, cast, duration, genre, description, released_date, imageURL, director, })
        const { _id, createdAt, updatedAt } = movie
        res.status(201).json({ _id, title, cast, duration, genre, description, released_date, imageURL, director, createdAt, updatedAt })
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}

const updateMovie = async (req, res) => {
    const id = req.params.id
    const { title, cast, duration, genre, description, released_date, imageURL, director, rating, reviews } = req.body
    const update = {}
    if (title)
        update.title = title
    if (cast)
        update.cast = cast
    if (duration)
        update.duration = duration
    if (genre)
        update.genre = genre
    if (description)
        update.description = description
    if (released_date)
        update.released_date = released_date
    if (imageURL)
        update.imageURL = imageURL
    if (director)
        update.director = director
    try {
        await db_connect()
        const updated = await movieModel.findByIdAndUpdate(id, update, { new: true })
        update ? res.status(200).json(updated) : res.status(404).send("Movie not found or update")
    } catch (error) {
        res.status(500).send(error.message)
    }
    finally {
        await db_close()
    }
}

const rateMovie = async (req, res) => {
    const id = req.params.id
    const { _id } = req.decode
    const { rate } = req.body
    try {
        await db_connect()
        const movie = await movieModel.findById(id)
        if (movie) {
            const { rating = [] } = movie
            if (rating) {
                const exists = rating.find(({ user }) => user == _id)
                if (exists) {
                    exists.rate = rate
                }
                else {
                    const new_rate = {
                        user: _id,
                        rate: rate
                    }
                    rating.push(new_rate)
                }
            }
            else {
                rating = [{ user: _id, rate: rate }]
            }
            const totalRate = rating.map(r => r.rate).reduce((acc, val) => acc + val, 0)

            const avg = totalRate / rating.length;
            const update = { rating: rating, average_rating: avg }
            const updated = await movieModel.findByIdAndUpdate(id, update, { new: true })
            updated ? res.status(200).json(updated) : res.status(404).send("Rate not updated")
        }
        else {
            res.status(404).send("Movie not found")
        }
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}

const reviewMovie = async (req, res) => {
    const id = req.params.id
    const { _id } = req.decode
    const { review } = req.body
    try {
        await db_connect()
        const movie = await movieModel.findById(id)
        if (movie) {
            const { reviews = [] } = movie
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
            const updated = await movieModel.findByIdAndUpdate(id, update, { new: true })
            updated ? res.status(200).json(updated) : res.status(404).send("Review not updated")
        }
        else {
            res.status(404).send("Movie not found")
        }
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}

const deleteMovie = async (req, res) => {
    const id = req.params.id
    try {
        await db_connect()
        const deleted = await movieModel.findByIdAndDelete(id)
        deleted ? res.status(204).send("Movie deleted") : res.status(404).send("Movie not found")
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        db_close()
    }
}


export {
    getMovie,
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    rateMovie,
    reviewMovie
}