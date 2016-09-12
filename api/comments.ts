// route file
 import express = require('express');
 let mongoose = require('mongoose');
 let router = express.Router();


let Comment = mongoose.model("Comment", {
  text: String,
  postId: String,
  author:String
})


router.post("/comments", function(req, res){
  let newComment = new Comment({
    text:req.body.text,
    postId:req.body.id,
    author:req.body.author
  })

newComment.save((err, comment) => { // run the .save methond on the instance.
  if(err) {
    console.log(err);
  } else {
    console.log(comment);
    res.send(comment) // comment is coming from the services
  }

})
})

// get all comments
router.get('/comments', function(req , res) {
  comments.find({dateDeleted:null}).then(function(comments) { // getting all comments
   res.json(comments)

 });

});
// delete comments
router.delete('/comments/:id', function (req, res) {
   console.log('hit')
   // use postman to debug for backend
 comments.findByIdAndUpdate(req.params["id"], {$set:{dateDeleted:new Date()}}, (err, res) => {
   if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });

    res.send('success!')
 });




















 export = router;
