# T Ali Services - Complete Service Platform

A comprehensive Uber-like service platform built with Next.js 14, featuring ride sharing, food delivery, and package delivery services with pixel-perfect UI and user-friendly design.

## 🚀 Features

### Core Services
- **Ride Sharing** - Book rides with real-time tracking
- **Food Delivery** - Order from restaurants with live tracking
- **Package Delivery** - Send packages with secure handling
- **Multi-Account Management** - Manage multiple user accounts

### Technical Features
- **Next.js 14 SSR** - Server-side rendering for optimal performance
- **MongoDB Integration** - Robust database with Mongoose ODM
- **NextAuth Authentication** - Secure user authentication
- **Docker Support** - Complete containerized development environment
- **Responsive Design** - Mobile-first, pixel-perfect UI
- **Real-time Updates** - Live tracking and notifications
- **Payment Integration** - Multiple payment methods support

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Containerization**: Docker, Docker Compose
- **Icons**: Lucide React

## 🏗 Project Structure

```
uber-clone/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── dashboard/         # User dashboard
│   ├── auth/             # Authentication pages
│   └── services/         # Service-specific pages
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── layout/           # Layout components
│   ├── dashboard/        # Dashboard components
│   └── forms/            # Form components
├── lib/                  # Utility libraries
│   ├── auth/            # Authentication utilities
│   ├── db/              # Database connection
│   └── utils/           # Helper functions
├── models/              # MongoDB models
├── types/               # TypeScript definitions
└── public/              # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- MongoDB (or use Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uber-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start with Docker (Recommended)**
   ```bash
   npm run docker:dev
   ```

5. **Or start manually**
   ```bash
   # Start MongoDB locally
   # Then run:
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🐳 Docker Setup

The project includes a complete Docker setup with:
- **MongoDB** - Database server
- **Redis** - Caching and sessions
- **Next.js App** - Main application

### Docker Commands
```bash
# Start all services
npm run docker:dev

# Stop all services
npm run docker:down

# View logs
docker-compose logs -f
```

## 📱 Services Overview

### 1. Ride Sharing
- Multiple vehicle types (Standard, Premium, Luxury)
- Real-time driver tracking
- Fare estimation
- Route optimization
- Driver ratings and reviews

### 2. Food Delivery
- Restaurant browsing
- Menu management
- Order tracking
- Delivery time estimation
- Restaurant ratings

### 3. Package Delivery
- Package size options
- Secure handling
- Proof of delivery
- Same-day delivery
- Package tracking

## 🔐 Authentication

- Email/Password authentication
- JWT-based sessions
- Role-based access control (User, Driver, Admin)
- Secure password hashing
- Session management

## 💾 Database Schema

### User Model
- Personal information
- Authentication data
- Addresses and preferences
- Payment methods
- Role management

### Booking Model
- Service type (ride/food/package)
- Location details
- Pricing information
- Status tracking
- Payment details

## 🎨 UI/UX Features

- **Pixel-perfect design** - Uber-inspired modern interface
- **Responsive layout** - Works on all devices
- **Smooth animations** - Framer Motion powered
- **Intuitive navigation** - User-friendly experience
- **Real-time updates** - Live status updates
- **Dark/Light themes** - Theme support

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run docker:dev   # Start with Docker
npm run docker:down  # Stop Docker services
```

### Environment Variables
```env
MONGODB_URI=mongodb://admin:password123@localhost:27017/uber_clone?authSource=admin
NEXTAUTH_SECRET=your-super-secret-key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
STRIPE_PUBLIC_KEY=your-stripe-public-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code examples

---

**Built with ❤️ using Next.js 14 and modern web technologies**