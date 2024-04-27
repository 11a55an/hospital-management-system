const express = require('express');
// const AdminController  = require('../Controller/adminController');
const DoctorController = require('../Controller/doctorController');
const { doctorAuth } = require('../Middleware/auth');
const doctor = express.Router();

doctor.get('/',doctorAuth,DoctorController.DoctorDashboard)

//doctor - prescription routes
//doctor-prescription-dashboard
doctor.get('/doctor-prescription',doctorAuth,DoctorController.Doctor_Prescription_Dashboard)

//doctor view-prescription
doctor.get('/view-prescription',doctorAuth,DoctorController.Doctor_view_Prescription)

//doctor delete-prescription
doctor.get('/delete-prescription',doctorAuth,DoctorController.Doctor_delete_Prescription)

doctor.get('/create-prescription',doctorAuth,DoctorController.Doctor_create_Prescription)

doctor.post('/create-prescription/',doctorAuth,DoctorController.Insert_Doctor_Prescription)
////DOCTOR prescription POST ROUTE/////

///delete prescription doctor////
doctor.get('/delete-prescription/:_id',doctorAuth,DoctorController.Doctor_delete_Prescription)



//doctor - appointment routes
//doctor-appointment-dashboard
doctor.get('/doctor-appointment',doctorAuth,DoctorController.Doctor_Appointment_Dashboard)

//doctor view-appointment
doctor.get('/view-appointment',doctorAuth,DoctorController.Doctor_view_Appointment)

//doctor delete-appointment
doctor.get('/delete-appointment',doctorAuth,DoctorController.Doctor_delete_Appointment)

////DOCTOR APPOINTMENT POST ROUTE/////

///delete appointment doctor////
doctor.get('/delete-appointment/:_id',doctorAuth,DoctorController.Delete_appointment)




//doctor - patient routes
//doctor-patient-dashboard
doctor.get('/doctor-patient',doctorAuth,DoctorController.Doctor_Patient_Dashboard)

//doctor-discharge-patient
doctor.get('/discharge-patient',doctorAuth,DoctorController.Doctor_discharge_Patient)

//doctor-view-patient
doctor.get('/view-patient',doctorAuth,DoctorController.Doctor_view_Patient)

module.exports = doctor