const express = require('express');
const router = express.Router();
const Review = require("../models/review");
const User = require("../models/users");

router.put('/review/:subject/:course',(req,res)=>{
    
       let sub = req.params.subject;
       let course = req.params.course;

       Review.findOneAndUpdate({"subject":sub,"course":course}, {"hidden":req.body.hidden}, {upsert: true}, function(err, doc) {
        if (err) return res.send(404, {error: err});
        return res.send('Succesfully updated.');
        });
  
});

router.put('/deactivate/:username',(req,res)=>{
   
      let user = req.params.username;

      User.findOneAndUpdate({"username":user}, {"deactivated":req.body.deactivated}, {upsert: true}, function(err, doc) {
        if (err) return res.send(404, {error: err});
        return res.send('Succesfully updated.');
        });
})

module.exports = router;