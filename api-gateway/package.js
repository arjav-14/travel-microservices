const express = require('express');
const {
  getPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage,
  getPackagesInRadius
} = require('../controllers/packageController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.route('/radius/:zipcode/:distance').get(getPackagesInRadius);
router.route('/').get(getPackages);
router.route('/:id').get(getPackage);

// Protected routes
router.use(protect);

// Admin routes
router.use(authorize('admin'));

router.route('/').post(createPackage);
router.route('/:id').put(updatePackage).delete(deletePackage);

module.exports = router;
