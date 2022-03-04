const Joi = require("joi");

const validate = (obj) => {
  const schema = Joi.object({
    cultivar: Joi.string().required(),
    bitterness: Joi.number().required(),
    juiciness: Joi.number().required(),
    species_id: Joi.number().required(),
  });
  return schema.validate(obj);
};

module.exports = validate;
