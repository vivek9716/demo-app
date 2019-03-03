const Joi = require('joi');

const name = Joi.string().regex(/^[a-zA-Z ]+$/);
const mobile_number = Joi.string().regex(/\d{10}/);
const dob = Joi.string().regex(/\d{2}-\d{2}-\d{4}/);
const pincode = Joi.string().regex(/\d{6}/);

const registerSchema = Joi.object().keys({
    fullName: name.required().label("Please enter a valid fullname."),
    mobile_number: mobile_number.required().label("Please enter a valid mobile number."),
    emailid: Joi.string().required().email().label("Please enter a valid email address."),
    dob: dob.required().label("Please enter a valid date of birth (dd-mm-yyyy)."),
    password: Joi.string().min(4).max(20).required().label("Please enter a valid password."),
    isd_code: Joi.string().required().label("Please enter a valid isd code."),
    gender: Joi.string().valid(['M', 'F', 'MALE', 'FEMALE']).uppercase().required().label("Please enter a valid gender.")
});

const loginSchema = Joi.object().keys({
    emailormobile: Joi.string().min(4).max(50).required().label("Please enter a valid emailid/mobile number."),
    password: Joi.string().min(4).max(20).required().label("Please enter a valid password."),
});

const addressSchema = Joi.object().keys({
  pincode: pincode.required().label("Please enter a pincode."),
  fullName: name.required().label("Please enter a valid fullname."),
  mobile_number: mobile_number.required().label("Please enter a valid mobile number."),
  alternate_mobile_number: mobile_number.label("Please enter a valid mobile number."),
  address: Joi.string().required().min(4).max(200).label("Please enter a valid address."),
  landmark: Joi.string(),
  city: Joi.string().required().label("Please enter a valid city."),
  state: Joi.string().required().label("Please enter a valid state."),
  address_type: Joi.string().valid(['HOME', 'OFFICE']).uppercase().required().label("Please enter a valid address type.")
});

module.exports = {
  '/register': registerSchema,
  '/login': loginSchema,
  '/address': addressSchema
};
