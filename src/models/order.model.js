const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: 
        {
            type: Array,
             required: true
            },

    amount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },

    payment:{
        type:Boolean,
        default: false
    },

    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending'
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);