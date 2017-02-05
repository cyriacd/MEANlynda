var User = require('../models/User');
var jwt = require('jwt-simple');
var moment = require('moment');
var bcrypt = require('bcrypt');

const saltRounds = 8;

module.exports = {
  register: function(req, res){
    User.findOne({email: req.body.email}, function(err, existingUser){
      if(existingUser){
        return res.status(401).send({message:"Email already in use."});
      }
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        req.body.password_hash = hash;
        delete req.body.password;
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
        console.log("DONE WITH THIS PART");
      });
    })
  },
  login:function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
      if(!user){
        return res.status(401).send({message:"Invalid email!"});
      }else{
        // bcrypt.compare(req.body.password, user.password_hash).then(function(res) {
          if(bcrypt.compareSync(req.body.password, user.password_hash)){
            res.status(200).send({
              token: createToken(user)
            });
          }else{
            return res.status(401).send({message:"Wrong password"});
          }
        // });
      }
    });
  }


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
