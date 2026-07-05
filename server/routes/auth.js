const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const upload = require("../multerConfig");
const userAuthMiddleware = require("../middleware/userAuthMiddleware");

// Auth routes
router.post('/send-otp', authController.sendOTP);
router.post("/signup", authController.signup);

// User profile routes
router.post("/upload/profile/:id", userAuthMiddleware, upload.single("profile"), userController.uploadProfile);
router.delete("/remove-profile-image/:id", userAuthMiddleware, userController.removeProfileImage);

module.exports = router;
