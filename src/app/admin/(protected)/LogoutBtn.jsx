'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutBtn() {
   const router = useRouter();
   const supabase = createClient();

   const handleLogout = async () => {
      await supabase.auth.signOut();
      router.push('/admin');
      router.refresh();
   };

   return (
      <button
         onClick={handleLogout}
         aria-label="Logout"
         title="Logout"
         className="fixed bottom-8 right-8 p-3 bg-red-600/95 backdrop-blur-md hover:bg-red-600 text-white rounded-full border border-red-400/30 transition-transform duration-300 hover:scale-105 active:scale-95 z-50 flex items-center justify-center"
      >
         <LogOut size={20} />
      </button>
   );
}
