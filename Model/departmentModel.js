const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema({
    departmentName:{type:String,required:true},
})
const departmentModel = mongoose.model('department',departmentSchema);
module.exports= departmentModel;