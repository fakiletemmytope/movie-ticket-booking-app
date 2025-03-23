import Joi from "joi";


export const bookingCreate = Joi.object(
    {
        showtime_id: Joi.string().required(),
        seats_booked: Joi.array().items(
            Joi.string()
        ).required()
    }
)