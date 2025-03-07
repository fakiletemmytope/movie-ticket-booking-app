import Joi from "joi"


export const movieCreate = Joi.object(
    {
        title: Joi.string().min(3).required(),
        genre: Joi.array().items(
            Joi.string().valid(
                'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Drama', 'Family', 'Fantasy', 'Historical', 'Horror', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'
            )
        ).required(),
        released_date: Joi.date().less('now').required(),
        description: Joi.string().allow(null),
        imageURL: Joi.string().allow(null),
        director: Joi.string().allow(null),
        cast: Joi.array().allow(null),
        duration: Joi.number(),
    }
)


export const movieUpdate = Joi.object(
    {
        title: Joi.string().min(3).required(),
        genre: Joi.array().items(
            Joi.string().valid(
                'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Drama', 'Family', 'Fantasy', 'Historical', 'Horror', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'
            )
        ).required(),
        released_date: Joi.date().less('now').required(),
        description: Joi.string().allow(''),
        imageURL: Joi.string().allow(''),
        director: Joi.string().allow(''),
        cast: Joi.array().allow(''),
        duration: Joi.number(),
        reviews: Joi.array().allow(null),
        rating: Joi.number().allow(null)
    }
)