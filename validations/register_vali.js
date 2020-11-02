const Joi = require("@hapi/joi");

const registervalidation = (userdata) => {
    const schema = Joi.object({
      name: Joi.string().min(3).required().label("name"),
      email: Joi.string().min(3).required().email().label("email"),
      password: Joi.string().min(3).required().label("password"),
      password2:Joi.string().min(3)
    });
  
    return schema.validate(userdata);
  };


  module.exports=registervalidation;