const express = require('express');
// const AdminController  = require('../Controller/adminController');
// const DoctorController = require('../Controller/doctorController');
const PatientController = require('../Controller/patientController')
const {patientAuth}= require('../Middleware/auth')

const patient = express.Router();

patient.get('/',patientAuth,PatientController.PatientDashboard)

//patient discharge routes
//patient discharge-dashboard
patient.get('/discharge-dashboard',patientAuth,PatientController.Patient_Discharge_dashboard)





//////////////////////////////////////////
//patient appointment routes
//patient appointment-dashboard
patient.get('/appointment-dashboard',patientAuth,PatientController.Patient_Appointment_dashboard)

patient.get('/prescription-dashboard',patientAuth,PatientController.Patient_Prescription_dashboard)

//patient view - appointment
patient.get('/view-appointment',patientAuth,PatientController.Patient_view_Appointment)

patient.get('/view-prescription',patientAuth,PatientController.Patient_view_Prescription)

//patient book - appointment
patient.get('/book-appointment',patientAuth,PatientController.Patient_book_Appointment)



    ///////////POST ROUTE FOR PATIENT APPOINTMENT/////////////
    //insert apointment patient//
patient.post('/book-appointment',patientAuth,PatientController.Insert_Patient_Appointment)

module.exports = patient