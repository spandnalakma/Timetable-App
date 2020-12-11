const mongoose = require('mongoose');
const { Schema } = mongoose;

const VerificationSchema = new Schema({
    email: {type: String, required: true, unique:true},
    token: {type:String,required:true},
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});


module.exports = mongoose.model('verify', VerificationSchema);