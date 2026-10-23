import { buildPageMetadata } from '@/lib/site-config';

export const metadata = buildPageMetadata({
   title: 'Graphics Studio & Celebration Flyer Generator',
   description:
      'Generate official departmental celebration flyers and student birthday graphics with interactive photo croppers and high-resolution export.',
   pathname: '/graphics',
});

export default function GraphicsLayout({ children }) {
   return children;
}
