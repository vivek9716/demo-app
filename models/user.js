var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const SALT_WORK_FACTOR = 10;
const _ = require('lodash');

var UserSchema = new Schema({
  fullName: String,
  mobile_number: {
    type: Number,
    index: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid mobile number.`
    },
    required: [true, 'Please enter a valid mobile number.']
  },
  emailid: {
    type: String,
    index: true,
    unique: true,
    required: [true, 'Please enter a valid email address.']
  },
  dob: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{2}-\d{2}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid dob (dd-mm-yyyy).`
    },
    required: [true, 'Please enter a valid dob.']
  },
  gender: {
    type: String,
    enum: ['M', 'F', 'MALE', 'FEMALE']
  },
  password: String,
  image: String,
  isd_code: String,
  mobile_status: {
    type: Number,
    default: 0
  },
  email_status: {
    type: Number,
    default: 0
  },
  created_at: {
      type: Date,
      default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password, SALT_WORK_FACTOR);
}

UserSchema.path('emailid').validate(async (value) => {
    const emailCount = await mongoose.models.user.countDocuments({emailid: value });
    return !emailCount;
}, 'Email already exists.');

UserSchema.path('mobile_number').validate(async (value) => {
  const mobileNumberCount = await mongoose.models.user.countDocuments({ mobile_number: value });
  return !mobileNumberCount;
}, 'Mobile number already exists.');

UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else if (error.name === 'ValidationError') {
    var returnErrors = {};
    _.map(error.errors, ({path, message}) => {
        returnErrors[path] = message;
    });
    next(new Error(JSON.stringify(returnErrors)));
  } else {
    next(error);
  }
});

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  return jwt.sign({
    emailid: this.emailid,
    id: this._id,
    mobile_status: this.mobile_status,
    email_status: this.email_status,
    fullName: this.fullName,
    mobile_number: this.mobile_number,
    dob: this.dob,
    isd_code: this.isd_code,
    gender: this.gender,
    created_at: this.created_at,
    updated_at: this.updated_at,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

const userSchema = mongoose.model('user', UserSchema);
module.exports = userSchema;
