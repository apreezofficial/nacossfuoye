import { useEffect } from "react"

function useTimer(state) {

   useEffect(() => {
      function timer() {
         setTimeout(() => {
            { state } (false);
         }, 2000);
      }
      timer();
      return () => clearTimeout(timer); // Cleanup on unmount
   }, [state]);
}

export default useTimer