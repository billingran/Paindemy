const Joi = require("joi");

const signUpValidation = (data) => {
  const Schema = Joi.object({
    firstnameUser: Joi.string()
      .min(3)
      .max(255)
      .required()
      .pattern(/^[A-ZÀÂÇÉÈÊËÎÏÔÛÙÜŸÆŒ][a-zA-ZÀÂÇÉÈÊËÎÏÔÛÙÜŸÆŒ]*$/),
    lastnameUser: Joi.string()
      .min(3)
      .max(255)
      .required()
      .pattern(/^[A-ZÀÂÇÉÈÊËÎÏÔÛÙÜŸÆŒ][a-zA-ZÀÂÇÉÈÊËÎÏÔÛÙÜŸÆŒ]*$/),
    emailUser: Joi.string().min(3).max(255).required().email(),
    passwordUser: Joi.string().min(8).max(255).required(),
  });

  return Schema.validate(data);
};

module.exports.signUpValidation = signUpValidation;
