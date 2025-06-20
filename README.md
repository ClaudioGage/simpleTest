# MiCuento TO-DO List Application

A full-stack task management application built with **NestJS** (backend) and **React + Vite** (frontend) using **MySQL** database.

## 📋 Features

- ✅ Create, read, update, and delete tasks
- ✅ Task prioritization (1-5 scale)
- ✅ Automatic overdue detection
- ✅ Filter tasks by status (All, Pending, Overdue)
- ✅ Material-UI responsive design
- ✅ Visual indicators for overdue tasks

## 🛠️ Tech Stack

**Backend:**
- NestJS
- TypeORM
- MySQL
- Class Validator

**Frontend:**
- React 19
- Vite
- Material-UI (MUI)
- Axios
- Day.js

## 📦 Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MySQL** (v5.7 or higher) - [Download here](https://dev.mysql.com/downloads/)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd micuento-todo
```

### 2. MySQL Database Setup

#### Install MySQL (if not already installed)

**macOS (using Homebrew):**
```bash
brew install mysql
brew services start mysql
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

**Windows:**
Download and install from [MySQL official website](https://dev.mysql.com/downloads/installer/)

#### Create Database

```bash
# Connect to MySQL
mysql -u root -p

# Create database (run this in MySQL command line)
CREATE DATABASE micuento_todo;

# Exit MySQL
exit;
```

#### Verify MySQL is Running

```bash
# Check if MySQL is running on port 3306
lsof -i :3306

# Or check MySQL processes
ps aux | grep mysql
```

### 3. Backend Setup (NestJS)

#### Navigate to Backend Directory
```bash
cd backend  # or wherever your NestJS project is located
```

#### Install Dependencies
```bash
npm install

# Install additional required dependencies
npm install @nestjs/typeorm typeorm mysql2 class-validator class-transformer
```

#### Environment Configuration
Create a `.env` file in the backend root:

```bash
# Create .env file
touch .env
```

Add the following content to `.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=micuento_todo
NODE_ENV=development
```

**Note:** Replace `your_mysql_password` with your actual MySQL password, or leave empty if no password is set.

#### Start Backend Server
```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The backend will run on **http://localhost:3000**

#### Verify Backend is Working
```bash
# Test the API endpoint
curl http://localhost:3000/task

# Or visit in browser
open http://localhost:3000
```

### 4. Frontend Setup (React + Vite)

#### Navigate to Frontend Directory
```bash
cd frontend  # or wherever your React project is located
```

#### Install Dependencies
```bash
npm install

```

#### Configuration
Verify that `src/services/taskService.js` has the correct API URL:
```javascript
const API_BASE_URL = 'http://localhost:3000';
```

#### Start Frontend Development Server
```bash
npm run dev
```

The frontend will run on **http://localhost:3007**

## 🎯 Usage

1. **Open your browser** and navigate to **http://localhost:3007**
2. **Add new tasks** using the "Add New Task" button
3. **Filter tasks** using the dropdown (All, Pending, Overdue)
4. **Edit tasks** by clicking the edit icon
5. **Delete tasks** by clicking the delete icon

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/task`  | Get all tasks (supports `?type=pending\|overdue`) |
| POST   | `/task`  | Create a new task |
| GET    | `/task/:id` | Get task by ID |
| PUT    | `/task/:id` | Update task by ID |
| DELETE | `/task/:id` | Delete task by ID |

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm run test
```

### Manual API Testing
```bash
# Create a task
curl -X POST http://localhost:3000/task \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Task","dueDate":"2025-12-31","priority":3}'

# Get all tasks
curl http://localhost:3000/task

# Get pending tasks
curl http://localhost:3000/task?type=pending

# Get overdue tasks
curl http://localhost:3000/task?type=overdue
```

## 📁 Project Structure

```
micuento-todo/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── task/           # Task module
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── ...
│   ├── package.json
│   └── .env
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   ├── App.jsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of the MiCuento technical test.
