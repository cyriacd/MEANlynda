var User = require('../models/User');
var jwt = require('jwt-simple');
var moment = require('moment');
module.exports = {
  register: function(req, res){
    User.findOne({email: req.body.email}, function(err, existingUser){
      if(existingUser){
        return res.status(401).send({message:"Email already in use."});
      }
      var user = new User(req.body);
      console.log(req.body);
      user.save(function(err, result){
        if(err){
          res.status(500).send({
            message: err.message
          });
        }else{

        }
        res.status(200).send({
          status: 'ok',
          token: createToken(result)
        });;
      });
      console.log("DONE WITH THIS PART")
    })
  },

}

function createToken(user){
  //token expires in 14 days
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14,'days').unix()
  };
  return jwt.encode(payload,'secret');
}
