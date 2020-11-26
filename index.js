const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');



const Courses = require('./courses.js');

var uri = 'mongodb://localhost:27017/timetable';
mongoose.connect(uri,{ useUnifiedTopology: true,  useNewUrlParser: true } );

app.use(bodyParser.json());
app.use((req,res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

Courses.count(function(err, result){
    if(err) console.log(err);
    else {
        if(result === 0){
            const data = JSON.parse(fs.readFileSync('Lab3-timetable-data.json'));
            data.forEach(element => {
                var course = new Courses(element);
                course.save();
            });
        }
    } 
 }); 

app.get("/",(req,res)=>{
    Courses.find({}, function(err, data){
        res.send(data);
    });  
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})