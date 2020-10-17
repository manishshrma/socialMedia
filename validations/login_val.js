
const Joi=require("@hapi/joi");


const loginvalidation = (userdata) => {
    const schema = Joi.object({
    
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    });
  
    return schema.validate(userdata);
  };
  module.exports=loginvalidation;
