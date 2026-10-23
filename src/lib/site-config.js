/**
 * Centralized SEO & Site Configuration for NACOSS FUOYE Portal
 */

export const SITE_URL =
   process.env.NEXT_PUBLIC_SITE_URL ||
   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://nacossfuoye.vercel.app');

export const SITE_NAME = 'NACOSS FUOYE Portal';
export const SITE_TITLE_DEFAULT = 'NACOSS FUOYE Portal | Department of Computer Science';
export const SITE_TITLE_TEMPLATE = '%s | NACOSS FUOYE';
export const SITE_DESCRIPTION =
   'The official digital portal for the Department of Computer Science, Federal University Oye-Ekiti (FUOYE). Access verified departmental memos, academic courseware, developer software, student project incubation (BuildLab), departmental events, interactive games, and student governance.';

export const SITE_KEYWORDS = [
   'NACOSS',
   'NACOSS FUOYE',
   'FUOYE Computer Science',
   'Department of Computer Science FUOYE',
   'Federal University Oye-Ekiti',
   'FUOYE Computer Science Portal',
   'FUOYE Memos',
   'FUOYE Past Questions',
   'FUOYE Courseware',
   'FUOYE Software Request',
   'BuildLab FUOYE',
   'Student Venture Incubator',
   'FUOYE Hackathons',
   'FUOYE Tech Events',
   'Arcade Arena FUOYE',
   'Nigeria Association of Computing Students',
];

export const OG_IMAGE_PATH = '/og.png';
export const LOGO_PATH = '/nacossfuoye_logo.png';

export const DEFAULT_OG_IMAGE = {
   url: OG_IMAGE_PATH,
   width: 1200,
   height: 630,
   alt: 'NACOSS FUOYE Portal - Department of Computer Science, Federal University Oye-Ekiti',
   type: 'image/png',
};

/**
 * Helper to build consistent OpenGraph & Twitter metadata across routes
 */
export function buildPageMetadata({
   title,
   description = SITE_DESCRIPTION,
   pathname = '',
   ogImage = OG_IMAGE_PATH,
   noIndex = false,
}) {
   const canonicalUrl = pathname ? `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}` : SITE_URL;
   const fullTitle = title ? `${title} | NACOSS FUOYE` : SITE_TITLE_DEFAULT;

   return {
      title,
      description,
      alternates: {
         canonical: canonicalUrl,
      },
      openGraph: {
         title: fullTitle,
         description,
         url: canonicalUrl,
         siteName: SITE_NAME,
         locale: 'en_NG',
         type: 'website',
         images: [
            {
               url: ogImage,
               width: 1200,
               height: 630,
               alt: fullTitle,
            },
         ],
      },
      twitter: {
         card: 'summary_large_image',
         title: fullTitle,
         description,
         images: [ogImage],
         creator: '@nacossfuoye',
         site: '@nacossfuoye',
      },
      ...(noIndex && {
         robots: {
            index: false,
            follow: false,
            nocache: true,
            googleBot: {
               index: false,
               follow: false,
               noimageindex: true,
            },
         },
      }),
   };
}
