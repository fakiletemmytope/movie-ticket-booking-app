import mongoose from "mongoose";

const {Schema, model} = mongoose

const seatAvailabiltySchema = new Schema(
    {
        showtime_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Showtime' },
        screen_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen' },
        booked_seat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat'}]
    }
)

export const seatAvailabiltyModel = model('SeatAvailability', seatAvailabiltySchema)

