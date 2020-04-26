const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  vendor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Vendor',
    required: true
  },
  quantity:{
    type: Number,
    required: [true, 'Quantity cannot be empty'],
    min: 1,
    default: 1
  },
  status:{
    type: String,
    enum: ["Ordered", "Dispatched", "Delivered"],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Order', orderSchema);