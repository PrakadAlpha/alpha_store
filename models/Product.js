const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true,
    min: [0, "Price cannot be less than 0"]
  },
  images: {
    type: [String],
    required: true,
    default: [] 
  },
  catagory:{
    type: [String],
    required: true,
  },
  description:{
    type: String,
    required: true
  } 
});

module.exports = mongoose.model('Product', productSchema);