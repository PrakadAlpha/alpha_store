const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');
const {getOrders, addOrder, getOrder, deleteOrder, updateOrder} = require('../controllers/orders');

router.get('/', getOrders);
router.post('/', protect,addOrder);
router.get('/:id', protect,getOrder);
router.delete('/:id', protect,deleteOrder);
router.put('/:id', protect,updateOrder);

module.exports = router;