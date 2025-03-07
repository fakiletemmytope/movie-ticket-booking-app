import Joi from "joi"


export const userCreate = Joi.object(
    {
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[*.,()@/])[a-zA-Z0-9*.,()@/]{8,}$')).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        userType: Joi.string().valid('admin', 'viewer', 'owner'),
        address: Joi.string().required()
    }
)


export const userUpdate = Joi.object(
    {
        address: Joi.string(),
        password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[*.,()@/])[a-zA-Z0-9*.,()@/]{8,}$'))
    }
).min(1)

export const userLogin = Joi.object(
    {
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().required()
    }
)