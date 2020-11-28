const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserESchema = new Schema({
    googleId : String
});

module.exports = mongoose.model('userE',UserESchema);