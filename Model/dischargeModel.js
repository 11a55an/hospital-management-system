const mongoose = require('mongoose')

const dischargeSchema = mongoose.Schema({
    patientId:{type:mongoose.Schema.Types.ObjectId,ref:'patient'},
    patientname:{type:String,required:true},
    doctorId:{type:mongoose.Schema.Types.ObjectId,ref:'doctor'},
    admitDate:{type:String,required:true},
    releaseDate:{type:String,required:true},
    roomCharge:{type:Number,required:false},
    medicineCost:{type:Number,required:false},
    doctorFee:{type:Number,required:false},
    OtherCharge:{type:Number,required:false},
    total:{type:Number,required:false},
    status:{type:Number,required:true,default:0},
})
const dischargeModel = mongoose.model('discharge',dischargeSchema);
module.exports= dischargeModel;