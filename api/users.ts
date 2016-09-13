// import modules
  import express = require ('express');
  let router = express.Router();
  let mongoose = require('mongoose');
  let passport = require('passport');
  let crypto = require('crypto');
  let jwt= require('JSonwebtoken');

//MODEL
let User = mongoose.model("User",{
    email: String,
    username:{
    type:String,
    unique:true},
    password: String,
    salt:String,
    followers:{
      type:Array,
      default:[]
    }
})

// POST - register user
router.post('/users/register', function(req, res) {
  User.find({username: req.body.username}, function(err, user) {
    // this is for checking if username exist
    if(user.length < 1) {
      let salt = crypto.randomBytes(16).toString('hex');
      let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64).toString('hex');
      let newUser = new User({
        email: req.body.email,
        username:req.body.username,
        password:hash,
        salt:salt
      })
    // Post - save user
    newUser.save((err, user) => {
       if(err) {
         console.log;
         res.send(err);
       }else {
         console.log(res);
         res.end(); // end response
      }
      })
    } else {
      res.send({message:'username already exist'});
    }

  //  this is for register user
  let salt = crypto.randomBytes(16).toString('hex');
  let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64).toString('hex');
  let newUser = new User({
    email: req.body.email,
    username:req.body.username,
    password:hash,
    salt:salt
  })
// Post - save user
newUser.save((err, user) => {
   if(err) {
     console.log;
     res.send(err);
   }else {
     console.log(res);
     res.send(user);
  }

  })
})
});

// POST - Followers
router.post('/users', function(req, res){
  User.find({username:req.body.profile}, function(err, user){
    let followers = user[0].followers
    followers.push(req.body.follower)
    User.findByIdAndUpdate(user[0]._id, {$push:{"followers":req.body.follower}}, {safe: true, upsert: true}, (err, profile) => {
        if (err) {
           console.log(err);
            res.end()
         } else {
           console.log(profile);
            res.end()
         }
       });
  })
});

router.get('/users/:id', function (req, res){
  User.find({username:req.params["id"]}, function (req, user){
    console.log(user);
    res.send(user);
  })

})

//POST - login user
 router.post('/users/login', function(req, res) {
   User.find({username: req.body.username}, function(err, user) {
  if(user.length < 1) {
  res.send({message:'incorrect username'});
  }else{
  let hash =  crypto.pbkdf2Sync(req.body.password, user[0].salt, 1000, 64).toString('hex');
  let today = new Date();
  let exp = new Date(today);
  exp.setDate(today.getDate()+ 36500);
//TOKEN
  let token = jwt.sign({
    id:user[0]. id,
    username: user[0].username,
    exp: exp.getTime()/ 1000},
    'SecretKey'
  );

  if(hash === user[0].password) {
    res.send({message:"Correct", jwt: token});
  } else {
  res.send({message:"Incorrect password"});
  }
  }
  })
  });


// export router
  export = router;
