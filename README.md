Incrafto EduTech Platform
A full-stack EduTech web application developed collaboratively during an internship.
The platform provides separate functionalities for students and teachers, including authentication, dashboards, course management, and learning-related features.

Features
Student and teacher authentication

Role-based access and protected routes

Student dashboard

Teacher dashboard

Course management

Learning content management

User profile management

Progress tracking

Responsive user interface

Frontend-backend API integration

Tech Stack
Frontend
TypeScript

React

Tailwind CSS

Framer Motion

Lucide React

Backend
Node.js

Express.js

REST APIs

JWT Authentication

bcrypt

Database
MongoDB

Mongoose

MongoDB Atlas

Tools
Git

GitHub

Postman

VS Code

Project Structure
Incrafto_website/
│
├── frontend/
│   └── Frontend application
│
├── backend/
│   └── Backend APIs and server
│
├── .gitignore
└── README.md
Getting Started
1. Clone the repository
git clone https://github.com/Anmol-kiet/Incrafto_website.git
cd Incrafto_website
2. Setup Frontend
cd frontend
npm install
npm run dev
3. Setup Backend
Open a new terminal:

cd backend
npm install
npm run dev
Environment Variables
Create a .env file inside the backend directory and configure the required environment variables.

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Do not commit .env files or sensitive credentials to the repository.

Development
The project follows a client-server architecture where the frontend communicates with the backend through REST APIs.

User
  │
  ▼
Frontend
  │
  │ REST API
  ▼
Backend
  │
  ▼
MongoDB
