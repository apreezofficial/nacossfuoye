import { buildPageMetadata } from '@/lib/site-config';

export const metadata = buildPageMetadata({
   title: 'Memory Match Game',
   description:
      'Test your visual recall and speed in the NACOSS FUOYE Memory Match puzzle game. Match pairs in fewer moves and climb the departmental leaderboard.',
   pathname: '/games/memory-match',
});

export default function MemoryMatchLayout({ children }) {
   return children;
}
