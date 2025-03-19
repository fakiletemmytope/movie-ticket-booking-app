import Joi from "joi";

export const showtimeCreate = Joi.object(
    {
        movie_id: Joi.string().required(),
        screen_id: Joi.string().required(),
        dateTime: Joi.date().required()
    }
)

export const showtimeUpdate = Joi.object(
    {
        dateTime: Joi.date().required()
    }

)