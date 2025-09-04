#!/bin/bash

echo "🚀 Starting T Ali Services with Docker..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start services
echo "📦 Starting MongoDB and Redis..."
docker-compose up -d

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to be ready..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Services are running!"
    echo "📊 MongoDB: localhost:27018"
    echo "🔴 Redis: localhost:6380"
    echo ""
    echo "🌐 Starting Next.js application..."
    npm run dev
else
    echo "❌ Failed to start services"
    docker-compose logs
fi