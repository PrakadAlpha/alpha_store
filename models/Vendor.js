const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({

  name: {
    type: String,
    require: [true, "Please add a name"]
  },

  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 6,
    select: false
  },
  product: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Product',
    required: true
  },
  order: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Order',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
});

module.exports = mongoose.model('Vendor', vendorSchema);