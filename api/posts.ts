// route file
import express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let request = require('request');

// POST MODEL
let Post = mongoose.model('Post', { // "," seperate parameters, {pass in name of model , object w| properties, values types}
  text: String,
  comments:Array,
  author: String,
  dateCreated: Date,
  dateDeleted: {
    type: Date,
    default: null
  },
  location:String
  // latitude: String,
  // longitude: String
  // add usernames
})
// POST TO UPDATE OR CREATE POSTS
router.post('/posts', function(req, res) {   //use postman to check error with endpoints post request (localhost:3000/api/posts)
  request('https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=AIzaSyAt9gzbOaBxJPS9v3JvJhnaYI30Ka4zxLk&input=nightclubs',
  function (error, response, body) {
    console.log(body)
  if(req.body.id === undefined){
    let newPost = new Post({
      text: req.body.text,
      author:req.body.author,
      dateCreated:new Date(),
      locaton:req.body.locaton
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
})
})

// GET ALL POSTS
router.get('/posts', function(req , res) {
  Post.find({dateDeleted:null}).then(function(allPosts) { // getting all posts
    res.json(allPosts)
  });
});

// GET ALL PROFILE POSTS THAT ARENT DELETED
router.get('/posts/:id', function (req, res){
  Post.find({author:req.params["id"], dateDeleted:null}).then(function(allProfilePosts){
    res.send(allProfilePosts);
  })
})

// DELETE POSTS
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
