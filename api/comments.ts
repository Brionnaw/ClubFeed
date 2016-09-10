// route file
 import express = require('express');
 let mongoose = require('mongoose');
 let router = express.Router();


let Comment = mongoose.model("Comment", {
  text: String,
  postId: String
})


router.post("/comments", function(req, res){
  let newComment = new Comment({
    text:req.body.text,
    postId:req.body.id
  })

newComment.save((err, comment) => {
  if(err){
    res.send('error')
    console.log(err)
  } else {
    console.log(comment)
    res.send('success')
  }
})

})




















 export = router;
