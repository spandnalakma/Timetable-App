const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedules');

router.post(
  '/schedules/create', (req, res) => {
    let clist = req.body;
    if(!clist){
      res.status(404).json({errorMessage:'List is empty'})
    }
    var schedle = new Schedule(clist);
    schedle.save();
    res.json(clist);
  }
);

router.put('/schedules/update/:username',(req,res)=>{
  
    let username = req.params.username;

    Schedule.findOneAndUpdate({"username":username}, req.body, {upsert: true}, function(err, doc) {
      if (err) return res.send(404, {error: err});
      return res.send('Succesfully saved.');
      });
})

router.delete('/schedules/delete/:username',(req,res)=>{
  let username = req.params.username;
  Schedule.findOneAndDelete({ "username": username }, function (err) {
    if(err) res.send(err);
    res.send("Successful deletion");
  });
})

router.put('/reviews/:Id',(req,res)=>{

})

module.exports = router;