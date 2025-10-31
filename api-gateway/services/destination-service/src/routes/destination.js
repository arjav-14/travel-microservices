const express = require('express');
const {
  getDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination,
  getDestinationsInRadius,
  destinationPhotoUpload
} = require('../controllers/destinationController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.route('/radius/:zipcode/:distance').get(getDestinationsInRadius);
router.route('/').get(getDestinations);
router.route('/:id').get(getDestination);

// Protected routes
router.use(protect);

// Admin routes
router.use(authorize('admin'));

router
  .route('/')
  .post(createDestination);

router
  .route('/:id')
  .put(updateDestination)
  .delete(deleteDestination);

module.exports = router;
