const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const routes = require('./routes');
const PORT = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.json({limit: '1kb'}));
app.use(bodyParser.urlencoded({ extended: true }));

var mongoDB = 'mongodb://localhost:27017/amazon';
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
