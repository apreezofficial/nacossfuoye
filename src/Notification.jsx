import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function Notification({ message, type = 'success', duration = 3000 }) {
   const [isVisible, setIsVisible] = useState(true);

   useEffect(() => {
      const timer = setTimeout(() => {
         setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer); // Cleanup on unmount
   }, [duration]);

   if (!isVisible) return null;

   return createPortal(
      <div
         className={`notification notification--${type}`}
         role="alert"
         aria-live="assertive"
      >
         {message}
      </div>,
      document.body // Append to body using Portal
   );
}

export default Notification;