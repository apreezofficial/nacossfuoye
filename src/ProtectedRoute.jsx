// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children }) {
   if (!user) {
      // If no user, redirect to login
      return <Navigate to="/memos" replace />;
   }
   return children;
}

export default ProtectedRoute;
