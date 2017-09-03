var express = require('express');
var router = express.Router();
var User = require('../lib/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', function(req, res){
   var username = req.body.username;
   var password = req.body.password;

 User.findOne({username: username, password: password}, function(err, user){
 	if(err){
 		console.log(err);
 		return res.status(500).send("Internal Error");
 	}
 	if(user){
 		return res.status(200).send("login success");
 	} else {
 		return res.status(404).send("Username or password does not exist");
 	}
 });
});

router.post('/register', function(req, res){
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  var newUser = new User();
  newUser.username = username;
  newUser.email = email;
  newUser.password = password;

  User.findOne({username: username, email: email}, function(err, user){
  	if(err)
  		return res.status(500).send("Internal Error");
  	if(user)
  		return res.status(400).send("This user is already present. Please enter correct details to register. ")
  	else{
  		   newUser.save(function(err, saveUser){
  		   	if(err){
  		        console.log(err);
  		        return res.status(500).send("Internal Error");
              }
  	       return res.status(200).send("success");
          });
  	}
  });

  
});


module.exports = router;
