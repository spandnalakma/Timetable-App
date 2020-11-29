const express = require('express');
const router = express.Router();

router.put('/review/:id',async(req,res)=>{
    try{
       console.log("edit review");
    }
    catch(err){
      res.send(err);
    }
  
});

router.put('/deactivate/:username',async(req,res)=>{
    try{
      console.log("deactivate");
    }
    catch(err){
        res.send(err);
    }
})

module.exports = router;