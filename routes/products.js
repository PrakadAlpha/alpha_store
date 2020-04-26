const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');
const {getProducts, addProduct, getProduct, deleteProduct, updateProduct } = require('../controllers/products');

router.get('/', getProducts);
router.post('/', protect,addProduct);
router.get('/:id', protect,getProduct);
router.delete('/:id', protect,deleteProduct);
router.put('/:id', protect,updateProduct);

module.exports = router;