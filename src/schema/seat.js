import mongoose from "mongoose";

const { Schema, model } = mongoose

const seatSchema = new Schema (
    {
        screen: {type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true},
        row: {type: Number, required: true},
        seat_number: {type: Number, required: true},
    }
)

export const seatModel = model('Seat', seatSchema)