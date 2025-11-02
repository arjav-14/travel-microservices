// services/booking-service/src/routes/booking.js
const express = require('express');
const router = express.Router();
const { 
  createBooking,
  getBookings,
  getBooking,
  updateBookingPayment,
  deleteBooking,
  getMyBookings
} = require('../controllers/bookingController');
// const { protect, authorize } = require('../middleware/auth');

// Temporarily disable authentication for development
// router.use(protect);
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});
// User routes - Public for now
router.post('/', createBooking);
router.get('/mybookings', getMyBookings);
router.get('/:id', getBooking);
router.put('/:id/pay', updateBookingPayment);

// Admin routes - Public for now
// router.use(authorize('admin'));
router.get('/', getBookings);
router.delete('/:id', deleteBooking);

module.exports = router;