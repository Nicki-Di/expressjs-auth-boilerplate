const Joi = require('joi');

const userValidator = async (user) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(255),

        email: Joi.string()
            .email()
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z\\d]{3,30}$'))
            .required(),

        role: Joi.string()
            .valid('admin', 'normal')
            .required()
    })

    try {
        return await schema.validateAsync(user);
    } catch (error) {
        return error.message;
    }
}

exports.userValidator = userValidator;