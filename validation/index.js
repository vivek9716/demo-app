const Joi = require('joi');

const name = Joi.string().regex(/^[a-zA-Z ]+$/);
const mobile_number = Joi.string().regex(/\d{10}/);
const dob = Joi.string().regex(/\d{2}-\d{2}-\d{4}/);

const registerSchema = Joi.object().keys({
    fullName: name.required(),
    mobile_number: mobile_number.required(),
    emailid: Joi.string().required().email(),
    dob: dob.required(),
    password: Joi.string().min(4).max(20).required(),
    isd_code: Joi.string().required(),
    gender: Joi.string().valid(['M', 'F', 'MALE', 'FEMALE']).uppercase().required()
});

module.exports = {
  '/register': registerSchema
};
