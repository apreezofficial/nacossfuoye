import { buildPageMetadata } from '@/lib/site-config';

export const metadata = buildPageMetadata({
   title: 'Reaction Timer Game',
   description:
      'Test your millisecond reflexes in the official NACOSS FUOYE Reaction Timer game. Compete for top rank on the departmental leaderboard.',
   pathname: '/games/reaction-timer',
});

export default function ReactionTimerLayout({ children }) {
   return children;
}
