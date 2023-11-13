const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authAdminUserMiddleWare, authAdminMiddleWare } = require("../middleware/authMiddleware");

router.post('/create-order/:id', authAdminUserMiddleWare, OrderController.createOrder)
router.get('/get-all-user-orders/:id',authAdminUserMiddleWare, OrderController.getAllUserOrders)
router.get('/get-details-order/:id', OrderController.getDetailsOrder)
router.delete('/cancel-order/:id',authAdminUserMiddleWare, OrderController.cancelOrder)
router.get('/get-all-orders',authAdminMiddleWare, OrderController.getAllOrders)


module.exports = router