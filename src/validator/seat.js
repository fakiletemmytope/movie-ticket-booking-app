import Joi from "joi"

export const seatCreate = Joi.object(
    {
        screen_id: Joi.string().required(),
        seats: Joi.array().items(
            Joi.object(
                {
                    row: Joi.number().required(),
                    seat_number: Joi.number().required(),
                    seat_price: Joi.number().min(0).required()
                }
            )
        ).required()
    }
)


export const seatUpdate = Joi.object(
    {
        row: Joi.number(),
        seat_number: Joi.number(),
        seat_price: Joi.number().min(0)
    }
)