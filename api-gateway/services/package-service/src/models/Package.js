const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please add a description']
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price must be at least 0']
    },
    duration: {
      type: Number, // Duration in days
      required: [true, 'Please add duration in days']
    },
    maxPeople: {
      type: Number,
      required: [true, 'Please add maximum number of people'],
      min: [1, 'At least 1 person is required']
    },
    location: {
      type: String,
      required: [true, 'Please add a location']
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: [
        'adventure',
        'beach',
        'mountain',
        'cultural',
        'wildlife',
        'honeymoon',
        'family',
        'luxury'
      ]
    },
    images: [{
      type: String,
      required: [true, 'Please add at least one image URL']
    }],
    included: [{
      name: String,
      description: String
    }],
    excluded: [{
      name: String,
      description: String
    }],
    itinerary: [{
      day: Number,
      title: String,
      description: String
    }],
    isActive: {
      type: Boolean,
      default: true
    },
    rating: {
      type: Number,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot be more than 5'],
      default: 0
    },
    numReviews: {
      type: Number,
      default: 0
    },
    features: [String],
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'challenging'],
      default: 'moderate'
    },
    bestTimeToVisit: [String],
    groupSize: {
      min: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        required: [true, 'Please add maximum group size']
      }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for reviews
packageSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'package',
  justOne: false
});

// Cascade delete reviews when a package is deleted
packageSchema.pre('remove', async function(next) {
  await this.model('Review').deleteMany({ package: this._id });
  next();
});

// Static method to get average rating
packageSchema.statics.getAverageRating = async function(packageId) {
  const obj = await this.aggregate([
    {
      $match: { package: packageId }
    },
    {
      $group: {
        _id: '$package',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    await this.model('Package').findByIdAndUpdate(packageId, {
      rating: obj[0] ? obj[0].averageRating : 0
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongoose.model('Package', packageSchema);