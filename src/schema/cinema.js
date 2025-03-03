import { string } from "joi";
import mongoose from "mongoose";


const { model, Schema } = mongoose

const cinemaSchema = new Schema(
    {
        name: { type: string, required: true },
        Address: { type: string, required: true, unique: true, indexe:true },
        City: { type: string, required: true },
        State: { type: string, required: true }
    }
)

export const cinemaModel = model('Cinema', cinemaSchema)