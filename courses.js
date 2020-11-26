const mongoose = require('mongoose');
const {Schema} = mongoose;

const timetableSchema = new Schema({},{strict:false});

module.exports = mongoose.model('TimeTable',timetableSchema);