const doctorModel = require('../Model/doctorModel');
const appointmentModel = require('../Model/appointmentModel')
const dischargeModel = require('../Model/dischargeModel');
const patientModel = require('../Model/patientModel');
const prescriptionModel = require('../Model/prescriptionModel');
class PatientController{
    static PatientDashboard = async (req,res)=>{
        var results = await patientModel.findOne({_id:req.user._id}).populate('doctorId')
        var doctor_spec = await doctorModel.findOne({_id:results.doctorId}).populate('specialization')
        res.render('patient/dashboard',{
            patient:req.user,
            data:results,
            doctor_spec:doctor_spec
        })
    }


    //patient discharge fuction
    //patietn-discharge-dashboard
    static Patient_Discharge_dashboard = async (req,res)=>{
        var pat_id = req.user._id;
        console.log(pat_id);
        var results = await dischargeModel.findOne({patientId:pat_id,status:1}).populate('patientId').populate('doctorId')
        console.log(results);
        res.render('patient/patient-discharge/pat-dchrg-dash',{
            patient:req.user,
            data:results
        })
    }



        //patient appointment fuction
    //patietn-appointment-dashboard
    static Patient_Appointment_dashboard = (req,res)=>{
        res.render('patient/patient-appointment/pat-apoint-dash',{patient:req.user})
    }

    static Patient_Prescription_dashboard = (req,res)=>{
        res.render('patient/patient-prescription/pat-presc-dash',{patient:req.user})
    }

    //patiet-view-appointment
    static Patient_view_Appointment = async (req,res)=>{
        var p_Id = req.user._id
        var results = await appointmentModel.find({patientId:p_Id}).populate('doctorId')
        console.log(results);
        res.render('patient/patient-appointment/pat-view-apoint',{
            patient:req.user,
            data:results
        })
    }

    static Patient_view_Prescription = async (req,res)=>{
        var p_Id = req.user._id
        var results = await prescriptionModel.find({patientId:p_Id}).populate('doctorId')
        console.log(results);
        res.render('patient/patient-prescription/pat-view-presc',{
            patient:req.user,
            data:results
        })
    }


    //patiet-book-appointment
    static Patient_book_Appointment =async (req,res)=>{
        var results = await doctorModel.find({}).populate('specialization')
        res.render('patient/patient-appointment/pat-bok-apoint',{
            patient:req.user,
            data:results
        })
    }
    
    //  POST ROUTE FOR PATIENT APPOINTMENT FUNCTION
    
    //insert appointment of patient
    static Insert_Patient_Appointment = async (req,res)=>{
        var data = await appointmentModel({
            patientId:req.user._id,
            doctorId:req.body.doctor,
            description:req.body.description,
            appointmentDate:req.body.appointmentdate
        })
        data.save();
        res.redirect('/patient/appointment-dashboard')
    }

}
module.exports = PatientController