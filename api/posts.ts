// route file
 import express = require('express');
 let router = express.Router();

 router.post("/posts", function(req, res) { // express does not like fat arrow :-(;
   // use postman to check error with endpoints post request (localhost:3000/api/posts)
   console.log(req.body)
   res.send('success!');
 } )



























 export = router; // line should be last at the code
