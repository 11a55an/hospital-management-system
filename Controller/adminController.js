var departmentModel = require('../Model/departmentModel')
const doctorModel = require('../Model/doctorModel')
const patientModel= require('../Model/patientModel')
const pharmaModel= require('../Model/pharmaModel')
const appointmentModel =require('../Model/appointmentModel')
const dischargeModel = require('../Model/dischargeModel')
const bcrypt = require('bcrypt');
var pdf = require('html-pdf')
var fs = require('fs')
var options = {format:'A4'}
class AdminController{
    //admin home
    static adminDashboard =async (req,res)=>{
        var doctor = await doctorModel.find({status:1}).countDocuments()
        var approval = await doctorModel.find({status:0}).countDocuments()
        var pharma = await pharmaModel.find({status:1}).countDocuments()
        var pharma_approval = await pharmaModel.find({status:0}).countDocuments()
        var patient = await patientModel.find({status:1}).countDocuments()
        var pat_approval = await patientModel.find({status:0}).countDocuments()
        var appointment = await appointmentModel.find({status:1}).countDocuments()
        var appointment_approval = await appointmentModel.find({status:0}).countDocuments()
        console.log(doctor);
        res.render('admin/dashboard',{
            admin:req.user,
            no_of_doctor:doctor,
            approve_dr:approval,
            no_of_pharma:pharma,
            approve_pharma:pharma_approval,
            no_of_patient:patient,
            approve_pat:pat_approval,
            no_of_appointment:appointment,
            approve_appointment:appointment_approval,
        })
    }

    //admin-doctor-function
    //admin doctor-home
    static admin_Doctor_Dashboard =async (req,res)=>{
        var doctor = await doctorModel.find({status:1}).countDocuments()
        var approval = await doctorModel.find({status:0}).countDocuments()
        var department = await departmentModel.find().countDocuments()
    
        res.render('admin/admin-doctor/admin-dr-dash',{
            admin:req.user,
            no_of_doctor:doctor,
            approve_dr:approval,
            dep:department
        })
    }
    //admin-view-doctor
    static admin_view_doctor = async (req,res)=>{
        var results = await doctorModel.find({status:1}).populate('specialization')
        res.render('admin/admin-doctor/admin-view-doc',{
            admin:req.user,
            data:results
        })
    }
    //admin-approve-doctor
    static admin_approve_doctor =async (req,res)=>{
        var results = await doctorModel.find({status:0}).populate('specialization')
        res.render('admin/admin-doctor/adm-aprove-dr',{
            admin:req.user,
            data:results
        })
    }
    //admin-doctor-specialization
    static admin_doctor_specialization =async (req,res)=>{
        var results = await doctorModel.find({status:1}).populate('specialization')
        res.render('admin/admin-doctor/adm-dr-special',{
            admin:req.user,
            data:results
        })
    }

    //admin-register-doctor
    static admin_register_doctor = async (req,res)=>{
        var results = await departmentModel.find({})
        res.render('admin/admin-doctor/adm-register-dr',{
            admin:req.user,
            data:results
        })
    }

    //admin-pharma-function
    //admin pharma-home
    static admin_Pharma_Dashboard =async (req,res)=>{
        var pharma = await pharmaModel.find({status:1}).countDocuments()
        var approval = await pharmaModel.find({status:0}).countDocuments()
        
        res.render('admin/admin-pharma/admin-ph-dash',{
            admin:req.user,
            no_of_pharma:pharma,
            approve_ph:approval,
        })
    }   
    //admin-view-doctor
    static admin_view_pharma = async (req,res)=>{
        var results = await pharmaModel.find({status:1})
        res.render('admin/admin-pharma/admin-view-ph',{
            admin:req.user,
            data:results
        })
    }
    //admin-approve-pharma
    static admin_approve_pharma =async (req,res)=>{
        var results = await pharmaModel.find({status:0})
        res.render('admin/admin-pharma/adm-aprove-ph',{
            admin:req.user,
            data:results
        })
    }
    //admin-register-pharma
    static admin_register_pharma = async (req,res)=>{
        res.render('admin/admin-pharma/adm-register-ph',{
            admin:req.user,
        })
    }
//****************************************/
    ///////////////////POST FUNCTION FOR ADMIN DOCTOR///////////////////////// 
        //inserting doctor department
        static add_doctor_department =async (req,res)=>{
            var data = new departmentModel({
                departmentName:req.body.department
            })
            await data.save();
            res.redirect('/admin/doctor-specialization')
        }

