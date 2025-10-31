const express = require('express');
const {
  getUsers,
  getUser,
  getMe,
  createUser,
  updateUser,
  deleteUser,
  updateProfile,
  updatePassword,
  userPhotoUpload
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes below this middleware will be protected
router.use(protect);

// User profile routes
router.get('/me', getMe);
router.put('/me/update', updateProfile);
router.put('/me/updatepassword', updatePassword);
router.put('/me/photo', userPhotoUpload);

// Admin only routes
router.use(authorize('admin'));

router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;