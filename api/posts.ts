// route file
 import express = require('express');
 let mongoose = require('mongoose');

 let router = express.Router();

  // models
  let Post = mongoose.model('Post', { // "," seperate parameters, {pass in name of model , object w| properties, values types}
    text: String,
    dateCreated: Date,
    dateDeleted: {
      type: Date,
      default: null
    }
    // latitude: String,
    // longitude: String
    // add usernames
  })

// POST TO UPDATE OR CREATE POSTS
 router.post('/posts', function(req, res) {   // express does not like fat arrow :-(;
  // use postman to check error with endpoints post request (localhost:3000/api/posts)

    if(req.body.id === undefined){
      let newPost = new Post({
        text: req.body.text,
        dateCreated:new Date()
      })
      newPost.save((err, post) => {

        if(err){
          console.log(err)
        } else {
          res.send(post);
         }
      })
    } else {
      Post.findByIdAndUpdate(req.body.id, {$set:{text: req.body.text}}, (err, res) => {
          if (err) {
             console.log(err);
           } else {
             console.log(res);
           }
         });
         res.send('200')
    }



  // send back to services, and services.promises send to controllers
   // convert res.send( json format)
 })

 // get all posts
 router.get('/posts', function(req , res) {
   Post.find({dateDeleted:null}).then(function(allPosts) { // getting all posts
    res.json(allPosts)

  });
 });
// delete post
router.delete('/posts/:id', function (req, res) {
    console.log('hit')
    // use postman to debug for backend
  Post.findByIdAndUpdate(req.params["id"], {$set:{dateDeleted:new Date()}}, (err, res) => {
    if (err) {
         console.log(err);
       } else {
         console.log(res);
       }
     });

     res.send('success!')
  });






















 export = router; // line should be last at the code
