import express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//models
  let Comments = mongoose.model('Comment', {
    status: String,
    dateCreated: Date,
    dateDeleted:{
      type: Date,
      default: null
    }
  });

  // unique comment id
let commentId = Comments.length;

/* GET comments */
router.get('/comments', function(req, res, next) {
    Comments.find({dateDeleted: null}).then((comments) => {
        console.log(comments);
      res.json(comments);
    })
});

/* Post to create or update movie */
router.post('/comments', function(req, res, next) {
  if(req.body.id == undefined) {
    let comments = req.body;

    let newComments = new Comments({
      Status: comments.status,
      dateCreated: new Date()
    });
      newComments.save((err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      })
  }
  else {
    Comments.findByIdAndUpdate(req.body.id, {$set: {status: req.body.status}}).then((err,) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
    })

  }
    res.send('success');
});
