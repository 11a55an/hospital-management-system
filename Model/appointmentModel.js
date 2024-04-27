const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    doctorId:{type:mongoose.Schema.Types.ObjectId,ref:'doctor'},
    patientId:{type:mongoose.Schema.Types.ObjectId,ref:'patient'},
    description:{type:String,required:false},
    appointmentDate:{type:String,required:false},
    status:{type:Number,required:true,default:0}
})
const appointmentModel = mongoose.model('appointment',appointmentSchema);
module.exports= appointmentModel;
