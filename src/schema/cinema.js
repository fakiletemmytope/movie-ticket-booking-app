import mongoose from "mongoose";
import { reviewSchema } from "./movie.js";


const { model, Schema } = mongoose

const cinemaSchema = new Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true, unique: true, indexe: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        screens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Screen' }],
        reviews: [reviewSchema]
    },
    { timestamps: true }
)

cinemaSchema.index({ address: 1, name: 1 }, { unique: true })
export const cinemaModel = model('Cinema', cinemaSchema)