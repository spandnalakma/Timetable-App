const express = require('express');
const router = express.Router();
const Courses = require('../models/courses');

router.get(
  '/',
  (req, res, next) => {
    res.json({
      message: 'Welcome Page',
    })
  }
);

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

module.exports = router;