// validator
// express-validator
// joi
// lodash
// validation


// ==> validator

const validator = require('validator')

const validateSigninInput = (data) =>
{
  let errors = {};

  

  //valide email
  if (validator.isEmpty(data.email))
  {
   
    errors.email = "Email is required"
  }
  else if (!validator.isEmail(data.email))
  {
    errors.email = "Email is invalid"
  }
  //password

  if (validator.isEmpty(data.password))
  {
    errors.password = "Password is invalid"
  }
 
  else if (!validator.isLength(data.password, {min: 6,max: 30}))
  {
    errors.password = "Password length must be between 6 and 30"
  }
 

  return {
    errors,
    isValid: Object.keys(errors).length > 0 ? false : true,
  }
}


module.exports = {
  validateSigninInput: validateSigninInput
}