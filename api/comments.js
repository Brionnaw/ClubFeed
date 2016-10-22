"use strict";
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Comment = mongoose.model("Comment", {
    text: String,
    postId: String,
    author: String,
    dateCreated: Date,
    dateDeleted: {
        type: Date,
        default: null
    }
});
router.post("/comments", function (req, res) {
    var newComment = new Comment({
        text: req.body.text,
        postId: req.body.id,
        author: req.body.author,
        dateCreated: new Date()
    });
    newComment.save(function (err, comment) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(comment);
            res.send(comment);
        }
    });
});
router.get('/comments/:id', function (req, res) {
    Comment.find({ postId: req.params["id"] }).then(function (allComments) {
        res.json(allComments);
    });
});
router.delete('/comments/:id', function (req, res) {
    console.log('hit');
    Comment.findByIdAndUpdate(req.params["id"], { $set: { dateDeleted: new Date() } }, function (err, res) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(res);
        }
    });
    res.send('success!');
});
module.exports = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21tZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBTyxPQUFPLFdBQVcsU0FBUyxDQUFDLENBQUM7QUFDcEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25DLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUc5QixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtJQUN0QyxJQUFJLEVBQUUsTUFBTTtJQUNaLE1BQU0sRUFBRSxNQUFNO0lBQ2QsTUFBTSxFQUFDLE1BQU07SUFDYixXQUFXLEVBQUMsSUFBSTtJQUNoQixXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsSUFBSTtRQUNWLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7Q0FDRixDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFTLEdBQUcsRUFBRSxHQUFHO0lBQ3hDLElBQUksVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDO1FBQzNCLElBQUksRUFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7UUFDbEIsTUFBTSxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNsQixNQUFNLEVBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNO1FBQ3RCLFdBQVcsRUFBQyxJQUFJLElBQUksRUFBRTtLQUN2QixDQUFDLENBQUE7SUFDRixVQUFVLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRyxFQUFFLE9BQU87UUFDM0IsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ25CLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBO0FBRUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBUyxHQUFHLEVBQUcsR0FBRztJQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFTLFdBQVc7UUFDaEUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN2QixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRztJQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2xCLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUMsV0FBVyxFQUFDLElBQUksSUFBSSxFQUFFLEVBQUMsRUFBQyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7UUFDcEYsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ3RCLENBQUMsQ0FBQyxDQUFDO0FBT0YsaUJBQVMsTUFBTSxDQUFDIn0=