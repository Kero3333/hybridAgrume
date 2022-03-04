const Joi = require("joi");

const validate = (obj) => {
  const schema = Joi.object({
    bitterness: { min: Joi.number(), max: Joi.number() },
    juiciness: { min: Joi.number(), max: Joi.number() },
  });
  return schema.validate(obj);
};

module.exports = validate;
