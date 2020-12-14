const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedules');
const Review = require('../models/review');
const Courses = require('../models/courses');

router.get('/',(req,res)=>{
  res.json("Hello World");
})

router.post(
  '/schedules/create', async (req, res) => {
    let clist = req.body;
    if(!clist){
      return res.status(404).json({"errorMessage":"List is empty"})
    }
    let exist = await Schedule.findOne({"name":req.body.name});
    if(exist){
      return res.status(404).json({"errorMessage":"Course name already exists"});
    }
    var schedle = new Schedule(clist);
    let userschedule = await schedle.save();
    res.json({"message":"Create successful"});
  }
);

router.put('/schedules/update/:cname',(req,res)=>{
  
    let username = req.params.cname;

    Schedule.findOneAndUpdate({"name":username}, req.body, function(err, doc) {
      if (err) {
        console.log(err);
        return res.status(404).json({"errorMessage":"Database error"});
      }
      return res.json({"message":"Succesfully updated"});
      });
})

router.delete('/schedules/delete/:cname',(req,res)=>{
  let username = req.params.cname;
  Schedule.findOneAndDelete({ "name": username }, function (err) {
    if(err) {
      console.log(err);
      return res.status(404).json({"errorMessage":"Database error"});
    }
    res.json({"message":"delete successful"});
  });
})

router.post('/reviews/create',(req,res)=>{
   let rev = req.body;
   if(!rev){
     return res.status(404).json({"errorMessage":"review is empty"});
   }
   let review = new Review(rev);
   review.save();
   res.json({"message":"Review create successful"});
})

router.get('/courses',(req,res)=>{
  Courses.find({},{_id:0, subject:1, catalog_nbr:1}, (err,result) => {
    if(err) {
      console.log(err);
      return res.status(404).json({"errorMessage":"Database error"});
    }
    if(!result){
      return res.status(404).json({"errorMessage":"No courses found"})
    }
    res.json(result)
  })
})

router.get('/usercourselists/:name',(req,res)=>{
  let name = req.params.name;
  Schedule.find({"userName":name}).sort([['updatedate',-1]]).exec(function(err,result){
    if(err) {
      console.log(err);
      return res.status(404).json({"errorMessage":"Database error"});
    }
    if(!result){
      return res.status(404).json({"errorMessage":"No courses found"})
    }
    res.json(result)
  })
})

router.get('/usercount/:username',(req,res)=>{
  let name =  req.params.username;
  Schedule.countDocuments({"userName":name}, function(err, c) {
    if(err) {
      console.log(err);
      return res.status(404).json({"errorMessage":"Database error"});
    }
      res.json(c)
});
})

router.get('/courselists/:id',(req,res)=>{
  let name = req.params.id;
  console.log(name);
  Schedule.find({ "name":name },(err,result)=>{
    if(err) {
      console.log(err);
      return res.status(404).json({"errorMessage":"Database error"});
    }
    if(!result){
      return res.status(404).json({"errorMessage":"schedules are empty"});
    }
    res.json(result)
  })
})

router.get('/openreviews/:subject/:course',(req,res)=>{
  let subject = req.params.subject;
  let course = req.params.course;
  Review.find({"subject":subject,"course":course,hidden:"false"},function(err,result){
      if(err){
        console.log(err);
        return res.status(404).json({"errorMessage":"Database error"});
      }
      res.json(result); 
  })
})


module.exports = router;