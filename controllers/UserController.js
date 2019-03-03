const AppController = require('./AppController');
const passport = require('passport');
require('../middlewares/passportStrategy');
const userModel = require('../models/user');
const userAddressesModel = require('../models/userAddresses');

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

   saveAddress (req, res, next) {
     const { payload: { id } } = req;
     return userModel.findById(id, { password: 0 }).then((user) => {
         if(!user) {
           return res.sendStatus(400);
         } else {
           req.body.userId = id;
           const userAddressesModel1 = new userAddressesModel(req.body);
           userAddressesModel1.save();
         }

         return res.json('hello success');
       });
   }

}

module.exports = UserController;
