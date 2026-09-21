import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function Notification({ message, type = 'success', duration = 3000 }) {
   const [isVisible, setIsVisible] = useState(true);
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
      const timer = setTimeout(() => {
         setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer); // Cleanup on unmount
   }, [duration]);

   if (!isVisible || !mounted) return null;

   return createPortal(
      <div
         className={`fixed top-5 right-5 px-6 py-4 rounded-xl shadow-lg text-sm font-medium z-[1000] animate-in slide-in-from-right-8 duration-300 ${
            type === 'success' 
               ? 'bg-green-600 text-white shadow-green-600/20' 
               : 'bg-red-600 text-white shadow-red-600/20'
         }`}
         role="alert"
         aria-live="assertive"
      >
         {message}
      </div>,
      document.body // Append to body using Portal
   );
}

export default Notification;