import mongoose from "mongoose";

const { Schema, model } = mongoose

const showtimeSchema = new Schema(
    {
        movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
        dateTime: { type: Date, required: true },
        screen_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen' },
        available_seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat', require: true }],
        booked_seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }],
        status: {
            type: String,
            enum: ['upcoming', 'active', 'completed', 'canceled'],
            default: 'upcoming'
        },
        manager: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    },
    { timestamps: true }
)

showtimeSchema.index({ dateTime: 1, screen_id: 1 }, { unique: true })

export const showtimeModel = model('Showtime', showtimeSchema)
