import { buildPageMetadata } from '@/lib/site-config';

export const metadata = buildPageMetadata({
   title: 'Official Memos & Circulars',
   description:
      'Official departmental communications, circulars, executive resolutions, and electoral decrees for the Department of Computer Science, FUOYE.',
   pathname: '/memos',
});

export default function MemosLayout({ children }) {
   return children;
}
