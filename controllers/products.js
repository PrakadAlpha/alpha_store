const asyncHandlers = require('../middleware/async');
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

exports.getProducts = asyncHandlers(async (req, res, next) => {
    const products = await Product.find();       
    return  res.status(200).json(products);
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
},
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' +  Date.now() + path.extname(file.originalname));
  }
})


const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkExtension(file, cb);
  }
}).single('file');


function checkExtension(file, cb){

  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = filetypes.test(file.mimetype);

  if(mimeType && extname){
    return cb(null, true);
  }else{
    return cb(res.status(400).json({success: false, message: "Not a valid image"}), false);
  }
}


exports.imageUpload = asyncHandlers(async (req, res, next) => {

  upload(req, res, (err) => {
    if(err)
      return res.status(500).json({success: false, message: err.message});
    else{     
      return res.status(200).json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    }
  })

})

exports.addProduct = asyncHandlers(async (req, res, next) => {

  const product = await Product.create(req.body);

  if(!product){
    res.status(500).json({success: false, message: "Internal Server Error"})
  }

  res.status(201).json({success: true, data: product});
});

exports.getProduct = asyncHandlers((req, res, next) => {

  

})

exports.deleteProduct = asyncHandlers((req, res, next) => {

  

})

exports.updateProduct = asyncHandlers((req, res, next) => {

  

})