-- Migration: Create Default Admin Account
-- This migration sets up a default admin account
-- IMPORTANT: You must create the user in Supabase Auth FIRST, then run this migration

-- Step 1: Create user in Supabase Auth Dashboard
-- Go to: Supabase Dashboard → Authentication → Users → Add User
-- Email: admin@aquabio.com
-- Password: AdminAquabio123!
-- Auto Confirm User: YES (checked)
-- Then click "Create User"

-- Step 2: After user is created, get the user ID
-- Go to: Supabase Dashboard → Authentication → Users
-- Find the user with email: admin@aquabio.com
-- Copy the UUID (User ID)

-- Step 3: Run this SQL to create the admin profile
-- Replace 'USER_ID_HERE' with the actual UUID from Step 2

-- Option A: If user already exists in auth.users, create/update profile
INSERT INTO public.profiles (id, username, email, full_name, is_admin)
VALUES (
  'USER_ID_HERE', -- Replace with actual UUID from Supabase Auth
  'admin',
  'admin@aquabio.com',
  'Administrator',
  TRUE
)
ON CONFLICT (id) 
DO UPDATE SET 
  is_admin = TRUE,
  username = 'admin',
  email = 'admin@aquabio.com',
  full_name = 'Administrator';

-- Option B: If you want to set admin for existing user by email
-- UPDATE profiles 
-- SET is_admin = TRUE 
-- WHERE email = 'admin@aquabio.com';

-- Option C: If you want to set admin for existing user by username
-- UPDATE profiles 
-- SET is_admin = TRUE 
-- WHERE username = 'admin';

-- Verification: Check if admin was created successfully
-- SELECT id, username, email, full_name, is_admin 
-- FROM profiles 
-- WHERE email = 'admin@aquabio.com' OR username = 'admin';

