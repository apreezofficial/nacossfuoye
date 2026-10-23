import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/site-config';

export default function manifest() {
   return {
      name: SITE_NAME,
      short_name: 'NACOSS FUOYE',
      description: SITE_DESCRIPTION,
      start_url: '/',
      display: 'standalone',
      background_color: '#f8fafc',
      theme_color: '#039133',
      orientation: 'portrait-primary',
      icons: [
         {
            src: '/nacossfuoye_logo.png',
            sizes: '141x141',
            type: 'image/png',
            purpose: 'any maskable',
         },
         {
            src: '/og.png',
            sizes: '1200x630',
            type: 'image/png',
            purpose: 'any',
         },
      ],
   };
}
