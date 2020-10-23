const Joi = require("@hapi/joi");
const { schema } = require("../models/User");

const profileval=(profileData)=>{
  

    const schema=Joi.object({
       handle:Joi.string().min(2).required(),
       company:Joi.string().required(),
       website:Joi.string().required(),
       location:Joi.string().required(),
       status:Joi.string().required(),
       skills:Joi.string().required(),
       handle:Joi.string().required(),

    })

  return schema.validate(profileData);

}

module.exports=profileval;