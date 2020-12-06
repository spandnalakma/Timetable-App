const express = require('express');
const router = express.Router();
const Review = require("../models/review");
const User = require("../models/users");

router.put('/review/:subject/:course',(req,res)=>{
    
       let sub = req.params.subject;
       let course = req.params.course;

       Review.findOneAndUpdate({"subject":sub,"course":course}, {"hidden":req.body.hidden}, {upsert: true}, function(err, doc) {
        if (err) return res.json(err);
        return res.json('Succesfully updated.');
        });
  
});

router.put('/status/:username',(req,res)=>{
   
      let user = req.params.username;
      console.log(`req.body.deactivated`);
      User.findOneAndUpdate({"username":user}, {"deactivated":req.body.deactivated, "isAdmin":req.body.isAdmin}, {upsert: true}, function(err, doc) {
        if (err) return res.json(err);
        return res.json('Succesfully updated.');
        });
})

router.get('/userslist',(req,res)=>{
      User.find({},(err,result)=>{
              if(err) return res.json(err)
              if(result) res.json(result);
      })  
})

router.get('/reviews',(req,res)=>{
        Review.find({},(err,result)=>{
                if(err) return res.json(err)
                if(result) res.json(result);
        })
})

module.exports = router;