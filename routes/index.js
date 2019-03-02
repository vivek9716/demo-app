const express = require('express');
const Router = express.Router();

const SchemaValidator = require('../middlewares/SchemaValidator');
const validateRequest = SchemaValidator();

const userModel = require('../models/user');
const userController = require('../controllers/UserController');
const userCtrl = new userController(userModel);

Router.post('/register', validateRequest, userCtrl.create);
Router.route('/login').post(validateRequest, userCtrl.login);

module.exports = Router;
