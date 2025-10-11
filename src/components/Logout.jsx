import supabase from "../services/supabaseClient";
import { Navigate } from "react-router-dom";
import { LogOut } from 'lucide-react'

const Logout = () => {

   const handleLogout = async () => {
      await supabase.auth.signOut();
      return <Navigate to="/admin" replace />;
   }

   return (
      <div className="logout-container" onClick={handleLogout}>
         <LogOut />
      </div>
   )
}

export default Logout