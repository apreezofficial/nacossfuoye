import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import LogoutBtn from './LogoutBtn';

export default async function ProtectedLayout({ children }) {
   const supabase = await createClient();
   const { data: { session }, error } = await supabase.auth.getSession();

   if (error || !session) {
      redirect('/admin');
   }

   return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
         <LogoutBtn />
         {children}
      </main>
   );
}
