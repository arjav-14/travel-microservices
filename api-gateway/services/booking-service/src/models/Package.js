const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  numReviews: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Package', packageSchema);
