// const Joi=require("@hapi/joi");

// const loginvalidation = (userdata) => {
//     const schema = Joi.object({

//       email: Joi.string().min(6).required().email(),
//       password: Joi.string().min(6).required(),
//     });

//     return schema.validate(userdata);
//   };
//   module.exports=loginvalidation;

const Validator = require("validator");

const isEmpty = require("./isempty");

const loginvalidation = (userdata) => {
  let errors = {};

  userdata.email = !isEmpty(userdata.email) ? userdata.email : '';
  userdata.password = !isEmpty(userdata.password) ? userdata.password : '';


  if (Validator.isEmpty(userdata.email)) {
    errors.email = 'Email field is required';
  }
  if (Validator.isEmpty(userdata.password)) {
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};


module.exports=loginvalidation;