    //admin-approve-doctor seting status 1
        static approve_new_doctor =async (req,res)=>{
            console.log('hey this is me');
            const d_id = req.params._id;
            console.log(d_id);
            await doctorModel.findByIdAndUpdate({_id:d_id},{status:1},{new: true})
            res.redirect('/admin/approve-doctor')
    }

    static approve_new_pharma =async (req,res)=>{
        console.log('hey this is me');
        const d_id = req.params._id;
        console.log(d_id);
        await doctorModel.findByIdAndUpdate({_id:d_id},{status:1},{new: true})
        res.redirect('/admin/approve-pharma')
    }

    //admin-delete-doctor request 
        static delete_new_doctor =async (req,res)=>{
            console.log('hey this is me');
            const d_id = req.params._id;
            console.log(d_id);
            await doctorModel.remove({_id:d_id})
            res.redirect('/admin/approve-doctor')
    }

    //admin register-new doctor
    static Admin_Register_Doctor = async (req,res)=>{
        const {doctorname,email,address,contact,specialization,password} = req.body
        console.log(doctorname);
        const user = await doctorModel.findOne({email:email})
        if (user!=null) {
            res.send({'status':'faild','message':'Email already exits'})
        } else {
            if (doctorname && email && password) {
                    try {
                        const hasspassword = await bcrypt.hash(password,10);
                        const data = new doctorModel({
                            doctorname :doctorname,
                            email:email,
                            address:address,
                            contact:contact,
                            specialization:specialization,
                            image:req.file.filename,
                            password:hasspassword,
                            status:1
                        })
                        await data.save();
                        res.redirect('/admin/register-doctor')
                    } catch (error) {
                        res.send(error.message)
                    }
            } else {
                res.send({'status':'faild','message':'All field requird'})
            }
        }
    }




//****************************************/
    ///////////////////POST FUNCTION FOR ADMIN Pharma///////////////////////// 

    //admin-approve-pharma seting status 1
        static approve_new_pharma =async (req,res)=>{
            console.log('hey this is me');
            const d_id = req.params._id;
            console.log(d_id);
            await pharmaModel.findByIdAndUpdate({_id:d_id},{status:1},{new: true})
            res.redirect('/admin/approve-pharma')
    }

    static approve_new_pharma =async (req,res)=>{
        console.log('hey this is me');
        const d_id = req.params._id;
        console.log(d_id);
        await pharmaModel.findByIdAndUpdate({_id:d_id},{status:1},{new: true})
        res.redirect('/admin/approve-pharma')
    }

    //admin-delete-pharma request 
        static delete_new_pharma =async (req,res)=>{
            console.log('hey this is me');
            const d_id = req.params._id;
            console.log(d_id);
            await pharmaModel.remove({_id:d_id})
            res.redirect('/admin/approve-pharma')
    }

    //admin register-new doctor
    static Admin_Register_Pharma = async (req,res)=>{
        const {name,email,address,contact,role,password} = req.body
        console.log(name);
        const user = await pharmaModel.findOne({email:email})
        if (user!=null) {
            res.send({'status':'faild','message':'Email already exits'})
        } else {
            if (name && email && password) {
                    try {
                        const hasspassword = await bcrypt.hash(password,10);
                        const data = new pharmaModel({
                            username :name,
                            email:email,
                            address:address,
                            contact:contact,
                            role:role,
                            image:req.file.filename,
                            password:hasspassword,
                            status:1
                        })
                        await data.save();
                        res.redirect('/admin/register-pharma')
                    } catch (error) {
                        res.send(error.message)
                    }
            } else {
                res.send({'status':'faild','message':'All field requird'})
            }
        }
    }




