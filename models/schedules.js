const mongoose = require('mongoose');
const {Schema} = mongoose;

const pairSchema = new Schema({
    subject : {type:String, required:true},
    course : {type:String, required:true},
    year: {type:Number},
})

const scheduleSchema = new Schema({
    name : {type:String,required:true,unique:true},
    description:{type:String},
    schedules: [pairSchema],
    visibility: {type:String, default:"private"},
    updatedate: {type:Date, default:Date.now},
    username: {type:String},
    numberofcourses : {type:Number}
});

module.exports = mongoose.model('schedule',scheduleSchema);