-- BloodLink Local - Initial Database Schema
-- PostgreSQL 14+

-- Drop tables if they exist (for clean re-runs)
DROP TABLE IF EXISTS donations CASCADE;
DROP TABLE IF EXISTS donation_requests CASCADE;
DROP TABLE IF EXISTS blood_inventory CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table (donors, recipients, admins)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL CHECK (role IN ('user', 'admin')),
    blood_type TEXT CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    user_type TEXT CHECK (user_type IN ('donor', 'recipient')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Blood inventory table
CREATE TABLE blood_inventory (
    id SERIAL PRIMARY KEY,
    blood_type TEXT UNIQUE NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    units_available INTEGER NOT NULL DEFAULT 0 CHECK (units_available >= 0),
    last_updated TIMESTAMP DEFAULT NOW()
);

-- Donation requests table (from recipients)
CREATE TABLE donation_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    blood_type TEXT NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    units_requested INTEGER NOT NULL CHECK (units_requested > 0),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Donations table (scheduled/completed donations from donors)
CREATE TABLE donations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    scheduled_date DATE,
    location TEXT,
    units INTEGER DEFAULT 1,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_donation_requests_status ON donation_requests(status);
CREATE INDEX idx_donation_requests_user_id ON donation_requests(user_id);
CREATE INDEX idx_donations_user_id ON donations(user_id);

-- Initialize blood inventory with all blood types
INSERT INTO blood_inventory (blood_type, units_available) VALUES
('A+', 50),
('A-', 25),
('B+', 40),
('B-', 18),
('AB+', 15),
('AB-', 10),
('O+', 70),
('O-', 35);

-- Update trigger for blood_inventory last_updated
CREATE OR REPLACE FUNCTION update_inventory_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_inventory_timestamp
BEFORE UPDATE ON blood_inventory
FOR EACH ROW
EXECUTE FUNCTION update_inventory_timestamp();

-- Update trigger for donation_requests updated_at
CREATE OR REPLACE FUNCTION update_request_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_request_timestamp
BEFORE UPDATE ON donation_requests
FOR EACH ROW
EXECUTE FUNCTION update_request_timestamp();

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'BloodLink Local schema created successfully!';
    RAISE NOTICE 'Tables: users, blood_inventory, donation_requests, donations';
END $$;
