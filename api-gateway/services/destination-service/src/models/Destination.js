const mongoose = require('mongoose');
const path = require('path');
const geocoder = require('../utils/geocoder');

const DestinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: {
      type: String,
      required: [true, 'Please add a city']
    },
    state: String,
    zipcode: String,
    country: {
      type: String,
      required: [true, 'Please add a country']
    }
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  priceRange: {
    type: String,
    enum: ['$', '$$', '$$$', '$$$$'],
    required: [true, 'Please add a price range']
  },
  activities: {
    type: [String],
    required: [true, 'Please add at least one activity']
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  averageCost: Number,
  featured: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create location field for geocoding
DestinationSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.location);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  };

  // Do not save address in DB
  this.address = undefined;
  next();
});

// Cascade delete packages when a destination is deleted
DestinationSchema.pre('remove', async function(next) {
  console.log(`Packages being removed from destination ${this._id}`);
  await this.model('Package').deleteMany({ destination: this._id });
  next();
});

// Reverse populate with virtuals
DestinationSchema.virtual('packages', {
  ref: 'Package',
  localField: '_id',
  foreignField: 'destination',
  justOne: false
});

// Static method to get average cost of packages
DestinationSchema.statics.getAverageCost = async function(destinationId) {
  const obj = await this.aggregate([
    {
      $match: { _id: destinationId }
    },
    {
      $lookup: {
        from: 'packages',
        localField: '_id',
        foreignField: 'destination',
        as: 'packages'
      }
    },
    {
      $project: {
        averageCost: { $avg: '$packages.price' }
      }
    }
  ]);

  try {
    await this.model('Destination').findByIdAndUpdate(destinationId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
DestinationSchema.post('save', function() {
  this.constructor.getAverageCost(this._id);
});

// Call getAverageCost before remove
DestinationSchema.post('remove', function() {
  this.constructor.getAverageCost(this._id);
});

// Create geospatial index
DestinationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Destination', DestinationSchema);