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


model = mongoose.model('review',reviewSchema);
module.exports = model;

//model.collection.drop()