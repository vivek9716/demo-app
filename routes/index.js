const express = require('express');
const Router = express.Router();

const SchemaValidator = require('../middlewares/SchemaValidator');
const validateRequest = SchemaValidator();

const auth = require('../middlewares/auth');

const userModel = require('../models/user');
const userController = require('../controllers/UserController');
const userCtrl = new userController(userModel);

Router.route('/register').post(validateRequest, userCtrl.create);
Router.route('/login').post(validateRequest, userCtrl.login);

Router.route('/address').post(auth.required, validateRequest, userCtrl.saveAddress);

module.exports = Router;
