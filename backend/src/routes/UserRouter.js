const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
const { authAdminUserMiddleWare, authAdminMiddleWare } = require("../middleware/authMiddleware");

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.post('/log-out', userController.logoutUser)
router.put('/update-user/:id', authAdminUserMiddleWare, userController.updateUser)
router.delete('/delete-user/:id', authAdminMiddleWare, userController.deleteUser)
router.get('/get-all-users', authAdminMiddleWare, userController.getAllUsers)
router.get('/get-details-user/:id', authAdminUserMiddleWare, userController.getDetailsUser)
router.post('/refresh-token', userController.refreshToken)
router.post('/delete-many-users', authAdminMiddleWare, userController.deleteManyUsers)

module.exports = router