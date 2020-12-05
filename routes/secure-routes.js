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
    schedle.markModified();
    schedle.save(schedle);
    res.json(schedle);
  }
);

router.put('/schedules/update/:username',(req,res)=>{
  
    let username = req.params.username;

    Schedule.findOneAndUpdate({"name":username}, req.body, {upsert: true}, function(err, doc) {
      if (err) return res.json(err);
      return res.json('Succesfully saved.');
      });
})

router.delete('/schedules/delete/:username',(req,res)=>{
  let username = req.params.username;
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

router.get('/courselists/:name',(req,res)=>{
  let name = req.params.name;
  Schedule.find({"username":name},(err,result)=>{
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
module.exports = router;