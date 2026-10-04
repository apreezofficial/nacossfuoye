'use client';

import GameWrapper from '../GameWrapper';
import MemoryMatch from './MemoryMatch';

export default function MemoryMatchPage() {
   return (
      <GameWrapper
         slug="memory-match"
         GameComponent={MemoryMatch}
      />
   );
}
