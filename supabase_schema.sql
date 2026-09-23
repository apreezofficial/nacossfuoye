-- Add the `type` column to the `memo` table
ALTER TABLE public.memo
ADD COLUMN IF NOT EXISTS type text DEFAULT 'executive'::text;

-- Create user_roles table for role-based access control (RBAC)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email text NOT NULL UNIQUE,
  role text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Note: In the future, you can join `user_roles` with `auth.users` on email
-- Or use Supabase auth triggers to manage roles.

-- Optional: Insert initial admin roles
-- INSERT INTO public.user_roles (user_email, role) VALUES ('admin@example.com', 'super_admin');
