const mongoose = require('mongoose')

const patientSchema = mongoose.Schema({
    patientname:{type:String,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    contact:{type:Number,required:true},
    doctorId:{type:mongoose.Schema.Types.ObjectId,ref:'doctor'},
    image:{type:String,required:false},
    date:{type:String,required:false},
    symptom:{type:String,required:true},
    password:{type:String,required:true},
    status:{type:Number,required:true,default:0},
    billPdf: { type: String, required: false }
})
const patientModel = mongoose.model('patient',patientSchema);
module.exports= patientModel;

