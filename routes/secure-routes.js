const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedules');
const Review = require('../models/review');
const Courses = require('../models/courses');

router.get('/',(req,res)=>{
  res.json("Hello World");
})

router.post(
  '/schedules/create', (req, res) => {
    let clist = req.body;
    if(!clist){
      return res.status(404).json({errorMessage:'List is empty'})
    }
    var schedle = new Schedule(clist);
    schedle.save(function(err){
      if(err){
        console.log(err);
        return;
      }
    });
    res.json(schedle);
  }
);

router.put('/schedules/update/:cname',(req,res)=>{
  
    let username = req.params.cname;

    Schedule.findOneAndUpdate({"name":username}, req.body, {upsert: true}, function(err, doc) {
      if (err) return res.json(err);
      return res.json('Succesfully saved.');
      });
})

router.delete('/schedules/delete/:cname',(req,res)=>{
  let username = req.params.cname;
  Schedule.findOneAndDelete({ "name": username }, function (err) {
    if(err) res.json(err);
    res.json("Successful deletion");
  });
})

router.post('/reviews/create',(req,res)=>{
   let rev = req.body;
   if(!rev){
     return res.status(404).json("review is empty");
   }
   let review = new Review(rev);
   review.save();
   res.json(review);
})

router.get('/courses',(req,res)=>{
  Courses.find({},{_id:0, subject:1, catalog_nbr:1}, (err,result) => {
    if(err) res.json(err)
    if(result){
      res.json(result)
    }
  })
})

router.get('/usercourselists/:name',(req,res)=>{
  let name = req.params.name;
  Schedule.find({"userName":name},(err,result)=>{
    if(err) res.json(err)
    if(result){
      res.json(result)
    }
  })
})

router.get('/courselists/:id',(req,res)=>{
  let name = req.params.id;
  console.log(name);
  Schedule.find({ "name":name },(err,result)=>{
    if(err) res.json(err)
    if(result){
      res.json(result)
    }
  })
})

router.get('/openreviews/:subject/:course',(req,res)=>{
  let subject = req.params.subject;
  let course = req.params.course;
  Review.find({"subject":subject,"course":course,hidden:"false"},function(err,result){
      if(err){
          res.json(err)
      }else{
          res.json(result);
      }
  })
})
module.exports = router;