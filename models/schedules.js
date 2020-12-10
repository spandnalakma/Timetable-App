const mongoose = require('mongoose');
const {Schema} = mongoose;

const pairSchema = new Schema({
    subject : {type:String, required:true},
    course : {type:String, required:true},
    year: {type:Number}
})

const scheduleSchema = new Schema({
    name : {type:String,required:true},
    description:{type:String},
    schedules: [pairSchema],
    visibility: {type:String, default:"private"},
    updatedate: {type:Date, default:Date.now},
    userName: {type:String},
    numberofcourses : {type:Number}
});

model = mongoose.model('schedule',scheduleSchema);
module.exports =model


//model.collection.drop()