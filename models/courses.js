const mongoose = require('mongoose');
const {Schema} = mongoose;

const courseinfoSchema = new Schema({
    class_nbr:Number,
    start_time:String,
    descrlong:String,
    end_time:String,
    campus:String,
    facility_ID:String,
    days:[String],
    instructors:[String],
    class_section:String,
    ssr_component:String,
    enrl_stat:String,
    descr:String
});
const timetableSchema = new Schema({
    catalog_nbr:Schema.Types.Mixed,
    subject:String,
    className:String,
    course_info:[courseinfoSchema],
    catalog_description:String
});
//const timetableSchema = new Schema({},{strict:false});

module.exports = mongoose.model('TimeTable',timetableSchema);