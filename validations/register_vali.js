const Joi = require("@hapi/joi");

/////////PRoblem////
// how to do error handling email already exist using JOI.



// if not added my own myerros. JOI actually return errors obeject.
// now it return {
  // errors:{

 // },
 // myerrors:{}
//}
// const registervalidation = (useruserdata) => {

//    let Myerrors={};
//     const schema = Joi.object({
//       name: Joi.string().min(3).required().label("name"),
//       email: Joi.string().min(3).required().email().label("email"),
//       password: Joi.string().min(3).required().label("password"),
//       password2:Joi.string().min(3)
//     });
  

//     let errors=schema.validate(userdata);
    
//     return {
//       errors,Myerrors
//     }
//   };


//   module.exports=registervalidation;

  /////////////////////////////////////////////////////////// create own validation ()///////////////
  const Validator = require('validator');
  const isEmpty = require('./isempty');
  
   const  registervalidation=(userdata)=>{
    let errors = {};
  
    userdata.name = !isEmpty(userdata.name) ? userdata.name : '';
    userdata.email = !isEmpty(userdata.email) ? userdata.email : '';
    userdata.password = !isEmpty(userdata.password) ? userdata.password : '';
    userdata.password2 = !isEmpty(userdata.password2) ? userdata.password2 : '';
  
    if (!Validator.isLength(userdata.name, { min: 2, max: 30 })) {
      errors.name = 'Name must be between 2 and 30 characters';
    }
  
    if (Validator.isEmpty(userdata.name)) {
      errors.name = 'Name field is required';
    }
  
    if (Validator.isEmpty(userdata.email)) {
      errors.email = 'Email field is required';
    }
  
    if (!Validator.isEmail(userdata.email)) {
      errors.email = 'Email is invalid';
    }
  
    if (Validator.isEmpty(userdata.password)) {
      errors.password = 'Password field is required';
    }
  
    if (!Validator.isLength(userdata.password, { min: 6, max: 30 })) {
      errors.password = 'Password must be at least 6 characters';
    }
  
    if (Validator.isEmpty(userdata.password2)) {
      errors.password2 = 'Confirm Password field is required';
    }
  
    if (!Validator.equals(userdata.password, userdata.password2)) {
      errors.password2 = 'Passwords must match';
    }
  
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
  
    module.exports=registervalidation;
