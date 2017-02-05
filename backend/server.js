var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');

//Controllers
var auth = require('./controllers/auth');
var message = require('./controllers/message');
//services
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');

//Middeware
app.use(bodyParser.json());
app.use(cors);

//Requests
app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);
app.get('/api/message', message.get);
app.post('/api/message', checkAuthenticated, message.post);

//DB Connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/meantest", function(err,db){
  if(!err){
    console.log("connected to mongo");
  }else{
    console.log(err);
  }
});

var server = app.listen(5000,function(){
  console.log('listening on port', server.address().port);
});
