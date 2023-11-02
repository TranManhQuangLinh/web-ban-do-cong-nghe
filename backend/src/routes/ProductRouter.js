const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/ProductController');
const { authAdminMiddleWare } = require("../middleware/authMiddleware");

router.post('/create-product', ProductController.createProduct)
router.put('/update-product/:id', authAdminMiddleWare, ProductController.updateProduct)
router.delete('/delete-product/:id', authAdminMiddleWare, ProductController.deleteProduct)
router.get('/get-details-product/:id', ProductController.getDetailsProduct)
router.get('/get-all-products', ProductController.getAllProducts)
router.post('/delete-multiple-products', authAdminMiddleWare, ProductController.deleteManyProducts)

module.exports = router