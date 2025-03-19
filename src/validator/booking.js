import Joi from "joi";


export const bookingCreate = Joi.object(
    {
        user_id: Joi.string().required(),
        showtime_id: Joi.string().required(),
        seats_booked: Joi.array().items(
            Joi.string()
        ).required()
    }
)