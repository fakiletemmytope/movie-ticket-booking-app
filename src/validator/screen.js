import Joi from "joi";

export const screenCreate = Joi.object(
    {
        cinema: Joi.string().required(),
        screenType: Joi.string().valid('vip', '3d', '4d', 'imax', 'standard').required(),
        base_price: Joi.number().min(0).required()
    }
)

export const screenUpdate = Joi.object(
    {
        base_price: Joi.number().min(0),
        screenTYpe: Joi.string().valid('vip', '3d', '4d', 'imax', 'standard')
    }
)