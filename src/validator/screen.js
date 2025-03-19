import Joi from "joi";

export const screenCreate = Joi.object(
    {
        cinema: Joi.string().required(),
        capacity: Joi.number().min(1),
        screenType: Joi.string().valid('vip', '3d', '4d', 'imax', 'standard').required()
    }
)

export const screenUpdate = Joi.object(
    {
        capacity: Joi.number().min(1),
        screenTYpe: Joi.string().valid('vip', '3d', '4d', 'imax', 'standard')
    }
)