const asyncHandlers = require('../middleware/async');
const Vendor = require('../models/Vendor');


// @Method: POST
// @Route : api/vendors/register 
// @Desc  : Handling the vendor registration
exports.register = asyncHandlers(async (req, res, next) => {

  const {name, email, password}  = req.body;
  
  if(!email || !password){
    return res.status(400).json({success: false, message: "Please enter all the fields."});
  }
  
  let vendor = await Vendor.findOne({email});
  
  if(vendor){
    return res.status(400).json({success: false, message: 'Vendor already exists'});
  }

  vendor = await Vendor.create({
    name, email, password
  });

  const token = vendor.getSignedJwtToken();

  res.status(200).json({success: true, token: token});
}) 


// @Method: POST
// @Route : api/vendors/login 
// @Desc  : Logging in the vendor
exports.login = asyncHandlers(async (req, res, next) => {

  const {email, password}  = req.body;

  if(!email || !password){
    return res.status(400).json({success: false, message: "Please enter all the fields."});
  }
  
  const vendor = await Vendor.findOne({email}).select('+password');

  if(!vendor){
    return res.status(404).json({success: false, message: "Invalid Creds.."});
  }

  const isMatch = await vendor.verifyPassword(password);

  if(!isMatch){
    return res.status(404).json({success: false, message: "Invalid Creds.."});
  }

 const token = vendor.getSignedJwtToken();

 return res.status(200).json({success: true, token: token});

}) 

// @Method: GET
// @Route : api/auth/me 
// @Desc  : Get the vendor on load if token available in browser
exports.getMe = asyncHandlers(async (req, res, next) => {
  const vendor = await Vendor.findById(req.user.id);
  return res.status(200).json({success: true, data: vendor});
})
