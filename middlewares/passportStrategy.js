const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users = mongoose.model('user');

passport.use(new LocalStrategy({
  usernameField: 'emailormobile'
}, (emailormobile, password, done) => {
  var condition = (emailormobile.indexOf('@') == -1) ? { mobile_number: emailormobile } : { emailid : emailormobile };  
  Users.findOne(condition)
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false);
      }

      return done(null, user);
    }).catch(done);
}));
