const Destination = require('../models/Destination');
const { StatusCodes } = require('http-status-codes');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc    Get all destinations
// @route   GET /api/v1/destinations
// @access  Public
exports.getDestinations = asyncHandler(async (req, res, next) => {
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'activities', 'minRating', 'maxRating'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  let query = Destination.find(JSON.parse(queryStr)).select('-reviews');

  // Filter by activities
  if (req.query.activities) {
    const activities = req.query.activities.split(',');
    query = query.where('activities').all(activities);
  }

  // Filter by rating
  if (req.query.minRating || req.query.maxRating) {
    const ratingQuery = {};
    if (req.query.minRating) ratingQuery.$gte = Number(req.query.minRating);
    if (req.query.maxRating) ratingQuery.$lte = Number(req.query.maxRating);
    query = query.where('rating', ratingQuery);
  }

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Destination.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const destinations = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(StatusCodes.OK).json({
    success: true,
    count: destinations.length,
    pagination,
    data: destinations
  });
});

// @desc    Get single destination
// @route   GET /api/v1/destinations/:id
// @access  Public
exports.getDestination = asyncHandler(async (req, res, next) => {
  const destination = await Destination.findById(req.params.id).select('-reviews');

  if (!destination) {
    return next(
      new ErrorResponse(`Destination not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: destination
  });
});

// @desc    Create new destination
// @route   POST /api/v1/destinations
// @access  Private/Admin
exports.createDestination = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const destination = await Destination.create(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: destination
  });
});

// @desc    Update destination
// @route   PUT /api/v1/destinations/:id
// @access  Private/Admin
exports.updateDestination = asyncHandler(async (req, res, next) => {
  let destination = await Destination.findById(req.params.id);

  if (!destination) {
    return next(
      new ErrorResponse(`Destination not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is destination owner or admin
  if (destination.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this destination`,
        401
      )
    );
  }

  destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: destination
  });
});

// @desc    Delete destination
// @route   DELETE /api/v1/destinations/:id
// @access  Private/Admin
exports.deleteDestination = asyncHandler(async (req, res, next) => {
  const destination = await Destination.findById(req.params.id);

  if (!destination) {
    return next(
      new ErrorResponse(`Destination not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is destination owner or admin
  if (destination.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this destination`,
        401
      )
    );
  }

  await destination.remove();

  res.status(StatusCodes.OK).json({
    success: true,
    data: {}
  });
});

// @desc    Get destinations within a radius
// @route   GET /api/v1/destinations/radius/:zipcode/:distance
// @access  Public
exports.getDestinationsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const destinations = await Destination.find({
    'location.coordinates': {
      $geoWithin: { $centerSphere: [[lng, lat], radius] }
    }
  });

  res.status(StatusCodes.OK).json({
    success: true,
    count: destinations.length,
    data: destinations
  });
});

// @desc    Upload photo for destination
// @route   PUT /api/v1/destinations/:id/photo
// @access  Private/Admin
exports.destinationPhotoUpload = asyncHandler(async (req, res, next) => {
  const destination = await Destination.findById(req.params.id);

  if (!destination) {
    return next(
      new ErrorResponse(`Destination not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${destination._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Destination.findByIdAndUpdate(req.params.id, {
      photo: file.name
    });

    res.status(StatusCodes.OK).json({
      success: true,
      data: file.name
    });
  });
});