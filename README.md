# 🌍 ExploreX Travel - Microservices Architecture

A full-stack travel booking platform built with **microservices architecture**, featuring user authentication, package management, booking system, and automated email notifications.

## 🏗️ Architecture Overview

This project implements a **true microservices architecture** with 5 independent services:

```
┌─────────────────────────────────────────┐
│     Frontend Microservice (Port 5173)   │
│          React + Vite SPA               │
└─────────────────┬───────────────────────┘
                  │ HTTP REST APIs
        ┌─────────┼─────────┬─────────┐
        ▼         ▼         ▼         ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│   Auth   │ │ Booking  │ │ Package  │ │Destination│
│ Service  │ │ Service  │ │ Service  │ │ Service  │
│  :3001   │ │  :3002   │ │  :3004   │ │  :5001   │
└────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘
     │            │            │            │
     ▼            ▼            ▼            ▼
┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│explorex-│ │explorex- │ │explorex- │ │explorex- │
│  auth   │ │ bookings │ │ packages │ │   dest   │
│ MongoDB │ │ MongoDB  │ │ MongoDB  │ │ MongoDB  │
└─────────┘ └──────────┘ └──────────┘ └──────────┘
                  │
                  ▼
            ┌──────────┐
            │  Email   │
            │ Service  │
            │  (SMTP)  │
            └──────────┘
```

## 📋 Microservices

| Service | Port | Technology | Database | Description |
|---------|------|------------|----------|-------------|
| **Frontend** | 5173 | React + Vite | - | User interface and client-side logic |
| **Auth Service** | 3001 | Node.js + Express | explorex-auth | User authentication & authorization |
| **Booking Service** | 3002 | Node.js + Express | explorex-bookings | Booking management & email notifications |
| **Package Service** | 3004 | Node.js + Express | explorex-packages | Travel package management |
| **Destination Service** | 5001 | Node.js + Express | explorex-destinations | Destination information |

## ✨ Features

### 🔐 Authentication Service
- User registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- User profile management

### 📦 Package Service
- Browse travel packages
- Search and filter packages
- View package details with itinerary
- Package CRUD operations (admin)

### 🎫 Booking Service
- Create and manage bookings
- View user-specific bookings
- Payment status tracking
- **Automated email confirmations** on successful payment

### 📧 Email Notifications
- Beautiful HTML email templates
- Booking confirmation with complete details
- Day-by-day itinerary in email
- Package inclusions and information
- Payment receipt

### 🎨 Frontend Features
- Modern, responsive UI with Tailwind CSS
- User authentication flow
- Package browsing and search
- Booking creation and management
- Payment processing interface
- User dashboard ("My Bookings")

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/arjav-14/travel-microservices.git
cd travel-microservices
```

2. **Install dependencies for each service**

```bash
# Auth Service
cd api-gateway/services/auth-service
npm install

# Booking Service
cd ../booking-service
npm install

# Package Service
cd ../package-service
npm install

# Destination Service
cd ../destination-service
npm install

# Frontend
cd ../../../frontend
npm install
```

3. **Configure environment variables**

Create `.env` files in each service directory:

**Auth Service** (`api-gateway/services/auth-service/.env`):
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/explorex-auth
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
JWT_EXPIRE=30d
```

**Booking Service** (`api-gateway/services/booking-service/.env`):
```env
PORT=3002
MONGODB_URI=mongodb://localhost:27017/explorex-bookings
NODE_ENV=development

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

**Package Service** (`api-gateway/services/package-service/.env`):
```env
PORT=3004
MONGODB_URI=mongodb://localhost:27017/explorex-packages
NODE_ENV=development
```

**Destination Service** (`api-gateway/services/destination-service/.env`):
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/explorex-destinations
NODE_ENV=development
```

4. **Start MongoDB**
```bash
mongod
```

5. **Start all services**

Open separate terminals for each service:

```bash
# Terminal 1 - Auth Service
cd api-gateway/services/auth-service
npm start

# Terminal 2 - Booking Service
cd api-gateway/services/booking-service
npm start

# Terminal 3 - Package Service
cd api-gateway/services/package-service
npm start

# Terminal 4 - Destination Service
cd api-gateway/services/destination-service
npm start

# Terminal 5 - Frontend
cd frontend
npm run dev
```

6. **Access the application**
- Frontend: http://localhost:5173
- Auth API: http://localhost:3001/api/v1/auth
- Booking API: http://localhost:3002/api/v1/bookings
- Package API: http://localhost:3004/api/v1/packages
- Destination API: http://localhost:5001/api/v1/destinations

## 📧 Email Configuration

For email notifications to work, configure Gmail App Password:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Update `EMAIL_USER` and `EMAIL_PASSWORD` in booking service `.env`

See `api-gateway/services/booking-service/EMAIL_SETUP.md` for detailed instructions.

## 🔄 API Endpoints

### Auth Service (Port 3001)
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user
- `GET /api/v1/auth/users/:id` - Get user by ID

### Booking Service (Port 3002)
- `POST /api/v1/bookings` - Create booking
- `GET /api/v1/bookings` - Get all bookings
- `GET /api/v1/bookings/mybookings` - Get user's bookings
- `GET /api/v1/bookings/:id` - Get booking by ID
- `PUT /api/v1/bookings/:id/pay` - Update payment status
- `DELETE /api/v1/bookings/:id` - Delete booking

### Package Service (Port 3004)
- `GET /api/v1/packages` - Get all packages (with pagination)
- `GET /api/v1/packages/:id` - Get package by ID
- `POST /api/v1/packages` - Create package
- `PUT /api/v1/packages/:id` - Update package
- `DELETE /api/v1/packages/:id` - Delete package

## 🛠️ Technology Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- Nodemailer
- http-status-codes

## 🎯 Microservices Benefits

1. **Independent Deployment** - Each service can be deployed separately
2. **Technology Flexibility** - Different services can use different tech stacks
3. **Fault Isolation** - Failure in one service doesn't affect others
4. **Scalability** - Scale individual services based on demand
5. **Team Organization** - Different teams can work on different services
6. **Database per Service** - Each service owns its data

## 📁 Project Structure

```
explorex-microservices/
├── api-gateway/
│   └── services/
│       ├── auth-service/
│       │   ├── src/
│       │   ├── package.json
│       │   └── .env
│       ├── booking-service/
│       │   ├── src/
│       │   │   ├── controllers/
│       │   │   ├── models/
│       │   │   ├── routes/
│       │   │   └── utils/
│       │   │       └── emailService.js
│       │   ├── package.json
│       │   └── .env
│       ├── package-service/
│       │   ├── src/
│       │   ├── package.json
│       │   └── .env
│       └── destination-service/
│           ├── src/
│           ├── package.json
│           └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── .env
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Arjav Badjate**
- GitHub: [@arjav-14](https://github.com/arjav-14)

## 🙏 Acknowledgments

- Built with microservices architecture best practices
- Implements database per service pattern
- Features automated email notifications
- Modern React frontend with Tailwind CSS

---

⭐ Star this repository if you find it helpful!
