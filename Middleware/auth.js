const jwt = require('jsonwebtoken');
const patientModel = require('../Model/patientModel');
const doctorModel = require('../Model/doctorModel')
const pharmaModel = require('../Model/pharmaModel')

var adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt1;
        if (token != null) {
            const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (verifyUser.email === "admin@hms.com") {
                // For successful authentication, you can directly pass the admin user object
                const adminUser = {
                    username: "admin",
                    email: "admin@hms.com",
                    // Add any other necessary admin data here
                };
                req.user = adminUser;
                next();
            } else {
                res.send('You are Unauthorized');
            }
        } else {
            res.redirect('/admin-login');
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
}
var patientAuth = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt2
        if (token !=null) {
            const verifyUser = jwt.verify(token,process.env.JWT_SECRET_KEY);
            const data = await patientModel.findById(verifyUser.userId).select('-password')
            if (data!=null) {
                console.log(data);
                req.user = data
            next()
            } else {
                res.send('You are Unauthorized')
            }
            
        } else {
            res.redirect('/patient-login')
        }
     
    } catch (error) {
        console.log(error.message);
        
    }
    
}

var pharmaAuth = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt2
        if (token !=null) {
            const verifyUser = jwt.verify(token,process.env.JWT_SECRET_KEY);
            const data = await pharmaModel.findById(verifyUser.userId).select('-password')
            if (data!=null) {
                console.log(data);
                req.user = data
            next()
            } else {
                res.send('You are Unauthorized')
            }
            
        } else {
            res.redirect('/pharma-login')
        }
     
    } catch (error) {
        console.log(error.message);
        
    }
    
}
var doctorAuth = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt3
        if (token !=null) {
            const verifyUser = jwt.verify(token,process.env.JWT_SECRET_KEY);
            const data = await doctorModel.findById(verifyUser.userId).select('-password')
            if (data!=null) {
                console.log(data);
                req.user = data
            next()
            } else {
                res.send('You are Unauthorized')
            }
            
        } else {
            res.redirect('/patient-login')
        }
     
    } catch (error) {
        console.log(error.message);
        
    }
    
}
module.exports = {
    adminAuth,
    patientAuth,
    doctorAuth,
    pharmaAuth
}
