const mongoose = require('mongoose');

const prescriptionSchema = mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor' },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'patient' },
    medications: { type: String, required: true },
    instructions: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const prescriptionModel = mongoose.model('prescription', prescriptionSchema);
module.exports = prescriptionModel