-- ==========================================
-- NACOSS Memo: Mock Data (Seed File)
-- ==========================================
-- Run this in your Supabase SQL Editor AFTER running 'supabase_schema.sql'
-- This will populate your test database with fake data so you can test the UI!

-- 1. Insert Default Quotes
INSERT INTO public.quotes (id, dyk, invest_friday)
VALUES (
  1, 
  'The first computer bug was an actual real-life moth found inside a Harvard Mark II computer in 1947.', 
  'Investing in your coding skills today compounds faster than any financial asset tomorrow.'
) ON CONFLICT (id) DO UPDATE 
SET dyk = EXCLUDED.dyk, invest_friday = EXCLUDED.invest_friday;

-- 2. Insert Dummy Memos
INSERT INTO public.memo (reference, date, head, content, type, is_published, created_by)
VALUES 
(
  'NACOSS/25/001', 
  '2026-10-01', 
  'WELCOME TO THE NEW SEMESTER', 
  '<p>Dear Computing Students,</p><p>Welcome to a brand new academic session! The executive council has lined up amazing events, hackathons, and tutorials to help you grow your tech skills.</p>', 
  'president', 
  true, 
  'president@nacoss.local'
),
(
  'NACOSS/25/002', 
  '2026-10-03', 
  'SRC SITTING NOTICE', 
  '<p>This is to officially notify all honorable members of the Student Representative Council of the first plenary sitting scheduled for this Friday.</p>', 
  'src', 
  true, 
  'speaker@nacoss.local'
),
(
  'NACOSS/25/003', 
  '2026-10-05', 
  'ELECTION TIMETABLE RELEASED', 
  '<p>The Electoral Committee (ELECOM) is pleased to release the official timetable for the upcoming departmental elections. Ban on campaigns is hereby lifted.</p>', 
  'elecom', 
  true, 
  'chairman@nacoss.local'
),
(
  'NACOSS/25/004', 
  '2026-10-07', 
  'DRAFT: SOFTWARE ENGINEERING WORKSHOP', 
  '<p>We are planning a massive workshop. This memo is still being drafted and is not visible to students yet.</p>', 
  'executive', 
  false, 
  'gensec@nacoss.local'
);

-- 3. Insert Dummy Financial Ledger (Transactions)
INSERT INTO public.transactions (date, description, income, expense, balance, category, created_by)
VALUES 
('2026-10-01', 'Opening Balance', 150000.00, 0, 150000.00, 'Opening', 'finsec@nacoss.local'),
('2026-10-02', 'Student Annual Dues', 45000.00, 0, 195000.00, 'Dues', 'finsec@nacoss.local'),
('2026-10-03', 'Printer Ink & Stationaries', 0, 12500.00, 182500.00, 'Office', 'finsec@nacoss.local'),
('2026-10-05', 'Web Hosting Renewal (Vercel/Domain)', 0, 30000.00, 152500.00, 'Infrastructure', 'finsec@nacoss.local');

-- 4. Insert Dummy Treasurer Records
INSERT INTO public.treasurer_records (date, description, income, expense, balance, category, created_by)
VALUES 
('2026-10-01', 'Bank Account Opening Balance', 500000.00, 0, 500000.00, 'Opening', 'treasurer@nacoss.local'),
('2026-10-04', 'Departmental Grant', 200000.00, 0, 700000.00, 'Grant', 'treasurer@nacoss.local');

-- ==========================================
-- IMPORTANT NOTE FOR CONTRIBUTORS:
-- To test the Admin Dashboard, you must manually create a user in your Supabase Auth,
-- then insert their email into the `user_roles` table with the role 'admin'.
-- ==========================================


-- Game Scores Seed
INSERT INTO public.game_scores (game_slug, gaming_name, level, score)
VALUES
  ('memory-match', 'Shadow', '400L', 980),
  ('memory-match', 'CodeNinja', '300L', 950),
  ('memory-match', 'BugHunter', '200L', 910),
  ('memory-match', 'Alpha', '500L', 880),
  ('memory-match', 'Omega', '100L', 850),
  ('memory-match', 'Neo', '400L', 820),
  ('memory-match', 'Trinity', '300L', 800),
  ('memory-match', 'Morpheus', '500L', 790),
  ('memory-match', 'Smith', 'Alumni', 750),
  ('memory-match', 'Cypher', '200L', 700);
