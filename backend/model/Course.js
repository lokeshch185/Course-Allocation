const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const CourseSchema = new Schema({
  name: {type: String, required: true, unique: true},
  prof_Incharge: {type: String, required: true},
  intake_Capacity : {type : Number , required : true} ,   
  Imagefile: String,
  current_Enrolled_Count : {type : Number , default : 0} ,
  applied : {type : Array , default : [] }, 
  // enrolled : {type : Array , default : [] }
  enrolled : [{ 
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}); 


module.exports = model('Course', CourseSchema)