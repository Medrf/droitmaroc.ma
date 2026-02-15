-- 1. User Plans Table
CREATE TABLE IF NOT EXISTS public.user_plans (
    user_id text PRIMARY KEY, -- Matches Clerk ID
    plan text DEFAULT 'free', -- free | starter | pro
    is_active boolean DEFAULT true,
    current_period_end timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. Daily Credits Table
CREATE TABLE IF NOT EXISTS public.daily_credits (
    user_id text PRIMARY KEY,
    credits_remaining int NOT NULL,
    credits_daily_limit int NOT NULL DEFAULT 7,
    reset_at timestamptz NOT NULL, -- UTC Midnight
    timezone text DEFAULT 'UTC',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 3. Usage Logs Table
CREATE TABLE IF NOT EXISTS public.usage_logs (
    id bigserial PRIMARY KEY,
    user_id text NOT NULL,
    feature text NOT NULL, -- ai_answer | contract_gen | contract_audit
    credits_spent int NOT NULL,
    status text NOT NULL, -- success | blocked | error
    created_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON public.usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_created_at ON public.usage_logs(created_at);

-- Row Level Security (RLS)
-- We enable RLS but standard users don't need direct access since logic is server-side via Service Role.
ALTER TABLE public.user_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own data (optional, useful for frontend display)
CREATE POLICY "Users can read own plans" ON public.user_plans FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can read own credits" ON public.daily_credits FOR SELECT USING (auth.uid()::text = user_id);
