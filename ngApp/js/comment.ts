
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    title: String,
    genre: String
});

let comments = mongoose.model("comments", CommentSchema);

let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/club-feed');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!')
});

let comments = mongoose.model('Comments', {status: String});

let comments = new comments({ status: 'just check-in with clubfeed'});
newComments.save(function (err, comments) {
  if (err) {
    console.log(err);
  } else {
    console.log(comments);

})
