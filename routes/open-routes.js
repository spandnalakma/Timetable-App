const express = require('express');
const router = express.Router();
const Courses = require('../models/courses');
const Schedules = require('../models/schedules');
const Reviews = require('../models/review');


router.get('/',(req,res)=>{
    res.send("hello world!")
})

router.get('/courses/:subjectId/:courseId',(req,res)=>{
    let subject  = req.params.subjectId;
    let course = req.params.courseId;
   Courses.find({"subject":subject, "catalog_nbr":{$regex:course,$options:'i'}},function(err,result){
       if(err){
           res.json({
               message: err
           })
       }else{
           res.json(result);
       }
   })
})

router.get('/courses/:text',(req,res)=>{
    let text = req.params.text;
    Courses.find({$or:[{"catalog_nbr":{$regex:text,$options:'i'}},{"className":{$regex:text,$options:'i'}}]},function(err,result){
        if(err){
            res.json({
                message:err
            })
        }else{
            res.json(result);
        }
    })
})

router.get('/schedules/:username',(req,res)=>{
    let username = req.params.username;
      Schedules.find({"visibility":"public","userName":{$ne:username}}).sort([['updatedate',-1]]).exec(function(err,result){
          if(err){
              res.json(err)
          }else{
              res.json(result);
          }
      })
})

 

module.exports = router;