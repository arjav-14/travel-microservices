const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Load models
const Destination = require('../src/models/Destination');

// Sample data
const destinations = [
  {
    "name": "Bali, Indonesia",
    "description": "Tropical paradise with stunning beaches and rich culture",
    "location": {
      "type": "Point",
      "coordinates": [115.188919, -8.409518],
      "formattedAddress": "Bali, Indonesia",
      "street": "",
      "city": "Bali",
      "state": "Bali",
      "zipcode": "",
      "country": "Indonesia"
    },
    "rating": 4.9,
    "reviews": 2453,
    "photo": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop",
    "activities": ["Beach", "Cultural", "Adventure", "Relaxation"],
    "averageCost": 899,
    "priceRange": "$$$",
    "featured": true,
    "user": new mongoose.Types.ObjectId()
  },
  {
    "name": "Santorini, Greece",
    "description": "Iconic white buildings overlooking the Aegean Sea",
    "location": {
      "type": "Point",
      "coordinates": [25.4615, 36.3932],
      "formattedAddress": "Santorini, Greece",
      "street": "",
      "city": "Santorini",
      "state": "South Aegean",
      "zipcode": "",
      "country": "Greece"
    },
    "rating": 4.8,
    "reviews": 1876,
    "photo": "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&auto=format&fit=crop",
    "activities": ["Beach", "Sightseeing", "Cultural", "Relaxation"],
    "averageCost": 1299,
    "priceRange": "$$$$",
    "featured": true,
    "user": new mongoose.Types.ObjectId()
  },
  {
    "name": "Maldives",
    "description": "Luxury overwater villas in crystal clear waters",
    "location": {
      "type": "Point",
      "coordinates": [73.2207, 3.2028],
      "formattedAddress": "Maldives",
      "street": "",
      "city": "Malé",  // Added capital city
      "state": "Kaafu Atoll",
      "zipcode": "",
      "country": "Maldives"
    },
    "rating": 5.0,
    "reviews": 3124,
    "photo": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop",
    "activities": ["Beach", "Relaxation", "Adventure", "Sightseeing"],
    "averageCost": 1899,
    "priceRange": "$$$$",
    "featured": true,
    "user": new mongoose.Types.ObjectId()
  },
  {
    "name": "Kyoto, Japan",
    "description": "Ancient temples and stunning cherry blossoms",
    "location": {
      "type": "Point",
      "coordinates": [135.7681, 35.0116],
      "formattedAddress": "Kyoto, Japan",
      "street": "",
      "city": "Kyoto",
      "state": "Kyoto Prefecture",
      "zipcode": "",
      "country": "Japan"
    },
    "rating": 4.7,
    "reviews": 1654,
    "photo": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop",
    "activities": ["Cultural", "Sightseeing", "Hiking", "Food"],
    "averageCost": 1099,
    "priceRange": "$$$",
    "featured": true,
    "user": new mongoose.Types.ObjectId()
  },
  {
    "name": "Swiss Alps",
    "description": "Majestic mountains and pristine alpine villages",
    "location": {
      "type": "Point",
      "coordinates": [8.2275, 46.8182],
      "formattedAddress": "Swiss Alps, Switzerland",
      "street": "",
      "city": "Zermatt",  // Added a major city in Swiss Alps
      "state": "Valais",
      "zipcode": "",
      "country": "Switzerland"
    },
    "rating": 4.9,
    "reviews": 2198,
    "photo": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop",
    "activities": ["Adventure", "Hiking", "Mountain", "Sightseeing"],
    "averageCost": 1499,
    "priceRange": "$$$",
    "featured": true,
    "user": new mongoose.Types.ObjectId()
  },
  {
    "name": "Dubai, UAE",
    "description": "Futuristic cityscape with world-class luxury",
    "location": {
      "type": "Point",
      "coordinates": [55.2708, 25.2048],
      "formattedAddress": "Dubai, United Arab Emirates",
      "street": "",
      "city": "Dubai",
      "state": "Dubai",
      "zipcode": "",
      "country": "United Arab Emirates"
    },
    "rating": 4.6,
    "reviews": 2876,
    "photo": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop",
    "activities": ["Sightseeing", "Shopping", "Food", "Adventure"],
    "averageCost": 1199,
    "priceRange": "$$$",
    "featured": true,
    "user": new mongoose.Types.ObjectId()
  }
];

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/explorex-destinations', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...'.cyan.underline.bold);
  } catch (err) {
    console.error('Database connection error:'.red.bold, err.message);
    process.exit(1);
  }
};

// Import data
const importData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Destination.deleteMany();
    console.log('Cleared existing destinations'.yellow);
    
    // Insert new data
    const createdDestinations = await Destination.insertMany(destinations);
    console.log(`Inserted ${createdDestinations.length} destinations`.green.bold);
    
    process.exit();
  } catch (err) {
    console.error('Error importing data:'.red, err.message);
    process.exit(1);
  }
};

// Handle command line arguments
if (process.argv[2] === '-d') {
  // Delete data
  (async () => {
    await connectDB();
    await Destination.deleteMany();
    console.log('Data destroyed'.red);
    process.exit();
  })();
} else {
  // Import data
  importData();
}