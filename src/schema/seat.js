import mongoose from "mongoose";

const { Schema, model } = mongoose

const seatSchema = new Schema(
    {
        screen: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
        row: { type: Number, required: true },
        seat_number: { type: Number, required: true },
        seat_price: { type: Number, required: true, default: 0 }
    }
)

seatSchema.index({ screen: 1, row: 1, seat_number: 1 }, { unique: true })

export const seatModel = model('Seat', seatSchema)