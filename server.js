const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const routes = require('./routes');
const PORT = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.json({limit: '1kb'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'chaudhary',
  cookie: {
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//var mongoDB = 'mongodb://localhost:27017/amazon';
var mongoDB = `mongodb+srv://vivek_chaudhary:XVcIfWSbswghoNMm@app-demo-awpco.gcp.mongodb.net/amazon?retryWrites=true`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log('Server is running on PORT : ', PORT);
});

module.exports = app;
