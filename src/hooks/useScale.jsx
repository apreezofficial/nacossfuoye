import { useLayoutEffect } from "react";

function useScale({ letterHeadRef, previewRef, dependency = [] }) {
   useLayoutEffect(() => {
      function scalePaper() {
         const paper = letterHeadRef.current;
         const wrapper = previewRef.current;
         if (!paper || !wrapper) return;

         const baseWidth = 794;
         const scale = wrapper.offsetWidth / baseWidth;

         paper.style.transform = `scale(${scale})`;
         paper.style.transformOrigin = "top left";
      }

      const wrapper = previewRef.current;
      let resizeObserver;

      if (wrapper) {
         // Use ResizeObserver for real-time tracking of container width changes
         resizeObserver = new ResizeObserver(() => scalePaper());
         resizeObserver.observe(wrapper);
      }

      window.addEventListener("load", scalePaper);
      scalePaper();

      return () => {
         if (resizeObserver && wrapper) {
            resizeObserver.unobserve(wrapper);
         }
         resizeObserver?.disconnect();
         window.removeEventListener("load", scalePaper);
      };
   }, dependency);
}

export default useScale;