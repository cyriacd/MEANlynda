var Message = require('../models/Message');

module.exports = {
  get: function (req,res){
    Message.find({}).populate('user','-password').exec(function(err,result){
      res.send(result)
    });
  },
  post: function(req,res){
    //add user id to message
    req.body.user = req.user;

    console.log(req.body, req.user);

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

  }
}
