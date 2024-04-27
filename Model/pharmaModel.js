const mongoose = require('mongoose')

const pharmaSchema = mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    contact:{type:Number,required:true},
    role:{type:String,required:true},
    image:{type:String,required:true},
    password:{type:String,required:true},
    status:{type:Number,required:true,default:0},
})
const pharmaModel = mongoose.model('pharma',pharmaSchema);
module.exports= pharmaModel;
