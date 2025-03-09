import { db_close, db_connect } from "../database/db.js"
import { movieModel } from "../schema/movie.js"
import { upload_image } from "../utils/upload.js"

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
}

const reviewMovie = async (req, res) => {
    const id = req.params.id
    const { _id } = req.decode
}

const deleteMovie = async () => {
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


//adjust this
export const upload_image = async (req, res) => {

    try {
        await db_connect()
        const movie = await movieModel.findById(req.params.id)
        if (movie) {
            if (req.decode.userType === "admin" || req.decode.userType === "owner") {
                const image = req.file
                const base64Image = image.buffer.toString('base64');
                const imageDataURI = `data:${image.mimetype};base64,${base64Image}`;
                const result = await upload_image(imageDataURI);
                const imageURL = result.secure_url
                const update_image_url = await movieModel.findByIdAndUpdate(
                    req.params.lesson_id, { imageURL: imageURL },
                    { new: true }
                )
                res.json({ update_image_url });
            }
            else {
                res.status(403).send("Unauthorised user")
            }

        }
        else {
            res.status(403).send('Lesson not found');
        }
    } catch (error) {
        res.status(500).send('Upload failed', error.message);
    }
}


export {
    getMovie,
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    rateMovie,
    reviewMovie,
    upload_image
}