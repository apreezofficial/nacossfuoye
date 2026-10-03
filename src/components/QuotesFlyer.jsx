import React, { memo } from 'react';

export const QUOTES_CONFIGS = {
   dyk: {
      bgLow: '/quotes/dyk_low.jpg',
      bgHigh: '/quotes/dyk_high.png',
      messageClass: 'absolute top-[1250px] left-1/2 -translate-x-1/2 w-[1750px] text-justify font-raleway font-semibold',
      messageStyle: { fontSize: '51pt', color: '#ffffff', lineHeight: '1.4' }
   },
   invest_friday: {
      bgLow: '/quotes/invest_friday_low.jpg',
      bgHigh: '/quotes/invest_friday_high.png',
      messageClass: 'absolute top-[1250px] left-1/2 -translate-x-1/2 w-[1745px] text-justify font-raleway font-semibold ',
      messageStyle: { fontSize: '51pt', color: '#ffffff', lineHeight: '1.4' }
   }
};

function QuotesFlyer({ type = 'dyk', flyerRef, isGenerating, message }) {
   const config = QUOTES_CONFIGS[type] || QUOTES_CONFIGS['dyk'];

   return (
      <div
         ref={flyerRef}
         className="absolute top-0 left-0 bg-white overflow-hidden"
         style={{
            width: '3000px',
            height: '3000px',
            transformOrigin: 'top left'
         }}
      >
         <img
            src={config.bgLow}
            alt="Background Low"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ display: isGenerating ? 'none' : 'block' }}
         />
         <img
            src={config.bgHigh}
            alt="Background High"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ display: isGenerating ? 'block' : 'none' }}
         />

         {/* Message */}
         <div
            className={config.messageClass}
            style={config.messageStyle}
         >
            {message}
         </div>
      </div>
   );
}

export default memo(QuotesFlyer);
