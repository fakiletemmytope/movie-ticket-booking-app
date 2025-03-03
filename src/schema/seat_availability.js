import mongoose from "mongoose";

const {Schema, model} = mongoose

const seatAvailabiltySchema = new Schema(
    {
        showtime_id:{},
        // screen_id: {},
        booked_seat: [{}]
    }
)

export const seatAvailabiltyModel = model('SeatAvailability', seatAvailabiltySchema)

