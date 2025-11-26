# BloodLink Local

> A local-first blood donation management platform running 100% on your Windows 11 machine.

BloodLink Local is a comprehensive medical-grade platform for managing blood donations, connecting donors with recipients, and maintaining inventory—all without requiring cloud services.

## 🎯 Mission

Help save lives by connecting blood donors with recipients and providing efficient inventory management for healthcare facilities—all while keeping your data private and local.

## ✨ Features

- **🩸 Donor Management**: Register donors, track donation history, schedule appointments
- **❤️ Recipient Requests**: Submit and track blood requests with real-time status updates
- **🏥 Admin Dashboard**: Comprehensive inventory management and request approval system
- **🔐 Secure Authentication**: Local authentication with bcrypt password hashing and JWT/sessions
- **📊 Real-time Inventory**: Track blood units by type with automated stock alerts
- **🎨 Medical-Modern Design**: Clean, clinical UI inspired by healthcare best practices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ LTS
- PostgreSQL 14+ (or Docker Desktop)
- pnpm/yarn/npm

### Option 1: Local Setup (Windows 11)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd bloodlink-local
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   npm install

   # Backend
   cd backend
   npm install
   ```

3. **Set up PostgreSQL database**
   ```bash
   # Install PostgreSQL if not already installed
   # Via Chocolatey:
   choco install postgresql

   # Via Scoop:
   scoop install postgresql

   # Create database
   psql -U postgres
   CREATE DATABASE bloodlink_local;
   ```

4. **Run migrations**
   ```bash
   cd backend
   psql -U postgres -d bloodlink_local -f migrations/001_initial_schema.sql
   psql -U postgres -d bloodlink_local -f migrations/002_seed_admin.sql
   ```

5. **Configure environment**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your settings
   ```

6. **Start the application**
   ```bash
   # Terminal 1 - Frontend
   npm run dev

   # Terminal 2 - Backend
   cd backend
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3001
   - Admin login: `admin@bloodlink.local` / `admin123` (change immediately!)

### Option 2: Docker Compose (Recommended) ⭐

**The easiest way to run BloodLink Local - everything in one command!**

1. **Install Docker Desktop** for Windows from https://www.docker.com/products/docker-desktop/

2. **Start the entire application** (Frontend + Backend + Database + pgAdmin)
   ```bash
   docker-compose up -d
   ```

   This single command will:
   - Build and start the React frontend (port 8080)
   - Build and start the Node.js backend (port 3001)
   - Start PostgreSQL database (port 5432)
   - Start pgAdmin for database management (port 5050)
   - Run all database migrations automatically

3. **Access the application**
   - **Frontend**: http://localhost:8080 (Main application)
   - **Backend API**: http://localhost:3001 (REST API)
   - **pgAdmin**: http://localhost:5050 (Database management UI)
     - Email: `admin@bloodlink.local`
     - Password: `admin`

4. **View logs** (optional)
   ```bash
   # All services
   docker-compose logs -f

   # Specific service
   docker-compose logs -f frontend
   docker-compose logs -f backend
   docker-compose logs -f postgres
   ```

5. **Stop services**
   ```bash
   docker-compose down
   ```

6. **Stop and remove all data** (including database)
   ```bash
   docker-compose down -v
   ```

**First Time Setup:**
- Default admin credentials are seeded automatically
- Login at http://localhost:8080/admin/login
- Email: `admin@bloodlink.local`
- Password: `admin123`
- **⚠️ IMPORTANT: Change the admin password immediately after first login!**

## 📁 Project Structure

```
bloodlink-local/
├── src/                    # Frontend React app
│   ├── pages/             # Page components
│   │   ├── Landing.tsx
│   │   ├── Register.tsx
│   │   ├── Login.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── DonorDashboard.tsx
│   │   ├── RecipientDashboard.tsx
│   │   └── AdminDashboard.tsx
│   ├── components/        # Reusable components (shadcn/ui)
│   └── index.css          # Design system
│
├── backend/               # Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── services/
│   ├── migrations/        # SQL migrations
│   └── .env.example
│
├── docker-compose.yml     # Docker setup
└── README.md
```

## 🗄️ Database Schema

### Tables

**users**
- Stores all users (donors, recipients, admins)
- Fields: id, name, email, password_hash, phone, role, blood_type, user_type

**blood_inventory**
- Tracks blood units by type
- Fields: id, blood_type, units_available, last_updated

**donation_requests**
- Recipient requests for blood
- Fields: id, user_id, blood_type, units_requested, status, notes, created_at

**donations**
- Scheduled/completed donations
- Fields: id, user_id, scheduled_date, location, units, status

See `backend/migrations/001_initial_schema.sql` for full schema.

## 🎨 Design System

BloodLink Local follows medical-modern design principles:

- **Colors**: Medical red (#C62828), white, soft gray (#F5F5F5)
- **Typography**: Cabinet Grotesk (headings), Plus Jakarta Sans (body)
- **Spacing**: 8pt grid system
- **Components**: Soft shadows, rounded corners, clinical feel
- **Accessibility**: AA contrast compliance, semantic HTML

## 🔐 Security

- **Password Hashing**: bcrypt with 10+ rounds
- **Authentication**: JWT tokens or secure sessions
- **Authorization**: Role-based access control (user/admin)
- **Input Validation**: Zod schemas on frontend and backend
- **SQL Injection Protection**: Parameterized queries
- **CORS**: Configured for local development

**Important**: Change default admin password immediately after first login!

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- TypeScript
- TailwindCSS
- shadcn/ui components
- React Router v6
- TanStack Query

### Backend
- Node.js + Express/Fastify
- TypeScript
- PostgreSQL
- Prisma or Knex (ORM)
- bcrypt (password hashing)
- jsonwebtoken (JWT) or express-session

### DevOps
- Docker & Docker Compose
- pgAdmin (database management)

## 📖 API Documentation

### Authentication Endpoints

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/admin/login
POST /api/auth/logout
GET  /api/auth/me
```

