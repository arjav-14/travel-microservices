// services/package-service/src/controllers/packageController.js
const geocoder = require('../utils/geocoder');

const Package = require('../models/Package');
const { StatusCodes } = require('http-status-codes');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all packages
// @route   GET /api/v1/packages
// @access  Public
exports.getPackages = asyncHandler(async (req, res, next) => {
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  let query = Package.find(JSON.parse(queryStr));

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
  const total = await Package.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const packages = await query;

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
    count: packages.length,
    pagination,
    data: packages
  });
});

// @desc    Get single package
// @route   GET /api/v1/packages/:id
// @access  Public
exports.getPackage = asyncHandler(async (req, res, next) => {
  const pkg = await Package.findById(req.params.id);

  if (!pkg) {
    return next(
      new ErrorResponse(`Package not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: pkg
  });
});

// @desc    Create new package
// @route   POST /api/v1/packages
// @access  Private/Admin
exports.createPackage = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const pkg = await Package.create(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: pkg
  });
});

// @desc    Update package
// @route   PUT /api/v1/packages/:id
// @access  Private/Admin
exports.updatePackage = asyncHandler(async (req, res, next) => {
  let pkg = await Package.findById(req.params.id);

  if (!pkg) {
    return next(
      new ErrorResponse(`Package not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is package owner or admin
  if (pkg.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this package`,
        401
      )
    );
  }

  pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: pkg
  });
});

// @desc    Delete package
// @route   DELETE /api/v1/packages/:id
// @access  Private/Admin
exports.deletePackage = asyncHandler(async (req, res, next) => {
  const pkg = await Package.findById(req.params.id);

  if (!pkg) {
    return next(
      new ErrorResponse(`Package not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is package owner or admin
  if (pkg.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this package`,
        401
      )
    );
  }

  await pkg.remove();

  res.status(StatusCodes.OK).json({
    success: true,
    data: {}
  });
});

// @desc    Get featured packages
// @route   GET /api/v1/packages/featured
// @access  Public
exports.getFeaturedPackages = asyncHandler(async (req, res, next) => {
  const packages = await Package.find({ isActive: true })
    .sort('-rating')
    .limit(6);

  res.status(StatusCodes.OK).json({
    success: true,
    count: packages.length,
    data: packages
  });
});



// @desc    Get packages within a radius
// @route   GET /api/v1/packages/radius/:zipcode/:distance
// @access  Public
exports.getPackagesInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  try {
    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide distance by radius of Earth
    // Earth Radius = 3,963 mi / 6,378 km
    const radius = distance / 3963;

    const packages = await Package.find({
      'location.coordinates': {
        $geoWithin: { $centerSphere: [[lng, lat], radius] }
      }
    });

    res.status(StatusCodes.OK).json({
      success: true,
      count: packages.length,
      data: packages
    });
  } catch (err) {
    next(err);
  }
});
