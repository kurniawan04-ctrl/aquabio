-- Migration: Create Admin Account
-- This migration creates a default admin account
-- Note: You need to manually create the user in Supabase Auth first, then run this migration

-- Function to create admin account
-- Usage: After creating a user in Supabase Auth, update their profile to be admin
-- Example SQL (run in Supabase SQL Editor):
-- UPDATE profiles SET is_admin = TRUE WHERE username = 'admin' OR email = 'admin@example.com';

-- Or create admin directly if user exists:
-- UPDATE profiles 
-- SET is_admin = TRUE 
-- WHERE id IN (
--   SELECT id FROM auth.users WHERE email = 'admin@example.com'
-- );

-- To create a new admin user:
-- 1. Register normally through the app with email and password
-- 2. Then run this SQL to make them admin:
-- UPDATE profiles SET is_admin = TRUE WHERE username = 'your_username';

-- For testing, you can also manually insert (not recommended for production):
-- INSERT INTO profiles (id, username, email, full_name, is_admin)
-- VALUES (
--   '00000000-0000-0000-0000-000000000000', -- Replace with actual user ID from auth.users
--   'admin',
--   'admin@example.com',
--   'Administrator',
--   TRUE
-- )
-- ON CONFLICT (id) DO UPDATE SET is_admin = TRUE;

-- This migration file serves as documentation
-- The actual admin creation should be done through Supabase Dashboard or SQL Editor

