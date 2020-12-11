const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const fs = require('fs');
const cookieSession = require('cookie-session');
var cors = require('cors');




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
  const authentication = require('./auth/authmiddleware');
  const routes = require('./routes/routes');
  const secureRoute = require('./routes/secure-routes');
  const openRoute = require('./routes/open-routes');
  const adminRoute = require('./routes/admin-routes');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: ['key1','key2']
}))
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    console.log(`${req.method} request for ${req.url}`);
    next();
});
//app.use(passport.initialize());

app.use('/api',routes);
app.use('/api/secure',authentication.authenticateJWT, secureRoute);
app.use('/api/open',openRoute);
app.use('/api/admin',authentication.authenticateJWT,adminRoute);

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