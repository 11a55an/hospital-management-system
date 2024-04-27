const express = require('express');
const PharmaController  = require('../Controller/pharmaController');
const { pharmaAuth } = require('../Middleware/auth');
const pharma = express.Router();

pharma.get('/',pharmaAuth,PharmaController.PharmaDashboard)
pharma.get('/prescription-dashboard',pharmaAuth,PharmaController.PharmaPrescriptionDashboard)
pharma.get('/inventory-dashboard',pharmaAuth,PharmaController.PharmaInventoryDashboard)
pharma.get('/add-inventory',pharmaAuth,PharmaController.PharmaaddInventory)
pharma.post('/add-inventory',pharmaAuth,PharmaController.add_pharma_item)
pharma.get('/update-inventory',pharmaAuth,PharmaController.PharmaupdateInventory)
pharma.post('/update-inventory/',pharmaAuth,PharmaController.update_pharma_item);
pharma.get('/bill-generation',pharmaAuth,PharmaController.PharmaBillGeneration)
pharma.post('/bill-generation',pharmaAuth,PharmaController.generate_bill)

module.exports = pharma