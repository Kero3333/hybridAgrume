const Joi = require("joi");

const validate = (obj) => {
  const schema = Joi.object({
    scientific_name: Joi.string().required(),
    common_name: Joi.string().required(),
    family: Joi.string().required(),
  });
  return schema.validate(obj);
};

module.exports = validate;