      //admin-patient-function
      //admin patient-home
      static admin_Patient_Dashboard =async (req,res)=>{
        var patient = await patientModel.find({status:1}).countDocuments()
        var approve = await patientModel.find({status:0}).countDocuments()
        res.render('admin/admin-patient/adm-pat-dash',{
            admin:req.user,
            pat_no : patient,
            pat_approve : approve
        })
    }
    //admin-view-patient
      static admin_view_patient =async (req,res)=>{
        var results = await patientModel.find({status:1})
        res.render('admin/admin-patient/adm-view-pat',{
            admin:req.user,
            data:results
        })
    }
    //admin-approve-patient
      static admin_approve_patient =async (req,res)=>{
        var results = await patientModel.find({status:0})
        res.render('admin/admin-patient/adm-aprov-pat',{
            admin:req.user,
            data:results
        })
    }
    //admin-register-patient
      static admin_register_patient =   async (req,res)=>{
        var results = await doctorModel.find({status:1}).populate('specialization')
        res.render('admin/admin-patient/adm-regis-pat',{
            admin:req.user,
            data:results
        })
    }

    //admin-discharge-patient
      static admin_discharge_patient =async (req,res)=>{
        var results = await patientModel.find({status:1})
        res.render('admin/admin-patient/adm-discharge',{
            admin:req.user,
            data:results
        })
    }
    ///////////////////POST FUNCTION FOR ADMIN PATIENT///////////////////////// 
          //admin-approve-patient seting status 1
          static approve_new_patient =async (req,res)=>{
            var datetime = new Date();
            var date = datetime.toISOString().slice(0,10)
            console.log(date);
            const p_id = req.params._id;
            await patientModel.findByIdAndUpdate({_id:p_id},{status:1,date:date})
            res.redirect('/admin/approve-patient')
    }
        //admin-delete-doctor request 
        static delete_new_patient =async (req,res)=>{
            const p_id = req.params._id;
            await patientModel.remove({_id:p_id})
            res.redirect('/admin/approve-patient')
    }
        //admin register-new patient
        static Admin_Register_New_Patient = async (req,res)=>{
            const {patientname,email,address,contact,doctor,date,symptom,password} = req.body
            console.log('this is doctor id',doctor);
            const user = await patientModel.findOne({email:email})
            if (user!=null) {
                res.send({'status':'faild','message':'Email already exits'})
            } else {
                if (patientname && email && password) {
                        try {
                            // var datetime = new Date();
                            // var dateNow = datetime.toISOString().slice(0,10)
                            const hasspassword = await bcrypt.hash(password,10);
                            console.log(req.file.filename);
                            const data = new patientModel({
                                patientname:patientname,
                                email:email,
                                address:address,
                                contact:contact,
                                doctorId:doctor,
                                image:req.file.filename,
                                symptom:symptom,
                                date:date,
                                password:hasspassword,
                                status:1
                            })
                            await data.save();
                            res.redirect('/admin/register-patient')
                        } catch (error) {
                            res.send(error.message)
                        }
                } else {
                    res.send({'status':'faild','message':'All field requird'})
                }
            }
        }
//////////////////////ADIMIN PATIENT DISCHARGE  //////////////////

        static Discharge = async (req,res)=>{
            const patient_id = req.params._id;

            var dischargeDetail = await dischargeModel.findOne({patientId:patient_id})
            if (dischargeDetail == null) {
                 var datetime = new Date();
                var dateNow = datetime.toISOString().slice(0,10)
                var patientDetail = await patientModel.findById(patient_id)
                var data = await dischargeModel.create({
                    patientId:patient_id,
                    patientname:patientDetail.patientname,
                    doctorId:patientDetail.doctorId,
                    admitDate: patientDetail.date,
                    releaseDate:dateNow
                })
                 data.save()
                 res.redirect(`${"/admin/patient-gen-bill/"+patient_id}`);
            } else {
                res.redirect(`${"/admin/patient-view-bill/"+patient_id}`);
            }
        }
        static Prepare_patient_Bill = async (req,res)=>{
            var pat_id = req.params.pat_id;
            var results = await dischargeModel.findOne({patientId:pat_id,status:0}).populate('patientId').populate('doctorId')
            res.render('admin/admin-patient/patient-gen-bill',{
                admin:req.user,
                data:results
            })
        }
        static Generate_bill = async (req,res)=>{

            var pat_id = req.params.pat_id;
            console.log(pat_id);
            const roomCharge = parseInt( req.body.roomCharge)
            const doctorFee = parseInt( req.body.doctorFee)
            const medicineCost = parseInt( req.body.medicineCost)
            const OtherCharge = parseInt( req.body.OtherCharge)
            const amount = roomCharge + doctorFee  + medicineCost  + OtherCharge  ;
           console.log(roomCharge);
           var data = await dischargeModel.findOneAndUpdate({patientId:pat_id,status:0},{
                roomCharge:roomCharge,
                doctorFee:doctorFee,
                medicineCost:medicineCost,
                OtherCharge:OtherCharge,
                total:amount,
                status:1
            })
            res.redirect(`${"/admin/patient-view-bill/"+pat_id}`)
        }

