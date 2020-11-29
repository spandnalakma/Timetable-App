const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const fs = require('fs');


const UserModel = require('./models/users');
const Courses = require('./models/courses');

var uri = 'mongodb://localhost:27017/timetable';
mongoose.connect(uri,{ useUnifiedTopology: true,  useNewUrlParser: true } ).then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log("MongoDB connection unsuccessful");
    console.log(err);
  });
  mongoose.Promise = global.Promise;
  
  require('./auth/auth');
  const routes = require('./routes/routes');
  const secureRoute = require('./routes/secure-routes');
  const openRoute = require('./routes/open-routes');
  const adminRoute = require('./routes/admin-routes');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});
//app.use(passport.initialize());

app.use('/',routes);

//app.use('/api/secure',passport.authenticate('jwt', { session: false }), secureRoute);
app.use('/api/secure',secureRoute);
app.use('/api/open',openRoute);
app.use('/api/admin',adminRoute);

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