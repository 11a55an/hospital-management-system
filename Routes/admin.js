const express = require('express');
const AdminController  = require('../Controller/adminController');
const upload = require('../Middleware/upload')
const {adminAuth} = require('../Middleware/auth')
const admin = express.Router();

admin.get('/',adminAuth,AdminController.adminDashboard)

//admin-doctor-routes
//admin-doctor-dashboard routes
admin.get('/doctor',adminAuth,AdminController.admin_Doctor_Dashboard)

admin.get('/pharma',adminAuth,AdminController.admin_Pharma_Dashboard)

//admin-view-doctor
admin.get('/view-doctor',adminAuth,AdminController.admin_view_doctor)

admin.get('/view-pharma',adminAuth,AdminController.admin_view_pharma)

//admin-approve-doctor
admin.get('/approve-doctor',adminAuth,AdminController.admin_approve_doctor)

admin.get('/approve-pharma',adminAuth,AdminController.admin_approve_pharma)

//admin-doctor-specialization
admin.get('/doctor-specialization',adminAuth,AdminController.admin_doctor_specialization)

//admin-register-doctor
admin.get('/register-doctor',adminAuth,AdminController.admin_register_doctor)

admin.get('/register-pharma',adminAuth,AdminController.admin_register_pharma)

//**************************/
//admin-doctor post routes 
//inserting department
admin.post('/doctor-specialization',adminAuth,AdminController.add_doctor_department)

//route for approving new doctor
admin.get('/approve-doctor/:_id',adminAuth,AdminController.approve_new_doctor)
admin.get('/approve-pharma/:_id',adminAuth,AdminController.approve_new_pharma)

//route for delete  doctor request
admin.get('/delete-doctor/:_id',adminAuth,AdminController.delete_new_doctor)
admin.get('/delete-pharma/:_id',adminAuth,AdminController.delete_new_pharma)

//route for REGISTER NEW DOCTOR 
admin.post('/register-doctor',upload.single('image'),adminAuth,AdminController.Admin_Register_Doctor)

admin.post('/register-pharma',upload.single('image'),adminAuth,AdminController.Admin_Register_Pharma    )









//admin-pateint routes
//admin-patient-dasboard routes
admin.get('/patient',adminAuth,AdminController.admin_Patient_Dashboard)

//admin-view-patient
admin.get('/view-patient',adminAuth,AdminController.admin_view_patient)

//admin-approve-patient
admin.get('/approve-patient',adminAuth,AdminController.admin_approve_patient)

//admin-register-patient
admin.get('/register-patient',adminAuth,AdminController.admin_register_patient)

//admin-discharge-patient
admin.get('/discharge-patient',adminAuth,AdminController.admin_discharge_patient)

//**************    ADMIN PATIENT POST ROUTES ************/

//route for approving new patient
admin.get('/approve-patient/:_id',adminAuth,AdminController.approve_new_patient)

//route for delete  doctor request
admin.get('/delete-patient/:_id',adminAuth,AdminController.delete_new_patient)

//admin-register-new - patient
admin.post('/register-patient',upload.single('image'),adminAuth,AdminController.Admin_Register_New_Patient)

//route for delete  doctor request
admin.get('/discharge-patient/:_id',adminAuth,AdminController.Discharge)

///////////route for patient prepare bill

admin.get('/patient-gen-bill/:pat_id',adminAuth,AdminController.Prepare_patient_Bill)
///route for generate bill
admin.post('/patient-gen-bill/:pat_id',adminAuth,AdminController.Generate_bill)

///view generated bill of patient
admin.get('/patient-view-bill/:pat_id',adminAuth,AdminController.view_bill)

/////////download pdf//////////////
admin.get('/download-bill/:bill_id',AdminController.downloadPdf)




//admin appointment routes
//admin-appointment-dasboard routes
admin.get('/appointment',adminAuth,AdminController.admin_Appointment_Dashboard)

//admin-appointment-dasboard routes
admin.get('/view-appointment',adminAuth,AdminController.admin_view_Appointment)

//admin-approve-appointment routes
admin.get('/approve-appointment',adminAuth,AdminController.admin_approve_Appointment)

//admin-book-appointment routes
admin.get('/book-appointment',adminAuth,AdminController.admin_Book_Appointment)


//**************    ADMIN  APPOINTMENT POST ROUTES ************/

//route for approving new appointment
admin.get('/approve-appointment/:_id',adminAuth,AdminController.approve_new_appointment)

//route for deleting new appointment
admin.get('/delete-appointment/:d_id',adminAuth,AdminController.delete_new_appointment)

//book appointment for patient
admin.post('/book-appointment',adminAuth,AdminController.Admin_Book_Patient_Appointment)


module.exports = admin