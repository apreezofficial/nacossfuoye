import { buildPageMetadata } from '@/lib/site-config';

export const metadata = buildPageMetadata({
   title: 'BuildLab & Student Venture Incubator',
   description:
      'Showcase innovative student software projects or submit early-stage tech ideas for departmental mentorship and engineering support protected under mutual NDA.',
   pathname: '/buildlab',
});

export default function BuildLabLayout({ children }) {
   return children;
}
