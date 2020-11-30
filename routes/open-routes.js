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

router.get('/schedules',(req,res)=>{
      Schedules.find({},function(err,result){
          if(err){
              res.json(err)
          }else{
              res.json(result);
          }
      })
})

router.get('/reviews',(req,res)=>{
    Reviews.find({},function(err,result){
        if(err){
            res.json(err)
        }else{
            res.json(result);
        }
    })
 })

 router.get('/schedules/timetable',(req,res)=>{
     var timetable = [];
     Schedules.find({visibility:"public"}, (err,result)=>{
         if(err) return res.send(err);
         if(result){
         result.forEach(record => {
             if(record.schedules){
                 record.schedules.forEach(c =>{
                     Courses.findOne({"subject":c.subject,"catalog_nbr":{$regex:c.course,$options:'i'}},(err,res)=>{
                         if(err) return res.send(err);
                         if(res){
                            timetable.push(res);
                            console.log(res);
                         }
                     }) 
                 })
             }
        });
        res.json(timetable);
    }
     })
 })

module.exports = router;