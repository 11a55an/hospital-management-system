const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema({
    doctorname:{type:String,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    contact:{type:Number,required:true},
    image:{type:String,required:false},
    specialization:{type:mongoose.Schema.Types.ObjectId,ref:'department'},
    password:{type:String,required:true},
    status:{type:Number,required:true,default:0},
})
const doctorModel = mongoose.model('doctor',doctorSchema);
module.exports= doctorModel;