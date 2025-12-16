-- =====================================================
-- VIGILCAP SUPABASE SETUP
-- =====================================================
-- Run this SQL in your Supabase SQL Editor to set up
-- all required tables and policies.
--
-- Go to: Supabase Dashboard → SQL Editor → New query
-- Paste this entire file and click "Run"
-- =====================================================

-- 1. Create the 'leads' table (for Sample Report Downloads)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    source TEXT DEFAULT 'sample_report_download',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create the 'deal_requests' table (for "Get Your Report" Intake Form)
CREATE TABLE IF NOT EXISTS public.deal_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    enterprise_value TEXT,
    timeline TEXT,
    source TEXT DEFAULT 'get_report_form',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable Row Level Security on both tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_requests ENABLE ROW LEVEL SECURITY;

-- 4. Create policies to allow anonymous inserts
-- This allows the website to insert data without authentication

-- Policy for leads table
CREATE POLICY "Allow anonymous inserts on leads" 
ON public.leads 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Policy for deal_requests table
CREATE POLICY "Allow anonymous inserts on deal_requests" 
ON public.deal_requests 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- 5. Create indexes for faster queries (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_deal_requests_created_at ON public.deal_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_deal_requests_email ON public.deal_requests(email);

-- =====================================================
-- DONE! Your database is now ready.
-- 
-- To view your leads: Go to Table Editor → leads
-- To view deal requests: Go to Table Editor → deal_requests
-- =====================================================
