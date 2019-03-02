const AppController = require('./AppController');
const passport = require('passport');
require('../middlewares/passportStrategy');

class UserController extends AppController {

   constructor(model) {
      super(model);
      this._model = model;
      this.login = this.login.bind(this);
   }

   login (req, res, next) {
      return passport.authenticate('local', { session: false }, (err, passportUser) => {
        if(err) {
          res.status(200).json({
            status: 'error',
            statusCode: 404,
            errors: {
              'global': 'Email/Mobile/Password is not valid. Please try again.'
            },
            token: null
          });
        } else if(passportUser) {
          const user = passportUser;
          const token = passportUser.generateJWT();
          return res.status(200).json({
            status: 'success',
            statusCode: 200,
            token: token
          });
        } else {
          return res.status(200).json({
            status: 'error',
            statusCode: 403,
            errors: {
              'global': 'Email/Mobile/Password is not valid. Please try again.'
            },
            token: null
          });
        }
      })(req, res, next);
   }

}

module.exports = UserController;
