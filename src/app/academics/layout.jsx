import { buildPageMetadata } from '@/lib/site-config';

export const metadata = buildPageMetadata({
   title: 'Academic Resources & Software Repository',
   description:
      'Access verified computer science course syllabi, past questions, registered semester units, and request or contribute departmental lab software and dev tools.',
   pathname: '/academics',
});

export default function AcademicsLayout({ children }) {
   return children;
}
