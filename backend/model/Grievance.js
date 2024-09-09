const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const GrievanceSchema = new Schema({
  postedBy: {    
    type: Schema.Types.ObjectId,
    ref: 'User'
  } ,
  query : {type: String, required: true},
  reply : {type: String} ,
}, 
{
    timestamps : true
});   


module.exports = model('Grievance', GrievanceSchema)