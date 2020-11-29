const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new Schema({
    subject : {type:String},
    course:{type:String},
    comments: {type:String},
    hidden: {type:Boolean, default:false},
    updatedate: {type:Date, default:Date.now},
    username: {type:String}
});


module.exports = mongoose.model('review',reviewSchema);