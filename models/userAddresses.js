var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'No user specified']
  },
  fullName: String,
  mobile_number: {
    type: Number,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid mobile number.`
    },
    required: [true, 'Please enter a valid mobile number.']
  },
  alternate_mobile_number: {
    type: Number,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid alternate mobile number.`
    }
  },
  address: {
    type: String,
    required: [true, 'Please enter a valid address.']
  },
  landmark: {
    type: String
  },
  city: {
    type: String,
    required: [true, 'Please enter a your city.']
  },
  state: {
    type: String,
    required: [true, 'Please enter a your state.']
  },
  address_type: {
    type: String,
    enum: ['HOME', 'OFFICE'],
    default: 'HOME'
  },
  default: {
    type: Number,
    enum: [0, 1],
    default: 0
  },
  pincode: {
    type: Number,
    validate: {
      validator: function(v) {
        return /\d{6}/.test(v);
      },
      message: props => `${props.value} is not a valid pincode.`
    },
    required: [true, 'Please enter a 6 digit pincode.']
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

module.exports = mongoose.model('address', AddressesSchema);
