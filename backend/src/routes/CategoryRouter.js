const express = require("express");
const router = express.Router()
const CategoryController = require('../controllers/CategoryController');
const { authAdminMiddleWare } = require("../middleware/authMiddleware");

router.post('/create-category', authAdminMiddleWare, CategoryController.createCategory)
router.put('/update-category/:id', authAdminMiddleWare, CategoryController.updateCategory)
router.delete('/delete-category/:id', authAdminMiddleWare, CategoryController.deleteCategory)
router.get('/get-all-categories', CategoryController.getAllCategories)
router.post('/delete-multiple-categories', authAdminMiddleWare, CategoryController.deleteManyCategories)

module.exports = router