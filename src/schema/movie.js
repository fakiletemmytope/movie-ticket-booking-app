import mongoose from "mongoose";


const {model, Schema} = mongoose


const movieSchema = new Schema(
    {
        title: {},
        genre: {},
        release_date: {},
        description: {},
        rating: {},
        imageURL: {}
    }
)

export const movieModel = model('Movie', movieSchema)