// BookingID (PK)
// UserID (FK)
// ShowtimeID (FK)
// BookingDate
// TotalAmount


import mongoose from "mongoose";

const {model, Schema} = mongoose

const PaymentStatus = {
    CANCELLED: 'cancelled',
    PENDING: 'pending', 
    FAILED: 'failed',
    SUCCESS: 'success' 
}

const bookingSchema = new Schema (
    {
        user_id:{},
        showtime_id:{},  
        seat_booked:{},
        amount:{},
        payment_status:{}
    }
)