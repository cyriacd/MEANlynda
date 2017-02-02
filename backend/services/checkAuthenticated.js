
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function checkAuthenticated(req,res,next){
  console.log(req.header('Authorization'));
  if(!req.header('Authorization')){
    return res.status(401).send({
      status: "not-authorized",
      message: "No authorization information received!"
    });
  }

  var token = req.header('Authorization');
  var payload = jwt.decode(token, 'secret');
  if(payload.exp <= moment().unix()){
    return res.status(401).send({
      status: "not-authorized",
      message: "Token expired"
    });
  }
  req.user = payload.sub;

  next();
}