        static view_bill = async (req,res) =>{
            var pat_id = req.params.pat_id;
            var results = await dischargeModel.findOne({patientId:pat_id,status:1}).populate('patientId').populate('doctorId')
            res.render('admin/admin-patient/view-gen-bill',{
                admin:req.user,
                data:results
            })
        }
//////////////////////////download pdf//////////////////
        static downloadPdf = async (req,res)=>{
            var bill_id = req.params.bill_id;
            var results = await dischargeModel.findOne({patientId:bill_id,status:1}).populate('patientId').populate('doctorId')
            res.render('admin/admin-patient/demoPdf',{data:results},function (error,html) {
                pdf.create(html,options).toFile('../public/uploads/demo.pdf',function (error,result) {
                    if (error) {
                        return console.log(error);
                    } else {
                        var datafile = fs.readFileSync('../public/uploads/demo.pdf');
                        res.header('content-type','application/pdf');
                        res.send(datafile)
                    }
                })
            })
        }




    //admin appointment functions
    //admin appointment-home
    static admin_Appointment_Dashboard = async(req,res)=>{
        var appointment = await appointmentModel.find({status:1}).countDocuments()
        var appointment_approval = await appointmentModel.find({status:0}).countDocuments()
        res.render('admin/admin-appointment/adm-apnt-dash',{
            admin:req.user,
            no_of_appointment:appointment,
            appointment_approval:appointment_approval
        })
    }

    //admin view-appointment
    static admin_view_Appointment = async (req,res)=>{
        var results = await appointmentModel.find({status:1}).populate('doctorId').populate('patientId')
        res.render('admin/admin-appointment/adm-view-apnt',{
            admin:req.user,
            data : results
        })
    }

    //admin approve-appointment
    static admin_approve_Appointment = async (req,res)=>{
        var results = await appointmentModel.find({status:0}).populate('doctorId').populate('patientId')
        res.render('admin/admin-appointment/approve-apoint',{
            admin:req.user,
            data:results
        })
    }
    
    //admin book-appointment
    static admin_Book_Appointment = async (req,res)=>{
        var results = await patientModel.find({status:1})
        var Dr_detail = await doctorModel.find({}).populate('specialization')
        res.render('admin/admin-appointment/book-apoint',{
            admin:req.user,
            data:results,
            dr_dtl:Dr_detail
        })
    }

    /////////   ADMIN APPOINTMENT POST FUNCTION //////////////////

              //admin-approve-Appointment seting status 1
              static approve_new_appointment =async (req,res)=>{
                const appoint_id = req.params._id;
                await appointmentModel.findByIdAndUpdate({_id:appoint_id},{status:1})
                res.redirect('/admin/approve-appointment')
        }
                //admin-delete-appointment request 
                static delete_new_appointment =async (req,res)=>{
                    const ap_id = req.params.d_id;
                    await appointmentModel.remove({_id:ap_id})
                    res.redirect('/admin/approve-appointment')
            }

                //ADMIN insert appointment of patient
    static Admin_Book_Patient_Appointment = async (req,res)=>{
        console.log('this is paient id',req.body.patient_id);
        var data = await appointmentModel({
            patientId:req.body.patient_id,
            doctorId:req.body.doctor_spec,
            description:req.body.description,
            appointmentDate:req.body.appointmentdate,
            status:1
        })
        data.save();
        res.redirect('/admin//book-appointment')
    }
}
module.exports = AdminController