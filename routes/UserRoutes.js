const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer(); // Initialize multer

router.post('/register',upload.none(), userController.register);
router.post('/login', upload.none(),userController.login);
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;