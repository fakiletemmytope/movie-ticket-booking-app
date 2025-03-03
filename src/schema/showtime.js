// Showtime:
// ShowtimeID (PK)
// MovieID (FK)
// CinemaID (FK)
// DateTime
// ScreenNumber


import mongoose from "mongoose";

const { Schema, model } = mongoose

const showtimeSchema = new Schema (
    {
        movie_id:{},
        cinema_id:{},
        dateTime: {},
        screen_id: {}
    }
)

export const showtimeModel = model('Showtime', showtimeSchema)

// User - Booking: A User can make many Bookings (1:M).
// Movie - Showtime: A Movie can have many Showtimes (1:M).
// Cinema - Showtime: A Cinema can have many Showtimes (1:M).
// Showtime - Seat: A showtime has many seats. (1:M)
// Showtime - Booking: A Showtime can have many Bookings (1:M).
// Booking - Seat: A booking has many seats. (1:M)
// Booking - Payment: A Booking has one Payment (1:1).
// Cinema - Seat: A Cinema has many Seats (1:M).