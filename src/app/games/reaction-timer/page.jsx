'use client';

import GameWrapper from '../GameWrapper';
import ReactionTimer from './ReactionTimer';

export default function ReactionTimerPage() {
   return (
      <GameWrapper
         slug="reaction-timer"
         GameComponent={ReactionTimer}
      />
   );
}
