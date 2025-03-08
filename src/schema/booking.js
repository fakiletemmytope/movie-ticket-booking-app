// BookingID (PK)
// UserID (FK)
// ShowtimeID (FK)
// BookingDate
// TotalAmount


import mongoose from "mongoose";

const { model, Schema } = mongoose

const PaymentStatus = {
    CANCELLED: 'cancelled',
    PENDING: 'pending',
    FAILED: 'failed',
    SUCCESS: 'success'
}

const bookingSchema = new Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        showtime_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime' },
        seat_booked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }],
        amount: { type: Number, required: true },
        payment_status: {
            type: String,
            enum: Object.values(PaymentStatus),
            required: true,
            default: Status.PENDING
        }
    }
)