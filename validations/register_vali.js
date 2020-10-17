const Joi = require("@hapi/joi");

const registervalidation = (userdata) => {
    const schema = Joi.object({
      name: Joi.string().min(6).required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    });
  
    return schema.validate(userdata);
  };


  module.exports=registervalidation;