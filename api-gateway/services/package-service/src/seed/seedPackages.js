const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Load models
const Package = require('../models/Package');

// Sample package data
const packages = [
  {
    name: 'Paris Getaway',
    description: 'Experience the romance and beauty of Paris. Visit the Eiffel Tower, explore art at the Louvre, and enjoy the charming cafés along the Seine.',
    price: 1299,
    duration: 5,
    maxPeople: 10,
    location: 'Paris, France',
    category: 'cultural',
    images: [
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1000',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1000'
    ],
    included: [
      { name: '4 nights in 4-star hotel', description: 'Comfortable accommodation in central Paris' },
      { name: 'Daily breakfast', description: 'Continental breakfast included' },
      { name: 'Eiffel Tower entry tickets', description: 'Skip-the-line access' },
      { name: 'Seine River Cruise', description: 'Evening cruise with dinner' },
      { name: 'Airport transfers', description: 'Round-trip airport transportation' }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Eiffel Tower', description: 'Arrive in Paris and visit the iconic Eiffel Tower' },
      { day: 2, title: 'Louvre & Seine Cruise', description: 'Tour the Louvre Museum and enjoy a scenic Seine River cruise' },
      { day: 3, title: 'Montmartre & Local Cafés', description: 'Explore Montmartre and enjoy Parisian cafés' },
      { day: 4, title: 'Shopping & Landmarks', description: 'Visit Arc de Triomphe and shop at Champs-Élysées' },
      { day: 5, title: 'Departure', description: 'Depart after breakfast' }
    ],
    rating: 4.8,
    numReviews: 124,
    features: ['Guided tours', 'Museum tickets', 'River cruise', 'City transport'],
    difficulty: 'easy',
    bestTimeToVisit: ['April', 'May', 'September', 'October'],
    groupSize: { min: 2, max: 10 }
  },
  {
    name: 'Tokyo Adventure',
    description: 'Dive into the bustling city of Tokyo where tradition meets technology. Discover temples, neon streets, and sushi heaven.',
    price: 1599,
    duration: 7,
    maxPeople: 12,
    location: 'Tokyo, Japan',
    category: 'adventure',
    images: [
      'https://images.unsplash.com/photo-1492571350019-22cd083bbd7b?q=80&w=1000',
      'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?q=80&w=1000',
      'https://images.unsplash.com/photo-1505068901472-d6d4e1f94c86?q=80&w=1000'
    ],
    included: [
      { name: '6 nights in 4-star hotel', description: 'Modern hotel in central Tokyo' },
      { name: 'Daily breakfast', description: 'Japanese and Western breakfast' },
      { name: 'Mt. Fuji tour', description: 'Full-day guided tour' },
      { name: 'Airport transfers', description: 'Private transfers' },
      { name: 'Tokyo Metro Pass', description: '7-day unlimited pass' }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Asakusa', description: 'Arrive in Tokyo and visit Senso-ji Temple' },
      { day: 2, title: 'Shibuya & Harajuku', description: 'Explore trendy Tokyo neighborhoods' },
      { day: 3, title: 'Mt. Fuji Excursion', description: 'Full-day trip to Mt. Fuji and Lake Ashi' },
      { day: 4, title: 'Akihabara & Shopping', description: 'Shop for gadgets and anime merchandise' },
      { day: 5, title: 'Tsukiji Market & Skytree', description: 'Taste authentic sushi and enjoy skyline views' },
      { day: 6, title: 'Free Day', description: 'Enjoy Tokyo at your own pace' },
      { day: 7, title: 'Departure', description: 'Return flight after breakfast' }
    ],
    rating: 4.9,
    numReviews: 87,
    features: ['Mt. Fuji tour', 'Temple visits', 'Metro pass', 'Cultural experiences'],
    difficulty: 'moderate',
    bestTimeToVisit: ['March', 'April', 'October', 'November'],
    groupSize: { min: 2, max: 12 }
  },
  {
    name: 'Bali Paradise',
    description: 'Relax on the beaches of Bali, explore lush jungles, and experience the vibrant Balinese culture.',
    price: 1499,
    duration: 8,
    maxPeople: 15,
    location: 'Bali, Indonesia',
    category: 'beach',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000'
    ],
    included: [
      { name: '7 nights in luxury resort', description: 'Beachfront resort with pool' },
      { name: 'Daily breakfast', description: 'Buffet breakfast' },
      { name: 'Airport transfers', description: 'Private car service' },
      { name: 'Guided tours', description: 'Temple and rice terrace tours' },
      { name: 'Spa session', description: 'Traditional Balinese massage' }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Relax', description: 'Arrive and relax at the resort' },
      { day: 2, title: 'Beach Day', description: 'Enjoy Kuta and Seminyak beaches' },
      { day: 3, title: 'Uluwatu Temple', description: 'Visit the iconic cliffside temple' },
      { day: 4, title: 'Ubud Exploration', description: 'Tour rice terraces and local markets' },
      { day: 5, title: 'Balinese Dance', description: 'Cultural performance and local dinner' },
      { day: 6, title: 'Spa & Leisure', description: 'Rejuvenate with spa and relaxation' },
      { day: 7, title: 'Shopping', description: 'Buy souvenirs from Ubud markets' },
      { day: 8, title: 'Departure', description: 'Depart with great memories' }
    ],
    rating: 4.9,
    numReviews: 215,
    features: ['Beach access', 'Spa treatments', 'Cultural tours', 'Water sports'],
    difficulty: 'easy',
    bestTimeToVisit: ['April', 'May', 'June', 'September'],
    groupSize: { min: 2, max: 15 }
  },
  {
    name: 'Rome Historical Tour',
    description: 'Step back in time with this Roman adventure exploring ancient ruins, art, and culinary delights.',
    price: 1399,
    duration: 6,
    maxPeople: 10,
    location: 'Rome, Italy',
    category: 'cultural',
    images: [
      'https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=1000',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000',
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1000'
    ],
    included: [
      { name: '5 nights accommodation', description: 'Boutique hotel near city center' },
      { name: 'Daily breakfast', description: 'Italian breakfast' },
      { name: 'Skip-the-line Colosseum tickets', description: 'Priority access' },
      { name: 'Airport transfers', description: 'Shared shuttle service' },
      { name: 'Guided tours', description: 'Professional English-speaking guides' }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & City Walk', description: 'Arrive and enjoy an evening walk around Trevi Fountain' },
      { day: 2, title: 'Colosseum & Forum', description: 'Visit ancient Roman landmarks' },
      { day: 3, title: 'Vatican City', description: 'Explore Vatican Museums and Sistine Chapel' },
      { day: 4, title: 'Local Cuisine', description: 'Cooking class and local dinner' },
      { day: 5, title: 'Shopping & Pantheon', description: 'Explore markets and historical sites' },
      { day: 6, title: 'Departure', description: 'Check-out and transfer to airport' }
    ],
    rating: 4.7,
    numReviews: 178,
    features: ['Skip-the-line tickets', 'Cooking class', 'Walking tours', 'Wine tasting'],
    difficulty: 'moderate',
    bestTimeToVisit: ['April', 'May', 'September', 'October'],
    groupSize: { min: 2, max: 10 }
  },
  {
    name: 'Maldives Luxury Escape',
    description: 'Indulge in luxury in the Maldives — crystal clear waters, white sands, and private overwater villas await.',
    price: 2999,
    duration: 7,
    maxPeople: 8,
    location: 'Maldives',
    category: 'luxury',
    images: [
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1000',
      'https://images.unsplash.com/photo-1582719478189-894d8405334c?q=80&w=1000',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1000'
    ],
    included: [
      { name: '6 nights in overwater villa', description: 'Private villa with direct ocean access' },
      { name: 'All meals included', description: 'Full board with premium dining' },
      { name: 'Airport transfers', description: 'Speedboat or seaplane transfers' },
      { name: 'Snorkeling gear', description: 'Complimentary equipment' },
      { name: 'Spa session', description: 'Couples massage included' }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Check-in', description: 'Arrive and check into luxury resort' },
      { day: 2, title: 'Beach Relaxation', description: 'Spend the day on private beach' },
      { day: 3, title: 'Water Activities', description: 'Enjoy snorkeling and water sports' },
      { day: 4, title: 'Spa & Wellness', description: 'Relax with spa treatments' },
      { day: 5, title: 'Sunset Cruise', description: 'Romantic evening on the water' },
      { day: 6, title: 'Leisure Day', description: 'Free time to enjoy resort' },
      { day: 7, title: 'Departure', description: 'Check-out and farewell' }
    ],
    rating: 4.9,
    numReviews: 342,
    features: ['Overwater villa', 'All-inclusive', 'Water sports', 'Spa treatments'],
    difficulty: 'easy',
    bestTimeToVisit: ['November', 'December', 'January', 'February', 'March', 'April'],
    groupSize: { min: 2, max: 8 }
  },
  {
    name: 'Kenyan Safari Adventure',
    description: 'Embark on an unforgettable safari through Kenya\'s wildlife reserves and breathtaking landscapes.',
    price: 3499,
    duration: 10,
    maxPeople: 12,
    location: 'Nairobi, Kenya',
    category: 'wildlife',
    images: [
      'https://images.unsplash.com/photo-1523805009345-7448405a9f53?q=80&w=1000',
      'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000',
      'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1000'
    ],
    included: [
      { name: '9 nights accommodation', description: 'Luxury safari lodges' },
      { name: 'All meals included', description: 'Full board with local cuisine' },
      { name: 'Safari game drives', description: 'Daily game drives with expert guides' },
      { name: 'Park entry fees', description: 'All national park fees included' },
      { name: 'Airport transfers', description: 'Private 4x4 vehicle' }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Nairobi', description: 'Welcome to Kenya and check-in at hotel' },
      { day: 2, title: 'Drive to Maasai Mara', description: 'Scenic drive to Maasai Mara Reserve' },
      { day: 3, title: 'Safari Game Drive', description: 'Spot lions, elephants, and giraffes' },
      { day: 4, title: 'Cultural Visit', description: 'Meet Maasai tribe and learn traditions' },
      { day: 5, title: 'Amboseli Park', description: 'Drive to Amboseli and view Mount Kilimanjaro' },
      { day: 6, title: 'Leisure & Relaxation', description: 'Enjoy resort amenities' },
      { day: 7, title: 'Evening Safari', description: 'Experience wildlife at dusk' },
      { day: 8, title: 'Lake Nakuru Park', description: 'Visit flamingo-dotted lake' },
      { day: 9, title: 'Return to Nairobi', description: 'Leisure evening' },
      { day: 10, title: 'Departure', description: 'Flight home with memories' }
    ],
    rating: 4.9,
    numReviews: 156,
    features: ['Game drives', 'Cultural visits', 'Wildlife photography', 'Expert guides'],
    difficulty: 'moderate',
    bestTimeToVisit: ['July', 'August', 'September', 'October'],
    groupSize: { min: 4, max: 12 }
  },
  {
    name: 'Kyoto Temple Tour',
    description: 'Discover Japan\'s cultural capital filled with historic temples, gardens, and traditional experiences.',
    price: 2199,
    duration: 6,
    maxPeople: 10,
    location: 'Kyoto, Japan',
    category: 'cultural',
    images: [
      'https://images.unsplash.com/photo-1492571350019-22cd083bbd7b?q=80&w=1000',
      'https://images.unsplash.com/photo-1500336624523-d727130c3328?q=80&w=1000',
      'https://images.unsplash.com/photo-1526483360412-f4dbaf036963?q=80&w=1000'
    ],
    included: [
      { name: '5 nights hotel stay', description: 'Traditional ryokan accommodation' },
      { name: 'Daily breakfast', description: 'Japanese breakfast' },
      { name: 'Guided temple tours', description: 'Expert cultural guides' },
      { name: 'Airport transfers', description: 'Private transfers' },
      { name: 'Cultural experience session', description: 'Tea ceremony and kimono wearing' }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Gion Walk', description: 'Arrive and explore Gion District' },
      { day: 2, title: 'Temples Tour', description: 'Visit Kinkaku-ji and Ryoan-ji' },
      { day: 3, title: 'Fushimi Inari Shrine', description: 'Walk through iconic red torii gates' },
      { day: 4, title: 'Bamboo Grove', description: 'Morning visit to Arashiyama Bamboo Forest' },
      { day: 5, title: 'Tea Ceremony', description: 'Participate in a traditional tea ceremony' },
      { day: 6, title: 'Departure', description: 'Farewell Kyoto' }
    ],
    rating: 4.8,
    numReviews: 132,
    features: ['Temple visits', 'Tea ceremony', 'Bamboo forest', 'Traditional accommodation'],
    difficulty: 'easy',
    bestTimeToVisit: ['March', 'April', 'November'],
    groupSize: { min: 2, max: 10 }
  },
  {
    name: 'New York City Tour',
    description: 'Experience the energy of the Big Apple with our New York City tour package. From Times Square to Central Park, this package covers all the iconic landmarks of NYC.',
    price: 1099,
    duration: 4,
    maxPeople: 15,
    location: 'New York, USA',
    category: 'adventure',
    images: [
      'https://images.unsplash.com/photo-1499092346589-2e6f9f5a3b3e?q=80&w=1000',
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000',
      'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=1000'
    ],
    included: [
      { name: '3 nights accommodation in 4-star hotel', description: 'Midtown Manhattan hotel' },
      { name: 'Daily breakfast', description: 'American breakfast' },
      { name: 'Airport transfers', description: 'Shared shuttle' },
      { name: 'Statue of Liberty ferry ticket', description: 'Round-trip ferry' },
      { name: 'Hop-on-hop-off bus tour', description: '48-hour pass' },
      { name: 'MetroCard', description: 'Unlimited subway and bus rides' }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Midtown', description: 'Arrive in NYC, check-in, and explore Midtown Manhattan' },
      { day: 2, title: 'Downtown & Statue of Liberty', description: 'Visit Wall Street, 9/11 Memorial, and take a ferry to the Statue of Liberty' },
      { day: 3, title: 'Uptown & Museums', description: 'Explore Central Park and visit world-class museums' },
      { day: 4, title: 'Departure', description: 'Last-minute shopping and departure' }
    ],
    rating: 4.7,
    numReviews: 1243,
    features: ['Hop-on-hop-off bus', 'Statue of Liberty', 'Museum access', 'Metro pass'],
    difficulty: 'moderate',
    bestTimeToVisit: ['April', 'May', 'September', 'October'],
    groupSize: { min: 1, max: 15 }
  }
];

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/explorex-packages', {
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
    await Package.deleteMany();
    console.log('Cleared existing packages'.yellow);
    
    // Insert new data
    const createdPackages = await Package.insertMany(packages);
    console.log(`Inserted ${createdPackages.length} packages`.green.bold);
    
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
    await Package.deleteMany();
    console.log('Data destroyed'.red);
    process.exit();
  })();
} else {
  // Import data
  importData();
}
