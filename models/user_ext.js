const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserESchema = new Schema({
    username: String,
    googleId : String,
    thumbnail: String
});

module.exports = mongoose.model('userE',UserESchema);