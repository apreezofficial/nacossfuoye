import { memo } from 'react';
import { BIRTHDAY_CONFIGS } from '@/lib/birthday-configs';

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
