import { buildPageMetadata } from '@/lib/site-config';

export const metadata = buildPageMetadata({
   title: 'Blind Timer Game',
   description:
      'Stop the stopwatch exactly at target seconds without looking! Test your internal clock in the NACOSS FUOYE Blind Timer challenge.',
   pathname: '/games/blind-timer',
});

export default function BlindTimerLayout({ children }) {
   return children;
}
