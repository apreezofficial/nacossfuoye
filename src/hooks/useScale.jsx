import { useEffect } from "react"

function useScale({ letterHeadRef, previewRef, dependency = [] }) {
   useEffect(() => {
      function scalePaper() {
         const paper = letterHeadRef.current;
         const wrapper = previewRef.current;
         if (!paper || !wrapper) return;
         const baseWidth = 794;
         const baseHeight = 1123;
         const scale = wrapper.offsetWidth / (baseWidth + 100);
         paper.style.transform = `scale(${scale})`;
      }
      window.addEventListener("resize", scalePaper);
      window.addEventListener("load", scalePaper);

      scalePaper();

      return () => {
         window.removeEventListener("resize", scalePaper);
         window.removeEventListener("load", scalePaper);
      };
   }, dependency);
}

export default useScale;