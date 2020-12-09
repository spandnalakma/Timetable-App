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

//move to secure route
router.get('/userschedules/:coursename',async(req,res)=>{
    let coursename = req.params.coursename;
    let courseLists = await Schedules.find({"name":coursename})

    const returnedCourseLists = [];
 
    for (let courseList of courseLists) {
      let courses = courseList.get('schedules');
 
      for (let courseRef of courses) {
        let catalog_nbr = courseRef.course;
        let subject = courseRef.subject;
        console.log(catalog_nbr,subject);
 
        let course = await Courses.findOne({
          catalog_nbr: catalog_nbr,
          subject: subject,
        });
        console.log(course);
        courseRef.coursedetails = course;
        //console.log(courseRef);
      }
 
      returnedCourseLists.push(courseList);
    }
 
    return res.send(returnedCourseLists);
})

 

module.exports = router;