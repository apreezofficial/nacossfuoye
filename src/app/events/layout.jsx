import { buildPageMetadata } from '@/lib/site-config';

export const metadata = buildPageMetadata({
   title: 'Departmental Events & Hackathons',
   description:
      'Stay updated on Computer Science conferences, coding bootcamps, workshops, tech meetups, and national hackathons with live registration links.',
   pathname: '/events',
});

export default function EventsLayout({ children }) {
   return children;
}
