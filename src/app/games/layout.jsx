import { buildPageMetadata } from '@/lib/site-config';

export const metadata = buildPageMetadata({
   title: 'Arcade Arena & Weekly Leaderboards',
   description:
      'Play mini-games including Reaction Timer, Memory Match, and Blind Timer. Compete with fellow Computer Science students on verified weekly leaderboards.',
   pathname: '/games',
});

export default function GamesLayout({ children }) {
   return children;
}
