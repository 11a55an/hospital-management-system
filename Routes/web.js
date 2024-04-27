const express = require('express');
const HomeController = require('../Controller/homeController');
const upload = require('../Middleware/upload')
const router = express.Router();

//home controller and home routes 
router.get('/',HomeController.home)
//get  routes of doctor patient admin pages
router.get('/doctor-login',HomeController.doctorLoginViewPage)
router.get('/patient-login',HomeController.patientLoginViewPage)
router.get('/admin-login',HomeController.adminLoginViewPage)
router.get('/pharma-login',HomeController.pharmaLoginViewPage)

//post route for admin - login
router.post('/admin-login',HomeController.AdminLogin)
//post route for admin - logout
router.get('/admin-logout',HomeController.AdminLogout)


//post route for pharma - signup
router.post('/pharma-appointment',upload.single('image'),HomeController.PharmaSigup)
//post route for admin - login
router.post('/pharma-login',HomeController.PharmaLogin)
//post route for admin - logout
router.get('/pharma-logout',HomeController.PharmaLogout)


//post route for patient - signup
router.post('/patient-appointment',upload.single('image'),HomeController.PatientSigup)
//post route for patient - login
router.post('/patient-login',HomeController.PatientLogin)
//post route for patient - logout
router.get('/patient-logout',HomeController.PatientLogout)


//post route for doctor - signup
router.post('/doctor-appointment',upload.single('image'),HomeController.DoctorSigup)
//post route for doctor - login
router.post('/doctor-login',HomeController.DoctorLogin)
//post route for doctor - logout
router.get('/doctor-logout',HomeController.DoctorLogout)

//registration routes of doctor patient admin
router.get('/patient-appointment',HomeController.patientappointViewPage)
router.get('/doctor-appointment',HomeController.doctorappointViewPage)
router.get('/pharma-appointment',HomeController.pharmaappointViewPage)


module.exports = router