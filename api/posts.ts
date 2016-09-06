// route file
 import express = require('express');
 let mongoose = require('mongoose');

 let router = express.Router();

  // models
  let Post = mongoose.model('Post', { // "," seperate parameters, {pass in name of model , object w| properties, values types}
    text: String,
    dateCreated: Date,
    // latitude: String,
    // longitude: String
    // add usernames
  })

// CREATE
 router.post("/posts", function(req, res) { // express does not like fat arrow :-(;
   // use postman to check error with endpoints post request (localhost:3000/api/posts)
   let newPost = new Post({
     text: req.body.text,
     dateCreated:new Date()
   })

   newPost.save((err, res) => {
     if(err){
       console.log(err)
     } else {
       console.log(res)
     }
   })

   res.send('success')
  // send back to services, and services.promises send to controllers
   // convert res.send( json format)
 })

 // GET
 router.get('/posts', function(req, res) {
   Post.find({}).then(function(allPosts) { // getting all posts
    res.json(allPosts)
    
   })
 })


























 export = router; // line should be last at the code
