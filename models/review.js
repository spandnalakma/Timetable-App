const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new Schema({
    subjectCode : {type:String},
    courseCode:{type:String},
    review: {type:String},
    hidden: {type:Boolean, default:false},
});


module.exports = mongoose.model('review',reviewSchema);