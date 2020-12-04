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
      if (err) return res.send(404, {error: err});
      return res.send('Succesfully saved.');
      });
})

router.delete('/schedules/delete/:username',(req,res)=>{
  let username = req.params.username;
  Schedule.findOneAndDelete({ "name": username }, function (err) {
    if(err) res.send(err);
    res.send("Successful deletion");
  });
})

router.post('/reviews/create',(req,res)=>{
   let rev = req.body;
   if(!rev){
     return res.status(404).send("review is empty");
   }
   let review = new Review(rev);
   review.save();
   res.send(review);
})

router.get('/courses',(req,res)=>{
  Courses.find({},{_id:0, subject:1, catalog_nbr:1}, (err,result) => {
    if(err) res.send(err)
    if(result){
      res.json(result)
    }
  })
})

module.exports = router;