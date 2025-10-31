// services/booking-service/src/controllers/bookingController.js
const Booking = require('../models/Booking');
const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');
const axios = require('axios');
const { sendBookingConfirmationEmail } = require('../utils/emailService');

// @desc    Create new booking
// @route   POST /
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const {
      package,
      startDate,
      endDate,
      guests,
      totalPrice,
      paymentMethod,
    } = req.body;

    // Basic validation
    if (!package || !startDate || !endDate || !guests || !totalPrice) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const booking = new Booking({
      user: req.user?.id || req.body.user || new mongoose.Types.ObjectId(),
      package,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      guests,
      totalPrice,
      paymentMethod,
      paymentStatus: 'pending',
      isPaid: false
    });

    await booking.save();

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
};

// @desc    Get all bookings (admin only)
// @route   GET /
// @access  Private/Admin
exports.getBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};

    // Filter by payment status if provided
    if (req.query.paymentStatus) {
      query.paymentStatus = req.query.paymentStatus;
    }

    // Filter by date range if provided
    if (req.query.startDate && req.query.endDate) {
      query.startDate = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      count: bookings.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: bookings
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

// @desc    Get single booking
// @route   GET /:id
// @access  Private
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is authorized to view this booking (skip if no auth)
    if (req.user && booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
};

// @desc    Update booking payment status
// @route   PUT /:id/pay
// @access  Private
exports.updateBookingPayment = async (req, res) => {
  try {
    const { paymentId, paymentStatus } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is authorized to update this booking (skip if no auth)
    if (req.user && booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    booking.paymentId = paymentId || booking.paymentId;
    booking.paymentStatus = paymentStatus || booking.paymentStatus;
    booking.isPaid = paymentStatus === 'paid';
    
    if (paymentStatus === 'paid') {
      booking.paidAt = Date.now();
    }

    const updatedBooking = await booking.save();

    // Send confirmation email if payment is successful
    if (paymentStatus === 'paid') {
      try {
        // Fetch package details from package service
        const packageResponse = await axios.get(`http://localhost:3004/api/v1/packages/${booking.package}`);
        const packageDetails = packageResponse.data.data;

        // Fetch user details from auth service to get email
        const userResponse = await axios.get(`http://localhost:3001/api/v1/auth/users/${booking.user}`);
        const userEmail = userResponse.data.email || userResponse.data.data?.email;

        if (userEmail && packageDetails) {
          console.log('Sending confirmation email to:', userEmail);
          await sendBookingConfirmationEmail(updatedBooking, packageDetails, userEmail);
          console.log('Confirmation email sent successfully');
        } else {
          console.warn('Could not send email: missing user email or package details');
        }
      } catch (emailError) {
        // Don't fail the payment update if email fails
        console.error('Error sending confirmation email:', emailError.message);
      }
    }

    res.json({
      success: true,
      data: updatedBooking
    });
  } catch (error) {
    console.error('Update booking payment error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error updating booking payment',
      error: error.message
    });
  }
};

// @desc    Delete booking
// @route   DELETE /:id
// @access  Private/Admin
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Booking not found'
      });
    }

    await booking.remove();

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error deleting booking',
      error: error.message
    });
  }
};

// @desc    Get user bookings
// @route   GET /mybookings
// @access  Private
exports.getMyBookings = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId;
    if (!userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'User ID is required'
      });
    }
    const bookings = await Booking.find({ user: userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error fetching your bookings',
      error: error.message
    });
  }
};