### User Endpoints (Admin)

```
GET /api/users
GET /api/users/:id
```

### Blood Inventory (Admin)

```
GET /api/inventory
PUT /api/inventory/:bloodType
```

### Donation Requests

```
GET  /api/requests
POST /api/requests
PUT  /api/requests/:id/approve
PUT  /api/requests/:id/deny
```

### Donations (Donor)

```
GET  /api/donations
POST /api/donations/schedule
```

See `backend/README.md` for detailed API documentation.

## 🐛 Troubleshooting

### Docker Issues

#### Containers won't start
```bash
# Check Docker Desktop is running
docker info

# View container status
docker-compose ps

# View logs for specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
```

#### Port already in use
```bash
# Check what's using the ports
netstat -ano | findstr :8080  # Frontend
netstat -ano | findstr :3001  # Backend
netstat -ano | findstr :5432  # PostgreSQL
netstat -ano | findstr :5050  # pgAdmin

# Kill the process or change ports in docker-compose.yml
```

#### Database connection errors in Docker
- Wait 30 seconds for PostgreSQL to fully initialize on first run
- Check logs: `docker-compose logs postgres`
- Verify migrations ran: `docker-compose logs backend`

#### Rebuilding after code changes
```bash
# Rebuild and restart services
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build frontend
docker-compose up -d --build backend
```

### Local Setup Issues

### PostgreSQL won't start (Local)
```powershell
# Check service status
Get-Service postgresql*

# Start service
Start-Service postgresql-x64-14
```

### Port already in use
```bash
# Frontend (8080)
netstat -ano | findstr :8080

# Backend (3001)
netstat -ano | findstr :3001

# Kill process
taskkill /PID <PID> /F
```

### Database connection errors
- Verify DATABASE_URL in `.env`
- Check PostgreSQL is running
- Ensure database `bloodlink_local` exists

### bcrypt errors on Windows
```bash
npm rebuild bcrypt --build-from-source
```

See `backend/README.md` for more troubleshooting tips.

## 🤝 Contributing

This is a local-first project. Feel free to fork and customize for your needs!

## 📝 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered web development
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Design inspired by modern healthcare systems

## 📞 Support

For issues or questions:
1. Check `backend/README.md` for backend setup
2. Review troubleshooting section above
3. Check PostgreSQL logs: `C:\Program Files\PostgreSQL\14\data\log`

---

**Remember**: This is a LOCAL system. All data stays on your machine. No cloud services required!

**Security Note**: Change default admin credentials immediately after first login.
