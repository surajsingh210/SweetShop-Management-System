**🧁 Sweet Shop Management System**

A full-stack web application built for managing an online Sweet Shop — including user registration/login, admin controls, product management, and purchase tracking.

Developed as part of the AI Kata Project Assignment using Node.js, Express, PostgreSQL, React, and Tailwind CSS.

**📋 Table of Contents**

Project Overview

Tech Stack

Folder Structure

Setup Instructions

Backend Development

Frontend Development

Testing (TDD)

API Endpoints

Functionality

Screenshots

Future Enhancements

Author

**📖 Project Overview**

Sweet Shop Management System is a MERN-style full-stack project where:

Users can register, log in, view available sweets, purchase items, and see order summaries.

Admins can add, update, restock, or delete sweets.

The project demonstrates authentication, CRUD operations, RESTful API design, testing, and modern responsive UI.

**💻 Tech Stack**
Layer	Technology
Frontend ----->	React + Vite + Tailwind CSS
Backend	----->  Node.js + Express
Database		-----> PostgreSQL (Neon Cloud DB)
Auth		----->  JWT + Bcrypt
Testing 	-----> 	Jest + Supertest
Version Control 	-----> 	Git + GitHub

**🏗 Folder Structure** 

sweet-shop-management/
│
├── backend/                     ← Node.js + Express + PostgreSQL API
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── db.js
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   ├── tests/
│   ├── package.json
│   └── .env
│
├── frontend/                    ← React + Vite + Tailwind SPA
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── assets/
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md



**⚙️ Setup Instructions**
🗄 Backend Setup
cd backend
npm install


**Create a .env file:**

PORT=5000
DATABASE_URL=postgresql://<your_neon_db_connection_string>
JWT_SECRET=supersecretkey


**Run the backend server:**

npm run dev


Server will start at:
➡️ http://localhost:5000

**💅 Frontend Setup**
cd frontend
npm install
npm run dev


The frontend will start at:
➡️ http://localhost:5173

**🧠 Backend Development**

Database: PostgreSQL with Neon Cloud instance.

Authentication: JWT tokens & bcrypt for password hashing.

CRUD Operations: Implemented for managing sweets.

Error Handling: Proper 404/500 response handling.

Security: CORS, dotenv for environment management.

**🪄 Frontend Development**

Framework: React + Vite + Tailwind CSS

Routing: React Router DOM

State Handling: React hooks (useState, useEffect)

API Integration: Axios-based communication with backend

Responsive UI: Modern design with Tailwind utility classes

💡 Key Features

User Registration & Login forms

Dashboard with all sweets

Search and Filter sweets by category

Add to Cart and Order Summary

Purchase and Payment simulation

Admin Panel for Add/Update/Delete sweets

🧪 Testing (TDD)

Jest & Supertest used for backend testing.

Run Tests
cd backend
npm test


Tests include:

✅ Register user

✅ Login user

✅ Get sweets

✅ Add/Update/Delete sweets

Test coverage is displayed after each run.

🌐 API Endpoints
Method	Endpoint	Description	Auth
POST	/api/auth/register	Register new user	❌
POST	/api/auth/login	Login user	❌
GET	/api/sweets	Get all sweets	✅
POST	/api/sweets	Add new sweet	✅ (Admin)
PUT	/api/sweets/:id	Update sweet	✅ (Admin)
POST	/api/sweets/:id/purchase	Purchase sweet	✅
POST	/api/sweets/:id/restock	Restock sweet	✅ (Admin)
DELETE	/api/sweets/:id	Delete sweet	✅ (Admin)
🎨 Functionality
👤 User Features

Register / Login

View available sweets

Search and filter sweets

Add to cart / Purchase sweets

See order summary & total

🧑‍💼 Admin Features

Add, update, delete sweets

Restock inventory

Monitor all sweets in dashboard

🎨 Design

Built with Tailwind CSS

Fully responsive (mobile, tablet, desktop)

Modern and minimal UI inspired by Indian Sweet Shops 🍬

🖼 Screenshots (optional)

Add your screenshots here later when the frontend is fully complete:

/frontend/src/assets/screenshots/


Example placeholders:

🏠 Homepage

🔑 Login/Register

📊 Admin Dashboard

🧾 Cart Summary

🚀 Future Enhancements

⚙️ Setup Instructions
🗄 Backend Setup
cd backend
npm install


Create a .env file:

PORT=5000
DATABASE_URL=postgresql://<your_neon_db_connection_string>
JWT_SECRET=supersecretkey


Run the backend server:

npm run dev


Server will start at:
➡️ http://localhost:5000

💅 Frontend Setup
cd frontend
npm install
npm run dev


The frontend will start at:
➡️ http://localhost:5173

🧠 Backend Development

Database: PostgreSQL with Neon Cloud instance.

Authentication: JWT tokens & bcrypt for password hashing.

CRUD Operations: Implemented for managing sweets.

Error Handling: Proper 404/500 response handling.

Security: CORS, dotenv for environment management.

🪄 Frontend Development

Framework: React + Vite + Tailwind CSS

Routing: React Router DOM

State Handling: React hooks (useState, useEffect)

API Integration: Axios-based communication with backend

Responsive UI: Modern design with Tailwind utility classes

💡 Key Features

User Registration & Login forms

Dashboard with all sweets

Search and Filter sweets by category

Add to Cart and Order Summary

Purchase and Payment simulation

Admin Panel for Add/Update/Delete sweets

🧪 Testing (TDD)

Jest & Supertest used for backend testing.

Run Tests
cd backend
npm test


Tests include:

✅ Register user

✅ Login user

✅ Get sweets

✅ Add/Update/Delete sweets

Test coverage is displayed after each run.

🌐 API Endpoints
Method	Endpoint	Description	Auth
POST	/api/auth/register	Register new user	✅
POST	/api/auth/login	Login user	✅
GET	/api/sweets	Get all sweets	✅
POST	/api/sweets	Add new sweet	✅ (Admin)
PUT	/api/sweets/:id	Update sweet	✅ (Admin)
POST	/api/sweets/:id/purchase	Purchase sweet	✅
POST	/api/sweets/:id/restock	Restock sweet	✅ (Admin)
DELETE	/api/sweets/:id	Delete sweet	✅ (Admin)
🎨 Functionality
👤 User Features

Register / Login

View available sweets

Search and filter sweets

Add to cart / Purchase sweets

See order summary & total

**🧑‍💼 Admin Features**

Add, update, delete sweets

Restock inventory

Monitor all sweets in dashboard

**🎨 Design**

Built with Tailwind CSS

Fully responsive (mobile, tablet, desktop)

Modern and minimal UI inspired by Indian Sweet Shops 🍬


Example placeholders:

🏠 Homepage

🔑 Login/Register

📊 Admin Dashboard

🧾 Cart Summary

**🚀 Future Enhancements**

Razorpay or Stripe Payment Integration

Order History & Invoice Generation

Image Upload via Cloudinary

Dark Mode

Analytics Dashboard for Admin

👨‍💻 Author

Order History & Invoice Generation

Image Upload via Cloudinary

Dark Mode

Analytics Dashboard for Admin

👨‍💻 Author
Suraj Singh
