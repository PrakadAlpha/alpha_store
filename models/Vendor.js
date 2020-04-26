const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    required: true,
    default: []
  },
  order: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Order',
    required: true,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
});

vendorSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next();
  };
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Signing the JWT token with the _id of vendor.
vendorSchema.methods.getSignedJwtToken = function(){
 return jwt.sign({id: this._id, role: "vendor"}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});
};

//Comparing the entered password with hashed password
vendorSchema.methods.verifyPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
 };



module.exports = mongoose.model('Vendor', vendorSchema);