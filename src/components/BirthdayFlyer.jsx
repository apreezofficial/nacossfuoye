import { memo } from 'react';

export const BIRTHDAY_CONFIGS = {
   executive: {
      bgLow: '/birthday_templates/executive_template_low.jpg',
      bgHigh: '/birthday_templates/executive_template_high.png',
      frameMask: '/birthday_templates/executive_frame.png',
      frameClass: 'absolute top-187 left-165 w-231.5 h-317.5 bg-white overflow-hidden flex items-center justify-center',
      firstNameClass: 'absolute bottom-255 left-515 w-max -translate-x-1/2 text-center font-raleway font-bold',
      firstNameStyle: { fontSize: '60pt', color: '#0e2a1a' },
      lastNameClass: 'absolute bottom-225 left-515 w-max -translate-x-1/2 text-center font-raleway font-semibold',
      lastNameStyle: { fontSize: '59pt', color: '#ffffff' },
      postClass: 'absolute bottom-163 left-1/2 w-max -translate-x-1/2 text-center font-raleway font-bold',
      postStyle: { fontSize: '95pt', color: '#ffffff' },
      dateClass: 'absolute bottom-295 left-[2372px] w-max origin-bottom-left -rotate-90 font-raleway font-semibold text-left',
      dateStyle: { fontSize: '60pt', color: '#ffffff' },
   },
   outsiders: {
      bgLow: '/birthday_templates/outsider_template_low.jpg',
      bgHigh: '/birthday_templates/outsider_template_high.png',
      frameMask: '/birthday_templates/outsider_frame.png',
      frameClass: 'absolute top-240 left-1/2 -translate-x-1/2 w-300 aspect-[1193/1300] bg-white overflow-hidden flex items-center justify-center',

      // Combined Name for outsider
      nameClass: 'absolute bottom-125 left-80 w-max text-left font-raleway font-bold tracking-tight',
      nameStyle: { fontSize: '100pt', color: '#ffffff' },
      lastNameStyle: { fontWeight: '500' }, // Reduced bold for last name

      postClass: 'absolute bottom-93 left-80 w-max text-left font-raleway',
      postStyle: { fontSize: '95pt', color: '#ffffff' },

      // Date centered horizontally, anchored at the top so it grows downwards
      dateClass: 'absolute top-[2188px] left-[2150px] -translate-x-1/2 w-max flex flex-col items-center justify-start text-center font-raleway font-extrabold',
      dateStyle: { fontSize: '60pt', color: '#0e2a1a', lineHeight: '0.9' },
   }
};

function BirthdayFlyer({ type = 'executive', flyerRef, isGenerating, imagePreview, firstname, lastname, post, date }) {
   const config = BIRTHDAY_CONFIGS[type] || BIRTHDAY_CONFIGS['executive'];

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
         {/* Background Images - rendered as actual DOM elements for reliable html-to-image capture */}
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

         {/* Picture Frame - Masked with CSS to solid white background shape */}
         <div
            className={config.frameClass}
            style={{
               WebkitMaskImage: `url(${config.frameMask})`,
               maskImage: `url(${config.frameMask})`,
               WebkitMaskSize: 'contain',
               maskSize: 'contain',
               WebkitMaskPosition: 'center',
               maskPosition: 'center',
               WebkitMaskRepeat: 'no-repeat',
               maskRepeat: 'no-repeat'
            }}
         >
            {imagePreview ? (
               <img src={imagePreview} alt="User" className="w-full h-full object-cover" />
            ) : (
               <span className="text-7xl text-slate-400 font-bold font-raleway">Photo</span>
            )}
         </div>

         {/* Names */}
         {type === 'outsiders' ? (
            <div className={config.nameClass} style={config.nameStyle}>
               {firstname} <span style={config.lastNameStyle}>{lastname}</span>
            </div>
         ) : (
            <>
               <div className={config.firstNameClass} style={config.firstNameStyle}>
                  {firstname}
               </div>
               <div className={config.lastNameClass} style={config.lastNameStyle}>
                  {lastname}
               </div>
            </>
         )}

         {/* Post */}
         <div
            className={config.postClass}
            style={config.postStyle}
         >
            {post}
         </div>

         {/* Date */}
         <div
            className={config.dateClass}
            style={config.dateStyle}
         >
            {type === 'outsiders' ? (
               <>
                  <span>{date.split(' ')[0]}</span>
                  <span>{date.split(' ')[1]}</span>
               </>
            ) : (
               date
            )}
         </div>
      </div>
   );
}

export default memo(BirthdayFlyer);
