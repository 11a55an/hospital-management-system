const pharmaModel = require('../Model/pharmaModel');
const prescriptionModel = require('../Model/prescriptionModel');
var patientModel = require('../Model/patientModel')
const doctorModel = require('../Model/doctorModel');
const inventoryModel = require('../Model/inventoryModel');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class PharmaController{
    static PharmaDashboard = async (req,res)=>{
        const user = req.user
        res.render('pharma/dashboard',{
            pharma:user,
        })
    }

    static PharmaPrescriptionDashboard = async (req,res)=>{
        const results = await prescriptionModel.find();
        const patient = await prescriptionModel.find().populate("patientId");
        console.log(patient)
        console.log("results:")
        console.log(results)
        res.render('pharma/pharma-prescription',{
            data:results,
            pharma:req.user,
            patient:patient
        })
    }

    static PharmaInventoryDashboard = async (req,res)=>{
        const results = await inventoryModel.find();
        res.render('pharma/pharma-inventory/inventory-dash',{
            data:results,
            pharma:req.user,
        })
    }

    static PharmaBillGeneration = async (req,res)=>{
        const results = await patientModel.find();
        const product = await inventoryModel.find();
        console.log(product)
        res.render('pharma/pharma-inventory/bill-generation',{
            data:results,
            product:product,
            pharma:req.user,
        })
    }

    static PharmaupdateInventory = async (req,res)=>{
        const results = await inventoryModel.find();
        console.log(results)
        res.render('pharma/pharma-inventory/inventory-update',{
            data:results,
            pharma:req.user,
        })
    }

    static update_pharma_item =async (req,res)=>{
        console.log('hey this is me');
        const product = req.body.product;
        console.log(product);
        const inventoryItem = await inventoryModel.findOne({ product: product});
        inventoryItem.quantity = req.body.quantity;
        inventoryItem.price = req.body.price;
        await inventoryItem.save();
        res.redirect('/pharma/inventory-dashboard')
    }

    static generate_bill = async (req, res) => {
        try {
            const patient = req.body.patient;
            let products = req.body.product; // Assuming it's an array of product names
            let quantities = req.body.quantity; // Assuming it's an array of quantities
    
            // Convert to arrays if they are not already arrays
            if (!Array.isArray(products)) {
                products = [products];
            }
            if (!Array.isArray(quantities)) {
                quantities = [quantities];
            }
    
            // If only one product is selected, set its quantity to 1
            if (products.length === 1 && quantities.length === 1) {
                quantities = [1];
            }
    
            if (products.length !== quantities.length) {
                throw new Error('Products and quantities arrays must have the same length');
            }
    
            // Initialize variables to store total bill and details
            let totalBill = 0;
            const billDetails = [];
    
            // Iterate over each product and its corresponding quantity
            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                const quantity = quantities[i];
    
                // Find the product in the inventory and get its price
                const inventoryItem = await inventoryModel.findOne({ product });
                if (!inventoryItem) {
                    throw new Error(`Product "${product}" not found in inventory`);
                }
    
                // Calculate the subtotal for this product (price * quantity)
                const subtotal = inventoryItem.price * quantity;
    
                // Add the subtotal to the total bill
                totalBill += subtotal;
    
                // Add details for this product to the bill details array
                billDetails.push({ product, quantity, subtotal });
            }
    
            // Define the directory path for saving the PDF file relative to the project root
            const directory = path.join(__dirname, '..', 'pdf');
    
            // Create directory if it doesn't exist
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory);
            }
    
            // Create a new PDF document
            const filename = path.join(directory, 'bill.pdf');
            const doc = new PDFDocument();
            const stream = fs.createWriteStream(filename);
            doc.pipe(stream);
    
            // Write the bill details to the PDF document
            doc.fontSize(20).text('Bill Details', { align: 'center' }).moveDown();
            billDetails.forEach((detail, index) => {
                doc.fontSize(14).text(`Product: ${detail.product}, Quantity: ${detail.quantity}, Subtotal: ${detail.subtotal}`);
            });
            doc.moveDown().fontSize(16).text(`Total Bill: ${totalBill}`, { align: 'right' });
    
            // End the document
            doc.end();
            // Set content-disposition header to "inline" to display the PDF in the browser
            res.contentType('application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename=bill.pdf');
            
            // Send the PDF file
            fs.createReadStream(filename).pipe(res);
        } catch (error) {
            console.error('Error generating bill:', error);
            res.status(500).send('Internal Server Error');
        }
    };


    static PharmaaddInventory = async (req,res)=>{
        const results = await inventoryModel.find();
        res.render('pharma/pharma-inventory/inventory-add',{
            data:results,
            pharma:req.user,
        })
    }

    static add_pharma_item =async (req,res)=>{
        var data = new inventoryModel({
            product:req.body.product,
            quantity:req.body.quantity,
            price:req.body.price
        })
        await data.save();
        res.redirect('/pharma/inventory-dashboard')
    }

    // static update_pharma_item =async (req,res)=>{
    //     const product = req.params.product; // Assuming itemId is passed in the request parameters
    //     const newData = {
    //         product: product,
    //         quantity: req.body.quantity
    //     };
    //     const updatedItem = await inventoryModel.findByIdAndUpdate(product, newData, { new: true });
    //     res.redirect('/pharma-inventory/inventory-view')
    // }
}
module.exports = PharmaController