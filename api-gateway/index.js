// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const morgan = require('morgan');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));

// // Health check endpoint
// app.get('/api/v1/health', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     message: 'API Gateway is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // Proxy configuration for auth service
// app.use(
//   '/api/v1/auth',
//   createProxyMiddleware({
//     target: 'http://auth-service:3001/api/v1/auth',
//     changeOrigin: true,
//     pathRewrite: {
//       '^/api/v1/auth': '' // Remove the prefix when forwarding
//     },
//     onError: (err, req, res) => {
//       console.error('Auth service proxy error:', err);
//       res.status(500).json({
//         status: 'error',
//         message: 'Authentication service is currently unavailable'
//       });
//     }
//   })
// );

// // Proxy configuration for package service
// app.use(
//   '/api/v1/packages',
//   createProxyMiddleware({
//     target: 'http://package-service:5002',
//     changeOrigin: true,
//     pathRewrite: {
//       '^/api/v1/packages': ''
//     },
//     onError: (err, req, res) => {
//       console.error('Package service proxy error:', err);
//       res.status(500).json({
//         status: 'error',
//         message: 'Package service is currently unavailable'
//       });
//     }
//   })
// );

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     status: 'error',
//     message: 'Route not found'
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     status: 'error',
//     message: 'Internal server error',
//     error: process.env.NODE_ENV === 'development' ? err.message : {}
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`API Gateway running on port ${PORT}`);
//   console.log(`Health check: http://localhost:${PORT}/api/v1/health`);
// });

// module.exports = app;


require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API Gateway is running',
    timestamp: new Date().toISOString()
  });
});

// 🟢 Proxy for Auth Service
app.use(
  '/api/v1/auth',
  createProxyMiddleware({
    target: 'http://auth-service:3001',
    changeOrigin: true,
    pathRewrite: { '^/api/v1/auth': '/api/v1/auth' },
    onError: (err, req, res) => {
      console.error('Auth service proxy error:', err);
      res.status(500).json({ status: 'error', message: 'Auth service unavailable' });
    }
  })
);

// 🟢 Proxy for Package Service
app.use(
  '/api/v1/packages',
  createProxyMiddleware({
    target: 'http://package-service:3002',
    changeOrigin: true,
    pathRewrite: { '^/api/v1/packages': '/api/v1/packages' },
    onError: (err, req, res) => {
      console.error('Package service proxy error:', err);
      res.status(500).json({ status: 'error', message: 'Package service unavailable' });
    }
  })
);

// 🟢 Proxy for Booking Service
app.use(
  '/api/v1/bookings',
  createProxyMiddleware({
    target: 'http://booking-service:3003',
    changeOrigin: true,
    pathRewrite: { '^/api/v1/bookings': '/api/v1/bookings' },
    onError: (err, req, res) => {
      console.error('Booking service proxy error:', err);
      res.status(500).json({ status: 'error', message: 'Booking service unavailable' });
    }
  })
);

// 🟢 Proxy for Destination Service
app.use(
  '/api/v1/destinations',
  createProxyMiddleware({
    target: 'http://destination-service:3005',
    changeOrigin: true,
    pathRewrite: { '^/api/v1/destinations': '/api/v1/destinations' },
    onError: (err, req, res) => {
      console.error('Destination service proxy error:', err);
      res.status(500).json({ status: 'error', message: 'Destination service unavailable' });
    }
  })
);

// 🟢 Proxy for User Service
app.use(
  '/api/v1/users',
  createProxyMiddleware({
    target: 'http://user-service:3006',
    changeOrigin: true,
    pathRewrite: { '^/api/v1/users': '/api/v1/users' },
    onError: (err, req, res) => {
      console.error('User service proxy error:', err);
      res.status(500).json({ status: 'error', message: 'User service unavailable' });
    }
  })
);

// Default 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/v1/health`);
});

