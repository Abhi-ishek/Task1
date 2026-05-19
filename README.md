# Task Management System

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) for managing projects, tasks, and teams with role-based access control.

## 🚀 Features

### Authentication & Authorization
* **Role-Based Access Control:** Two primary roles - `Admin` and `Member`.
* **Secure Authentication:** JSON Web Token (JWT) based authentication and Bcrypt password hashing.
* Admin can register new team members.

### Project Management
* Admins can create new projects and assign team members.
* Users can view projects they manage or are a part of.

### Task Management
* Admins can create, edit, and delete tasks.
* Tasks can be assigned to specific team members and linked to projects.
* Members can update the status of their assigned tasks (`todo`, `in-progress`, `completed`).
* Priority levels (`low`, `medium`, `high`) and due dates for tasks.

### Dashboard & Analytics
* Comprehensive dashboard statistics showing total tasks, completed, pending, in-progress, and overdue tasks.

## 💻 Tech Stack

**Frontend:**
* React 19
* Vite
* Tailwind CSS 4
* React Router DOM
* Axios
* React Hot Toast (Notifications)

**Backend:**
* Node.js & Express.js
* MongoDB with Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* express-validator

## 🛠️ Installation & Setup

### Prerequisites
* Node.js installed on your machine
* MongoDB instance (local or Atlas)

### 1. Clone the repository
```bash
git clone <repository-url>
cd Task1
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
```
Start the frontend development server:
```bash
npm run dev
```
<<<<<<< HEAD

## 🔌 API Endpoints Reference

### Auth Routes (`/api/auth`)
* `POST /register` - Register a new admin
* `POST /login` - Login user
* `POST /admin/register-member` - Register a new member (Admin only)

### User Routes (`/api/users`)
* `GET /profile` - Get logged-in user profile
* `GET /admin` - Admin welcome route (Admin only)
* `GET /members` - Get all members (Admin only)

### Project Routes (`/api/projects`)
* `POST /` - Create a project (Admin only)
* `GET /` - Get all projects for logged-in user
* `GET /:id` - Get a single project by ID

### Task Routes (`/api/tasks`)
* `POST /` - Create a task (Admin only)
* `GET /` - Get tasks for logged-in user
* `PUT /:id` - Update a task (Admin only)
* `DELETE /:id` - Delete a task (Admin only)
* `PUT /:id/status` - Update task status
* `GET /dashboard/stats` - Get task statistics
=======
>>>>>>> bc0088d3891a93840f5b7de8f9fe1d2f48331630
