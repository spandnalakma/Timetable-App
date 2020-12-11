const express = require('express');
const router = express.Router();
const Courses = require('../models/courses');
const Schedules = require('../models/schedules');
const Reviews = require('../models/review');

var stringSimilarity = require('string-similarity');


router.get('/courses/:subjectId/:courseId',async (req,res)=>{
    resultedlist = []
    let subject  = req.params.subjectId;
    let course = req.params.courseId;
    let result = await Courses.findOne({"subject":subject, "catalog_nbr":{$regex:course,$options:'i'}});
    if(!result){
      res.status(404).json({"errorMessage":"No result found"})
    }
    let review = await Reviews.find({"subject":subject,"course":{$regex:course,$options:'i'}});
    let res_obj = result.toObject();
    res_obj.review = review;
    resultedlist.push(res_obj);
    res.json(resultedlist);
    
})

router.get('/courses/:text',async (req,res)=>{
    let text = req.params.text;
    let courses = await Courses.find({});
    let courselists = [];
    for(let course of courses){
        var classNameSimilarity = stringSimilarity.compareTwoStrings(text,course.className.toString());
        var catalogSimilarity = stringSimilarity.compareTwoStrings(text,course.catalog_nbr.toString());
        //console.log(similarity);
        if(classNameSimilarity >= 0.3 || catalogSimilarity >= 0.3){
          let review = await Reviews.find({"subject":course.subject.toString(),"course":course.catalog_nbr.toString()});
          let course_obj = course.toObject();
          course_obj.review = review;
          console.log(course_obj);
          courselists.push(course_obj);
        }
    }
    res.json(courselists);
})

router.get('/schedules/:username',(req,res)=>{
    let username = req.params.username;
      Schedules.find({"visibility":"public","userName":{$ne:username}}).sort([['updatedate',-1]]).exec(function(err,result){
          if(err){
              console.log(err);
              res.json({"errorMessage":"Database error"})
          }else{
              res.json(result);
          }
      })
})


router.get('/userschedules/:coursename',async(req,res)=>{
    let coursename = req.params.coursename;
    let courseList = await Schedules.find({"name":coursename})
    if(!courseList){
      res.status(404).json({"errorMessage":"No courselist with given name"})
    }
  
    const resultedCourses = {};
  
    let courses = courseList[0].schedules;
    if(!courses){
      res.status(404).json({"errorMessage":"course list is empty"})
    }
  
      for (let c of courses) {
        let catalog_nbr = c.course.toString();
        let subject = c.subject.toString();
        let key = "other";
  
        if(catalog_nbr.length > 4){
            key = catalog_nbr.charAt(catalog_nbr.length-1);
        }
        /* if(catalog_nbr.length === 4){
          catalog_nbr = parseInt(catalog_nbr);
          console.log(catalog_nbr)
        } */
        
        let course_ = await Courses.findOne({
          catalog_nbr: catalog_nbr,
          subject: subject,
        });
        console.log(course_);

        let course_object = course_.toObject();
        course_object.year = parseInt(c.year);
        console.log(course_object);
  
        if(!(key in resultedCourses)){
            resultedCourses[key] = []; 
        }
        
        resultedCourses[key].push(course_object);
      }
  
    return res.send(resultedCourses);
  })
  

 

module.exports = router;