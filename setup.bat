@echo off
REM GSEAB School App - Setup Script for Windows

echo 🚀 SETUP GSEAB SCHOOL APP
echo ==========================

REM 1. Install dependencies
echo 📦 Installing dependencies...
call npm install

REM 2. Generate Prisma Client
echo 🔧 Generating Prisma Client...
call npx prisma generate

REM 3. Reset database and seed
echo 🌱 Setting up database...
call npx prisma db push --skip-generate
call npx prisma db seed

REM 4. Done
echo ✅ Setup complete!
echo.
echo 🎉 Ready to run!
echo Execute: npm run dev
echo.
echo Then open: http://localhost:3000
echo.
echo Login credentials:
echo   Email: groupe8@gmail.com
echo   Password: groupe8@@22
