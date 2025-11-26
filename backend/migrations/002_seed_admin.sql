-- BloodLink Local - Seed Admin User
-- Creates a default admin account for initial setup

-- Check if admin already exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@bloodlink.local') THEN
        -- Insert admin user
        -- Password: admin123 (bcrypt hash)
        -- IMPORTANT: Change this password after first login!
        INSERT INTO users (name, email, password_hash, phone, role, blood_type, user_type)
        VALUES (
            'System Administrator',
            'admin@bloodlink.local',
            '$2b$10$rQZ3qP.kK4.HxK8tJ0YQCOXx5z5F5xYgLxQW5XQz5QZ3qP.kK4.Hx',
            '+1 (555) 999-9999',
            'admin',
            'O+',
            NULL
        );
        
        RAISE NOTICE 'Admin user created successfully!';
        RAISE NOTICE 'Email: admin@bloodlink.local';
        RAISE NOTICE 'Password: admin123';
        RAISE NOTICE 'IMPORTANT: Change this password immediately after first login!';
    ELSE
        RAISE NOTICE 'Admin user already exists. Skipping...';
    END IF;
END $$;

-- Create some test users for development (optional - comment out for production)
DO $$
BEGIN
    -- Test donor
    IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'donor@test.local') THEN
        INSERT INTO users (name, email, password_hash, phone, role, blood_type, user_type)
        VALUES (
            'Test Donor',
            'donor@test.local',
            '$2b$10$rQZ3qP.kK4.HxK8tJ0YQCOXx5z5F5xYgLxQW5XQz5QZ3qP.kK4.Hx',
            '+1 (555) 111-1111',
            'user',
            'A+',
            'donor'
        );
        RAISE NOTICE 'Test donor created: donor@test.local / admin123';
    END IF;
    
    -- Test recipient
    IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'recipient@test.local') THEN
        INSERT INTO users (name, email, password_hash, phone, role, blood_type, user_type)
        VALUES (
            'Test Recipient',
            'recipient@test.local',
            '$2b$10$rQZ3qP.kK4.HxK8tJ0YQCOXx5z5F5xYgLxQW5XQz5QZ3qP.kK4.Hx',
            '+1 (555) 222-2222',
            'user',
            'B+',
            'recipient'
        );
        RAISE NOTICE 'Test recipient created: recipient@test.local / admin123';
    END IF;
END $$;
