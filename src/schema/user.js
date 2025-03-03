import mongoose from "mongoose";

const { model, Schema } = mongoose


/** 
 * the admin manages the app
 * owner, the owner of a cinema/theater
 * viewer is a movie goer
 */

export const UserType = {
    ADMIN: 'admin',
    VIEWER: 'viewer',
    OWNER: 'owner'
}

export const Status = {
    ACTIVE: 'active',
    SUSPENDED: 'suspended',
    INACTIVE: 'inactive'
}



const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        address: { type: String, required: true },
        userType: {
            type: String,
            enum: Object.values(UserType), // Restrict userType to the values of UserType
            required: true, // Optional: make it required if necessary
            default: Status.INACTIVE
        },
        status:{
            type: String,
            enum: Object.values(UserType), // Restrict userType to the values of UserType
            required: true, // Optional: make it required if necessary
            default: UserType.VIEWER
        },
        bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }], //bookings by a viewer
        cinemas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' }], //cinema by owner
    },
    { timestamps: true }
)

export const userModel = model('User', userShema)