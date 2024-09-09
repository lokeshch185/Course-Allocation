const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  email : {    type: String, required: true, unique: true} ,
  password: {type: String, required: true},
//   for student .. list course taken in prev sem , for teacher list courses taught in prev sem
  prev_Taken_Courses : {type : Array , default : []} ,
  role: {
    type: String,
    enum: ["Student","Teacher", "Admin"],
    required: true
  }
});   


module.exports = model('User', UserSchema)