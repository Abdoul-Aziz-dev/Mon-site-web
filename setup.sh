#!/bin/bash

# GSEAB School App - Setup Script

echo "🚀 SETUP GSEAB SCHOOL APP"
echo "=========================="

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 2. Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

# 3. Reset database and seed
echo "🌱 Setting up database..."
npx prisma db push --skip-generate
npx prisma db seed

# 4. Done
echo "✅ Setup complete!"
echo ""
echo "🎉 Ready to run!"
echo "Execute: npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "Login credentials:"
echo "  Email: groupe8@gmail.com"
echo "  Password: groupe8@@22"
