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
