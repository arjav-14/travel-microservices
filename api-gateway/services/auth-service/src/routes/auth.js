const express = require('express');
const router = express.Router();
const { register, login, getMe, getUserById } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/users/:id', getUserById); // For internal service communication

// Protected routes
router.get('/me', auth, getMe);

module.exports = router;