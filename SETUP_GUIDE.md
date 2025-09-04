# T Ali Services Setup Guide

This guide will walk you through setting up the complete T Ali Services platform step by step.

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
cd uber-clone
npm install
```

### Step 2: Start Docker Services
```bash
npm run docker:dev
```
This will start:
- MongoDB on port 27017
- Redis on port 6379
- The Next.js app on port 3000

### Step 3: Seed the Database
Visit: `http://localhost:3000/api/seed` (POST request)
Or use curl:
```bash
curl -X POST http://localhost:3000/api/seed
```

### Step 4: Access the Application
- **Main App**: http://localhost:3000
- **User Dashboard**: http://localhost:3000/dashboard
- **Admin Panel**: http://localhost:3000/admin

## 🔐 Demo Accounts

### User Account
- **Email**: user@demo.com
- **Password**: password123
- **Access**: User dashboard, booking services

### Driver Account
- **Email**: driver@demo.com
- **Password**: password123
- **Access**: Driver dashboard, accept bookings

### Admin Account
- **Email**: admin@demo.com
- **Password**: password123
- **Access**: Full admin panel, analytics, user management

## 📱 Features Walkthrough

### 1. Landing Page
- Hero section with service selector
- Real-time animations
- Service overview cards
- Feature highlights

### 2. Authentication
- Sign in/Sign up forms
- Demo account quick login
- Role-based redirects
- Session management

### 3. Ride Booking
1. Go to `/services/ride`
2. Enter pickup and destination
3. Get price estimate
4. Select vehicle type
5. Book ride
6. Real-time tracking simulation

### 4. Food Delivery
1. Go to `/services/food`
2. Enter delivery address
3. Browse restaurants
4. Add items to cart
5. Place order
6. Order tracking

### 5. Package Delivery
1. Go to `/services/package`
2. Enter pickup/delivery addresses
3. Select package size
4. Add recipient details
5. Get price estimate
6. Schedule delivery

### 6. User Dashboard
- Overview statistics
- Recent activity
- Quick action cards
- Booking history

### 7. Admin Panel
- Real-time analytics
- User management
- Booking oversight
- Revenue tracking

## 🗺️ Map Integration

The app includes a mock map component that simulates:
- Pickup/destination markers
- Route visualization
- Driver location tracking
- Real-time updates

For production, integrate with:
- Google Maps API
- Mapbox
- OpenStreetMap

## 📊 Database Structure

### Users Collection
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: 'user' | 'driver' | 'admin',
  isVerified: Boolean,
  isActive: Boolean,
  addresses: Array,
  paymentMethods: Array,
  preferences: Object
}
```

### Bookings Collection
```javascript
{
  userId: String,
  driverId: String,
  serviceType: 'ride' | 'food' | 'package',
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled',
  pickup: Object,
  destination: Object,
  pricing: Object,
  paymentMethod: Object,
  // Service-specific fields
}
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user

### Bookings
- `GET /api/bookings` - Get bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings` - Update booking

### Database
- `POST /api/seed` - Seed demo data

## 🎨 UI Components

### Reusable Components
- `Button` - Multiple variants and sizes
- `Input` - Consistent form inputs
- `LoadingSpinner` - Loading states
- `MapComponent` - Interactive maps

### Layout Components
- `Navbar` - Responsive navigation
- `Hero` - Landing page hero
- `Services` - Service showcase
- `Features` - Feature highlights
- `Footer` - Site footer

### Dashboard Components
- `DashboardLayout` - User dashboard layout
- `DashboardOverview` - Stats and activity
- `AdminLayout` - Admin panel layout
- `AdminDashboard` - Admin analytics

## 🚀 Deployment

### Environment Variables
```env
MONGODB_URI=mongodb://admin:password123@localhost:27017/uber_clone?authSource=admin
NEXTAUTH_SECRET=your-super-secret-key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
STRIPE_PUBLIC_KEY=your-stripe-public-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

### Production Build
```bash
npm run build
npm start
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🔄 Real-time Features

### Booking Flow Simulation
1. User creates booking → Status: 'pending'
2. After 3 seconds → Driver assigned, Status: 'accepted'
3. Manual status updates via admin panel
4. Real-time UI updates

### Live Tracking
- Mock driver location updates
- Route visualization
- ETA calculations
- Status notifications

## 📈 Analytics & Monitoring

### Admin Dashboard Metrics
- Total users and drivers
- Booking statistics by service
- Revenue tracking
- Recent activity feed
- Service breakdown charts

### User Dashboard
- Personal booking history
- Spending analytics
- Favorite locations
- Quick rebooking

## 🛠️ Customization

### Adding New Services
1. Create service page in `/app/services/[service]`
2. Add service logic to booking API
3. Update navigation and UI
4. Add service-specific fields to models

### Styling
- Tailwind CSS configuration in `tailwind.config.js`
- Custom colors and animations
- Responsive design patterns
- Component variants

### Database Extensions
- Add new collections as needed
- Extend existing models
- Create new API endpoints
- Update TypeScript types

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure Docker is running
   - Check connection string
   - Verify database credentials

2. **Authentication Issues**
   - Check NEXTAUTH_SECRET
   - Verify user exists in database
   - Clear browser cookies

3. **API Errors**
   - Check server logs
   - Verify request format
   - Ensure proper authentication

### Development Tips
- Use browser dev tools for debugging
- Check Docker logs: `docker-compose logs -f`
- Monitor database with MongoDB Compass
- Use Postman for API testing

## 📞 Support

For issues and questions:
1. Check this setup guide
2. Review the code documentation
3. Check Docker and database logs
4. Verify environment variables

---

**Happy coding! 🚀**