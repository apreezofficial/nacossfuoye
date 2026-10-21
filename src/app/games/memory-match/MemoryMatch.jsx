'use client';

import { useState, useEffect } from 'react';

const EMOJIS = ['🚀', '💻', '⭐', '🔥', '🧠', '🍕', '🎉', '🎮'];

export default function MemoryMatch({ onGameOver }) {
   const [cards, setCards] = useState([]);
   const [flipped, setFlipped] = useState([]);
   const [solved, setSolved] = useState([]);
   const [moves, setMoves] = useState(0);
   const [won, setWon] = useState(false);

   useEffect(() => {
      resetGame();
   }, []);

   const resetGame = () => {
      const shuffled = [...EMOJIS, ...EMOJIS]
         .sort(() => Math.random() - 0.5)
         .map((item, idx) => ({ id: idx, content: item }));
      
      setCards(shuffled);
      setFlipped([]);
      setSolved([]);
      setMoves(0);
      setWon(false);
   };

   const handleCardClick = (index) => {
      if (flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;

      const newFlipped = [...flipped, index];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
         setMoves(m => m + 1);
         const [first, second] = newFlipped;
         
         if (cards[first].content === cards[second].content) {
            setSolved([...solved, first, second]);
            setFlipped([]);
            
            if (solved.length + 2 === cards.length) {
               setWon(true);
               // Base score 1000, minus 20 for every move over minimum (8)
               const score = Math.max(100, 1000 - ((moves + 1 - 8) * 20));
               setTimeout(() => onGameOver(score), 500);
            }
         } else {
            setTimeout(() => setFlipped([]), 1000);
         }
      }
   };

   const flippedSet = new Set(flipped);
   const solvedSet = new Set(solved);

   return (
      <div className="flex flex-col items-center w-full max-w-md">
         <div className="flex justify-between w-full mb-6 px-2 font-bold text-slate-600">
            <span>Moves: <span className="text-purple-600 text-xl">{moves}</span></span>
            <span>Pairs: <span className="text-purple-600 text-xl">{solved.length / 2} / 8</span></span>
         </div>

         <div className="grid grid-cols-4 gap-3 w-full">
            {cards.map((card, idx) => {
               const isFlipped = flippedSet.has(idx) || solvedSet.has(idx);
               return (
                  <button
                     key={card.id}
                     onClick={() => handleCardClick(idx)}
                     className={`aspect-square text-4xl flex items-center justify-center rounded-xl transition-all duration-300 transform ${
                        isFlipped 
                           ? 'bg-white border-2 border-purple-200 shadow-sm scale-100' 
                           : 'bg-purple-600 shadow-md hover:bg-purple-500 hover:-translate-y-1 scale-100'
                     }`}
                  >
                     {isFlipped ? card.content : '?'}
                  </button>
               );
            })}
         </div>

         {won && (
            <div className="mt-8 text-center animate-bounce">
               <h3 className="text-2xl font-bold text-green-500 mb-4">You Won!</h3>
               <button onClick={resetGame} className="bg-purple-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-purple-700">
                  Play Again
               </button>
            </div>
         )}
      </div>
   );
}
