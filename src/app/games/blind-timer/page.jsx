'use client';

import GameWrapper from '../GameWrapper';
import BlindTimer from './BlindTimer';

export default function BlindTimerPage() {
   return (
      <GameWrapper
         slug="blind-timer"
         GameComponent={BlindTimer}
      />
   );
}
