var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var database;

var Message = mongoose.model('Message', {
  msg: String
});

app.use(bodyParser.json());

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Content-Type, Authorization");
  next();
})

app.get('/api/message', getMessages)

app.post('/api/message', function(req,res){
  console.log(req.body);

  var message = new Message(req.body);
  message.save(function(err){
    if(err){
      res.status(400);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ status : 'error' }));
      console.log(err);
    }
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ status : 'ok' }));
  });

});

function getMessages(req,res){
  Message.find({}).exec(function(err,result){
    res.send(result)
  });
}


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
