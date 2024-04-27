const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    product: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number, default: 0 }
});

const inventoryModel = mongoose.model('inventory', inventorySchema);

module.exports = inventoryModel;
