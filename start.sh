#!/bin/bash

echo "🚀 Starting T Ali Services Platform..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Start services
echo "🐳 Starting Docker services..."
docker-compose up -d

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to be ready..."
until docker exec uber-clone-mongo mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
    echo "   MongoDB is starting..."
    sleep 2
done

echo "✅ MongoDB is ready!"

# Wait for Redis to be ready
echo "⏳ Waiting for Redis to be ready..."
until docker exec uber-clone-redis redis-cli ping > /dev/null 2>&1; do
    echo "   Redis is starting..."
    sleep 2
done

echo "✅ Redis is ready!"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the Next.js application
echo "🚀 Starting Next.js application..."
npm run dev &

# Wait a bit for the app to start
sleep 5

echo ""
echo "🎉 T Ali Services is starting up!"
echo ""
echo "📱 Application: http://localhost:3000"
echo "🗄️  MongoDB: mongodb://admin:password123@localhost:27017/uber_clone?authSource=admin"
echo "🔴 Redis: redis://localhost:6379"
echo ""
echo "🔑 Demo Accounts:"
echo "   User: user@demo.com / password123"
echo "   Driver: driver@demo.com / password123"
echo "   Admin: admin@demo.com / password123"
echo ""
echo "💡 Don't forget to seed the database:"
echo "   curl -X POST http://localhost:3000/api/seed"
echo ""
echo "Press Ctrl+C to stop all services"

# Keep the script running
wait