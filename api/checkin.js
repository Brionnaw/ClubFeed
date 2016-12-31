"use strict";
var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');
var Location = mongoose.model('Location', {
    Location: {
        location: String,
    },
});
router.post('/movie', function (req, res) {
    var newLocation = new Location({
        locaton: req.body.locaton,
    });
    request('https://api.yelp.com/v3/autocomplete', function (error, response, body) {
        console.log(body);
    });
});
module.exports = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoZWNraW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLGlDQUFxQztBQUNyQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDOUIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25DLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUlqQyxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtJQUN4QyxRQUFRLEVBQUM7UUFDUCxRQUFRLEVBQUMsTUFBTTtLQUNoQjtDQUNGLENBQUMsQ0FBQztBQUlILE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVMsR0FBRyxFQUFFLEdBQUc7SUFDckMsSUFBSSxXQUFXLEdBQUcsSUFBSSxRQUFRLENBQUU7UUFDNUIsT0FBTyxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTztLQUMzQixDQUFDLENBQUE7SUFDRixPQUFPLENBQUMsc0NBQXNDLEVBQzlDLFVBQVUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFVbkIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQztBQVFILGlCQUFTLE1BQU0sQ0FBQyJ9