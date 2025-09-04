# 🚀 T Ali Services Quick Start

## One-Command Setup

```bash
./start.sh
```

This script will:
- ✅ Check Docker status
- 🐳 Start MongoDB & Redis containers
- 📦 Install dependencies
- 🚀 Launch the application
- 🌐 Open at http://localhost:3000

## Manual Setup (if script fails)

### 1. Start Docker Services
```bash
docker-compose up -d
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Application
```bash
npm run dev
```

### 4. Seed Database
```bash
curl -X POST http://localhost:3000/api/seed
```

## 🔑 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| User | user@demo.com | password123 |
| Driver | driver@demo.com | password123 |
| Admin | admin@demo.com | password123 |

## 📱 Quick Test Flow

1. **Visit**: http://localhost:3000
2. **Click**: "Login as User" (demo button)
3. **Go to**: Services → Ride
4. **Enter**: Any pickup/destination
5. **Click**: "Get Estimate" → "Book Ride"
6. **Watch**: Real-time tracking simulation

## 🛠 Troubleshooting

### Docker Issues
```bash
# Check Docker status
docker ps

# Restart services
docker-compose restart

# View logs
docker-compose logs -f
```

### Database Connection
```bash
# Test MongoDB
docker exec uber-clone-mongo mongosh --eval "db.adminCommand('ping')"

# Seed database
curl -X POST http://localhost:3000/api/seed
```

### Port Conflicts
- MongoDB: 27017
- Redis: 6379  
- App: 3000

Change ports in `docker-compose.yml` if needed.

## ✨ Features Ready to Test

- 🚗 **Ride Booking** with real-time tracking
- 🍕 **Food Delivery** with restaurant selection
- 📦 **Package Delivery** with size options
- 👤 **User Dashboard** with activity tracking
- 🔧 **Admin Panel** with full analytics
- 🗺️ **Interactive Maps** with route visualization
- 🔔 **Toast Notifications** for all actions
- 📱 **Responsive Design** on all devices

## 🎯 Success Indicators

✅ No console errors  
✅ Toast notifications appear  
✅ Maps show pickup/destination markers  
✅ Booking flow completes  
✅ Dashboard shows data  
✅ Admin panel loads with stats  

---

**Need help?** Check the full SETUP_GUIDE.md for detailed instructions.