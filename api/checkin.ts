// import modules
import express = require ('express');
let router = express.Router();
let mongoose = require('mongoose');
let request = require('request');


//Movie model
let Location = mongoose.model('Location', {
  Location:{
    location:String,
  },
});


//The IMDb api
router.post('/movie', function(req, res) {
  let newLocation = new Location ({
      locaton:req.body.locaton,
  })
  request('https://api.yelp.com/v3/autocomplete',
  function (error, response, body) {
    console.log(body)

    // let data = JSON.parse(body) // parse data
    //     console.log(data)
    //     if (!error && response.statusCode == 200) {
    //     res.send(data) // send the parse data to front end
    //   } else {
    //     console.log(error)
    //   res.send({message:"movie not found"})
    // }
  })
});

//




// export router
export = router;
