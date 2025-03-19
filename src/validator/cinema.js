import Joi from "joi";

export const cinemaCreate = Joi.object(
    {
        name: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
    }
)


export const cinemaUpdate = Joi.object(
    {
        name: Joi.string(),
        address: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        review: Joi.string()
    }
)