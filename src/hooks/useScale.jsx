import { useLayoutEffect } from "react";

function useScale({ letterHeadRef, previewRef, baseWidth = 794, dependency = [] }) {
   useLayoutEffect(() => {
      function scalePaper() {
         const paper = letterHeadRef.current;
         const wrapper = previewRef.current;
         if (!paper || !wrapper) return;

         if (paper.dataset.scalingPaused === 'true') return;

         // Get exact float width rather than rounded integer offsetWidth to prevent clipping on right/bottom
         const exactWidth = wrapper.getBoundingClientRect().width;
         const scale = exactWidth / baseWidth;

         paper.style.transform = `scale(${scale})`;
         paper.style.transformOrigin = "top left";
         
         // Explicitly set the wrapper height so the container shrinks to fit the scaled paper
         wrapper.style.height = `${paper.offsetHeight * scale}px`;
      }

      const wrapper = previewRef.current;
      let resizeObserver;
      let mutationObserver;

      if (wrapper) {
         // Use ResizeObserver for real-time tracking of container width changes
         resizeObserver = new ResizeObserver(() => scalePaper());
         resizeObserver.observe(wrapper);
      }

      const paper = letterHeadRef.current;
      if (paper) {
         mutationObserver = new MutationObserver(() => scalePaper());
         mutationObserver.observe(paper, { childList: true, subtree: true, characterData: true, attributes: true });
      }

      window.addEventListener("load", scalePaper);
      // Wait for fonts/layout to settle
      setTimeout(scalePaper, 100);
      scalePaper();

      return () => {
         if (resizeObserver && wrapper) {
            resizeObserver.unobserve(wrapper);
         }
         resizeObserver?.disconnect();
         mutationObserver?.disconnect();
         window.removeEventListener("load", scalePaper);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, dependency);
}

export default useScale;