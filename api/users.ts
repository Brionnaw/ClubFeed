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
    photoUrl:{
      type:String,
      default:'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'},
    followers:{
      type:Array,
      default:[]
    },
    following:{
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

// POST - Followers // this saves and add the follower to the profileUser
router.post('/users', function(req, res, next){ // add middleware
  console.log(req.body)
  User.find({username:req.body.profile}, function(err, user){
    User.findByIdAndUpdate(user[0]._id, {$push:{"followers":req.body.follower}}, {safe: true, upsert: true}, (err, profile) => {
      next('route')
    }
  );
  })
});
//POST - Following // this add the profile user to following array of the follower.
router.post('/users', function(req, res){
  User.find({username:req.body.follower}, function(err, follower){
    User.findByIdAndUpdate(follower[0]._id, {$push:{"following":req.body.profile}}, {safe: true, upsert: true}, (err, follower) => {
      res.end();
    }
  );
  })

})


router.get('/users/:id', function(req, res){
  User.find({username:req.params["id"]}, function (req, user){
    res.send(user);
  })
});

router.get('/users/following', function (req, res){
  User.find({username:req.params['following']}, function (req, user){
    res.send(user);
  })

});

//POST - login user
  router.post('/users/login', function(req, res) {
    User.find({username: req.body.username}, function(err, user) {
      if(user.length < 1) {
        res.send({message:'incorrect username'});
      } else {
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
//POST - USER PHOTO UPLOAD/URL
router.post('/users/photo', function(req, res) {
  User.findByIdAndUpdate(req.body.id, {$set:{photoUrl: req.body.url}}, (err, user) => {
      if (err) {
         console.log(err);
         res.end()
       } else {
         console.log(user);
         res.end()
       }
     });

})

// export router
  export = router;
