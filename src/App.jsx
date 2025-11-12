// *React imports
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import supabase from './services/supabaseClient';
import Logout from './components/Logout';

// * Pages
import Memos from './pages/Memos';
import ViewMemo from './pages/ViewMemo';
import AdminLogin from './pages/AdminLogin';
import CreateNewMemo from './pages/CreateNewMemo';
import AdminDashBoard from './pages/AdminDashBoard';
import EditMemo from './pages/EditMemo';

import Loading from './components/Loading';

function App() {
   const [user, setUser] = useState();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function checkSession() {
         const { data } = await supabase.auth.getSession();
         setUser(data.session?.user ?? null);
         setLoading(false);
      }
      checkSession();

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
         setUser(session?.user ?? null);
      });

      return () => listener.subscription.unsubscribe();
   }, []);

   if (loading) return <Loading />;

   return (
      <Routes>
         <Route path='/' element={<Memos />} />

         <Route path='/:reference' element={<ViewMemo />} />

         <Route path="/admin" element={
            <>
               <Logout />
               <AdminLogin />
            </>
         } />
         <Route path='/admin/create' element={
            <ProtectedRoute user={user}>
               <>
                  <Logout />
                  <CreateNewMemo />
               </>
            </ProtectedRoute>
         } />
         <Route path='/admin/dashboard' element={
            <ProtectedRoute user={user}>
               <>
                  <Logout />
                  <AdminDashBoard />
               </>
            </ProtectedRoute>
         } />

         <Route path='/admin/edit/:reference' element={
            <ProtectedRoute user={user}>
               <>
                  <Logout />
                  <EditMemo />
               </>
            </ProtectedRoute>
         } />
      </Routes>
   )
}

export default App