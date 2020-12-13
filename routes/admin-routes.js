const express = require('express');
const router = express.Router();
const Review = require("../models/review");
const User = require("../models/users");

router.put('/review/:id',async (req,res)=>{
    
       let id = req.params.id;
       console.log(req.body.hidden);

       Review.findOneAndUpdate({"_id":id}, {"hidden":req.body.hidden}, {upsert: true}, function(err, doc) {
        if (err) {
        console.log(err);
        return res.status(404).json({"errorMessage":"Database error"});
        };
        return res.json({"message":'Succesfully updated'});
        });
  
});

router.put('/status/:username',(req,res)=>{
   
      let user = req.params.username;
      console.log(`req.body.deactivated`);
      User.findOneAndUpdate({"username":user}, {"deactivated":req.body.deactivated, "isAdmin":req.body.isAdmin}, {upsert: true}, function(err, doc) {
        if (err) {
        console.log(err);
        return res.status(404).json({"errorMessage":"Database error"});
        };
        return res.json({"message":'Succesfully updated'});
        });
})

router.get('/userslist',(req,res)=>{
      User.find({},(err,result)=>{
              if(err) {
                console.log(err);
                return res.status(404).json({"errorMessage":"Database error"});
              }
              res.json(result);
      })  
})

router.get('/reviews',(req,res)=>{
        Review.find({},(err,result)=>{
                if(err) {
                        console.log(err);
                        return res.status(404).json({"errorMessage":"Database error"});
                }
                res.json(result);
        })
})

module.exports = router;