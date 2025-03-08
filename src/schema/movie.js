import mongoose from "mongoose";


const { model, Schema } = mongoose

export const reviewSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        review: { type: String, required: true }
    },
    {
        _id: false
    }
)

const ratingSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rate: { type: Number, min: 0, max: 10, required: true }
    },
    {
        _id: false
    }
)


const movieSchema = new Schema(
    {
        title: { type: String, required: true },
        genre: {
            type: [String],
            enum: [
                'Action', 'Adventure', 'Animation', 'Biography', 'Comedy',
                'Crime', 'Drama', 'Family', 'Fantasy', 'Historical', 'Horror', 'Musical',
                'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'
            ],
            required: true
        },
        released_date: { type: Date, required: true },
        description: { type: String },
        rating: { type: [ratingSchema] },
        average_rating: { type: Number },
        imageURL: {
            type: String,
            required: false
        },
        director: { type: String },
        cast: { type: [String] },
        duration: { type: Number },
        reviews: { type: [reviewSchema] }
    },
    { timestamps: true }
)
movieSchema.index({ title: 1, released_date: 1 }, { unique: true })
export const movieModel = model('Movie', movieSchema)