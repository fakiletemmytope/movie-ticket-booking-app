// Seat:
// SeatID (PK)
// CinemaID (FK)
// ScreenNumber
// RowNumber
// SeatNumber

import mongoose from "mongoose";

const { Schema, model } = mongoose

const seatSchema = new Schema (
    {
        cinema_id: {},
        screen_id: {},
        row_number: {},
        seat_number: {},
    }
)

export const seatModel = model('Seat', seatSchema)