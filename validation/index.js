const Joi = require('joi');

const name = Joi.string().regex(/^[a-zA-Z ]+$/);
const mobile_number = Joi.string().regex(/\d{10}/);
const dob = Joi.string().regex(/\d{2}-\d{2}-\d{4}/);

const registerSchema = Joi.object().keys({
    fullName: name.required().label("Please enter a valid fullname."),
    mobile_number: mobile_number.required().label("Please enter a valid mobile number."),
    emailid: Joi.string().required().email().label("Please enter a valid email address."),
    dob: dob.required().label("Please enter a valid date of birth (dd-mm-yyyy)."),
    password: Joi.string().min(4).max(20).required().label("Please enter a valid password."),
    isd_code: Joi.string().required().label("Please enter a valid isd code."),
    gender: Joi.string().valid(['M', 'F', 'MALE', 'FEMALE']).uppercase().required().label("Please enter a valid gender.")
});

module.exports = {
  '/register': registerSchema
};
