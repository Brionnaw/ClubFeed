// route file
 import express = require('express');
 let mongoose = require('mongoose');
 let router = express.Router();


let Comment = mongoose.model("Comment", {
  text: String,
  postId: String,
  author:String,
  dateCreated:Date,
  dateDeleted: {
    type: Date,
    default: null
  }
})


router.post("/comments", function(req, res){
  let newComment = new Comment({
    text:req.body.text,
    postId:req.body.id,
    author:req.body.author,
    dateCreated:new Date() // date method will generate a new date
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
router.get('/comments/:id', function(req , res) {
  Comment.find({postId:req.params["id"]}).then(function(allComments) { // getting all comments
   res.json(allComments)
 });

});
// delete comments
router.delete('/comments/:id', function (req, res) {
   console.log('hit')
   // use postman to debug for backend
 Comment.findByIdAndUpdate(req.params["id"], {$set:{dateDeleted:new Date()}}, (err, res) => {
   if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });

    res.send('success!')
 });




















 export = router;
