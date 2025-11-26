# BloodLink Local - Backend Setup

This directory contains the local Node.js backend for BloodLink Local.

## Prerequisites

- Node.js 18+ (LTS recommended)
- PostgreSQL 14+ installed locally or via Docker
- pnpm, yarn, or npm

## Database Setup

### Option 1: Local PostgreSQL (Windows 11)

1. **Install PostgreSQL:**
   - Download from: https://www.postgresql.org/download/windows/
   - Or use Chocolatey: `choco install postgresql`
   - Or use Scoop: `scoop install postgresql`

2. **Create Database:**
   ```bash
   # Start PostgreSQL service (if not auto-started)
   # In PowerShell as Administrator:
   Start-Service postgresql-x64-14

   # Connect to PostgreSQL
   psql -U postgres

   # Create database
   CREATE DATABASE bloodlink_local;
   
   # Create user (optional)
   CREATE USER bloodlink_user WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE bloodlink_local TO bloodlink_user;
   ```

3. **Run Migrations:**
   ```bash
   cd backend
   psql -U postgres -d bloodlink_local -f migrations/001_initial_schema.sql
   psql -U postgres -d bloodlink_local -f migrations/002_seed_admin.sql
   ```

### Option 2: Docker Compose (Recommended)

1. **Install Docker Desktop for Windows:**
   - Download from: https://www.docker.com/products/docker-desktop/

2. **Start Services:**
   ```bash
   # From project root
   docker-compose up -d
   ```

   This will start:
   - PostgreSQL database on port 5432
   - pgAdmin web interface on http://localhost:5050
   - Auto-run migrations on startup

3. **Access pgAdmin:**
   - URL: http://localhost:5050
   - Email: admin@bloodlink.local
   - Password: admin

## Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database
DATABASE_URL=postgresql://bloodlink_user:your_secure_password@localhost:5432/bloodlink_local

# Auth
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
SESSION_SECRET=your-super-secret-session-key-change-this-too

# Server
PORT=3001
NODE_ENV=development

# CORS (frontend URL)
FRONTEND_URL=http://localhost:8080
```

## Installation & Running

### Using npm:
```bash
cd backend
npm install
npm run dev
```

### Using pnpm (recommended):
```bash
cd backend
pnpm install
pnpm dev
```

### Using yarn:
```bash
cd backend
yarn install
yarn dev
```

The backend will start on http://localhost:3001

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (donor/recipient)
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login (separate endpoint)
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user info

### Users (Admin only)
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user details

### Blood Inventory (Admin only)
- `GET /api/inventory` - Get blood inventory
- `PUT /api/inventory/:bloodType` - Update inventory units

### Donation Requests
- `GET /api/requests` - List requests (filtered by role)
- `POST /api/requests` - Create new blood request
- `PUT /api/requests/:id/approve` - Approve request (Admin only)
- `PUT /api/requests/:id/deny` - Deny request (Admin only)

### Donations (Donor only)
- `GET /api/donations` - Get donation history
- `POST /api/donations/schedule` - Schedule a donation

## Database Schema

See `migrations/001_initial_schema.sql` for the complete schema.

### Tables:
- `users` - All users (donors, recipients, admins)
- `blood_inventory` - Blood units by type
- `donation_requests` - Recipient requests for blood
- `donations` - Scheduled/completed donations

## Creating an Admin User

After running migrations, create your first admin:

```sql
-- Connect to database
psql -U postgres -d bloodlink_local

-- Create admin user (password: admin123 - CHANGE THIS!)
INSERT INTO users (name, email, password_hash, phone, role, blood_type)
VALUES (
  'Admin User',
  'admin@bloodlink.local',
  '$2b$10$rQZ3qP.kK4.HxK8tJ0YQCOXx5z5F5xYgLxQW5XQz5QZ3qP.kK4.Hx', -- bcrypt hash of 'admin123'
  '+1 (555) 999-9999',
  'admin',
  'O+'
);
```

Or run: `psql -U postgres -d bloodlink_local -f migrations/002_seed_admin.sql`

**Important:** Change the default admin password immediately after first login!

## Technology Stack

- **Runtime:** Node.js + Express (or Fastify)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma (recommended) or Knex
- **Auth:** bcrypt + JWT or express-session
- **Validation:** Zod
- **CORS:** cors middleware

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Auth, validation, etc.
│   ├── models/          # Database models (Prisma/Knex)
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Helpers (bcrypt, jwt, etc.)
│   └── server.ts        # Entry point
├── migrations/          # SQL migrations
├── prisma/              # Prisma schema (if using Prisma)
├── .env.example         # Example environment variables
└── package.json
```

## Development Tips

### Windows-specific Notes:
1. **Path Issues:** Use forward slashes `/` in imports, not backslashes
2. **Permission Errors:** Run PowerShell/CMD as Administrator if needed
3. **PostgreSQL Service:** Ensure service is running: `Get-Service postgresql*`
4. **Port Conflicts:** Check if ports 3001 (backend) or 5432 (PostgreSQL) are in use

### Testing the Backend:
```bash
# Using curl (Git Bash or WSL on Windows)
curl http://localhost:3001/api/auth/me

# Using PowerShell
Invoke-WebRequest -Uri http://localhost:3001/api/auth/me

# Or use Postman / Insomnia
```

## Docker Compose (Full Setup)

See `docker-compose.yml` in project root. This includes:
- PostgreSQL database
- pgAdmin interface
- Optional: Backend container (Node.js)

To run everything with Docker:
```bash
docker-compose up -d
```

## Troubleshooting

### "Connection refused" to PostgreSQL:
- Ensure PostgreSQL is running: `Get-Service postgresql*`
- Check DATABASE_URL in `.env`
- Verify port 5432 is not blocked by firewall

### "bcrypt" module errors on Windows:
```bash
npm rebuild bcrypt --build-from-source
```

### JWT tokens not working:
- Ensure JWT_SECRET is set in `.env`
- Check token expiration settings
- Verify CORS settings allow credentials

### Migrations fail:
- Ensure database exists: `psql -U postgres -l`
- Check user permissions
- Run migrations in order (001, 002, etc.)

## Production Deployment

For production:
1. Use strong JWT_SECRET and SESSION_SECRET
2. Enable HTTPS
3. Set NODE_ENV=production
4. Use connection pooling for database
5. Add rate limiting
6. Enable proper logging (Winston, Pino)
7. Use a reverse proxy (nginx, Caddy)

## License

MIT
