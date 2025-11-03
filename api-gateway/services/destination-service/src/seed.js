const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('./models/Destination');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wanderway', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const destinations = [
  {
    name: 'Bali, Indonesia',
    description: 'A tropical paradise with beautiful beaches and rich culture.',
    location: {
      city: 'Bali',
      country: 'Indonesia'
    },
    rating: 4.8,
    price: 1200,
    featured: true,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Santorini, Greece',
    description: 'Famous for its stunning sunsets and white-washed buildings.',
    location: {
      city: 'Santorini',
      country: 'Greece'
    },
    rating: 4.9,
    price: 1800,
    featured: true,
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Kyoto, Japan',
    description: 'Experience traditional Japanese culture and beautiful temples.',
    location: {
      city: 'Kyoto',
      country: 'Japan'
    },
    rating: 4.7,
    price: 2000,
    featured: true,
    image: 'https://images.unsplash.com/photo-1492571350019-22de09371a3b?auto=format&fit=crop&w=800&q=80'
  }
];

const importData = async () => {
  try {
    // Clear existing data
    await Destination.deleteMany();
    
    // Add sample data
    await Destination.insertMany(destinations);
    
    console.log('Sample destinations added successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

importData();
