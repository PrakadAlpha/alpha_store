const jwt = require('jsonwebtoken');
const asyncHandlers = require('./async');
const User = require('../models/User');
const Vendor = require('../models/Vendor');

// Middleware to protect the route by validating the user token 
// from the Authorization header
exports.protect = asyncHandlers(async (req, res, next) => {

  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token){
    return res.status(401).json({success: false, data: "Not Authorized"});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('role:', decoded.role)
    if(decoded.role === 'user'){
      req.user = await User.findById(decoded.id);
    }
    else{
      req.user = await Vendor.findById(decoded.id);
    }

    next();
  } catch (err) {
    return res.status(401).json({success: false, data: "Not Authorized"});
  }
})