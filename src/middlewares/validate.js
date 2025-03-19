import { auth_validator } from "../validator/auth.js"
import { userCreate, userUpdate } from "../validator/user.js"
import { movieCreate, movieUpdate } from "../validator/movie.js"
import { cinemaCreate, cinemaUpdate } from "../validator/cinema.js"
import { bookingCreate } from "../validator/booking.js"
import { seatCreate, seatUpdate } from "../validator/seat.js"
import { screenCreate, screenUpdate } from "../validator/screen.js"
import { showtimeCreate, showtimeUpdate } from "../validator/showtime.js"

export const validate_userCreate = async (req, res, next) => {
    const { error } = userCreate.validate(req.body, { abortEarly: false })
    error ? res.status(422).json(error.details) : next()
}

export const validate_userUpdate = async (req, res, next) => {
    const { error } = userUpdate.validate(req.body, { abortEarly: false })
    error ? res.status(422).json(error.details) : next()
}


export const validate_auth_input = async (req, res, next) => {
    const { error } = auth_validator.validate(req.body, { abortEarly: false })
    error ? res.status(422).json(error.details) : next()
}


export const validate_movieCreate = async (req, res, next) => {
    const { error } = movieCreate.validate(req.body, { abortEarly: false })
    error ? res.status(422).json(error.details) : next()
}


export const validate_movieUpdate = async (req, res, next) => {
    const { error } = movieUpdate.validate(req.body, { abortEarly: false })
    error ? res.status(422).json(error.details) : next()
}

export const validate_cinemaCreate = async (req, res, next) => {
    const { error } = cinemaCreate.validate(req.body, { abortEarly: false })
    error ? res.status(422).json(error.details) : next()
}

export const validate_cinemaUpdate = async (req, res, next) => {
    const { error } = cinemaUpdate.validate(req.body, { abortEarly: false })
    error ? res.status(422).json(error.details) : next()
}


export const validate_bookingCreate = async (req, res, next) => {
    const { error } = bookingCreate.validate(req.body, { abortEarly: false })
    error ? res.status(422).json(error.details) : next()
}


export const validate_seatCreate = async (req, res, next) => {
    const { error } = seatCreate.validate(req.body, { abortEarly: false })
    error ? res.status(422).json(error.details) : next()
}


export const validate_seatUpdate = async (req, res, next) => {
    const { error } = seatUpdate.validate(req.body, { abortEarly: false })
    error ? res.status(422).json(error.details) : next()
}

export const validate_screenCreate = async (req, res, next) => {
    const { error } = screenCreate.validate(req.body, { abortEarly: false })
    error ? res.status(422).json(error.details) : next()
}

export const validate_screenUpdate = async (req, res, next) => {
    const { error } = screenUpdate.validate(req.body, { abortEarly: false })
    error ? res.status(422).json(error.details) : next()
}

export const validate_showtimeCreate = async (req, res, next) => {
    const { error } = showtimeCreate.validate(req.body, { abortEarly: false })
    error ? res.status(422).json(error.details) : next()
}


export const validate_showtimeUpdate = async (req, res, next) => {
    const { error } = showtimeUpdate.validate(req.body, { abortEarly: false })
    error ? res.status(422).json(error.details) : next()
}