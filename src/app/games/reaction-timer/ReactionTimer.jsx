'use client';

import { useState, useRef } from 'react';

export default function ReactionTimer({ onGameOver }) {
   // states: idle, waiting, ready, finished
   const [state, setState] = useState('idle');
   const [message, setMessage] = useState('Click to Start');
   const [score, setScore] = useState(null);
   
   const startTimeRef = useRef(0);
   const timeoutRef = useRef(null);

   const handleClick = () => {
      if (state === 'idle' || state === 'finished') {
         setState('waiting');
         setMessage('Wait for green...');
         setScore(null);
         
         const randomDelay = Math.floor(Math.random() * 3000) + 1500; // 1.5s to 4.5s
         timeoutRef.current = setTimeout(() => {
            setState('ready');
            setMessage('CLICK NOW!');
            startTimeRef.current = Date.now();
         }, randomDelay);
      } 
      else if (state === 'waiting') {
         clearTimeout(timeoutRef.current);
         setState('finished');
         setMessage('Too soon! Click to try again.');
         onGameOver(0);
      } 
      else if (state === 'ready') {
         const reactionTime = Date.now() - startTimeRef.current;
         setState('finished');
         setMessage(`Your time: ${reactionTime}ms`);
         
         // 1000 base points. Minus 1 point for every ms. Min 0.
         const finalScore = Math.max(0, 1000 - reactionTime);
         setScore(finalScore);
         onGameOver(finalScore);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center w-full max-w-lg">
         <div className="mb-6 text-center h-8">
            {score !== null && (
               <span className="font-bold text-xl text-slate-700">Score: <span className="text-purple-600">{score}</span> points</span>
            )}
         </div>

         <button
            onMouseDown={handleClick}
            className={`w-full h-64 rounded-3xl shadow-xl flex items-center justify-center text-3xl font-extrabold text-white transition-colors select-none ${
               state === 'idle' || state === 'finished' ? 'bg-purple-600 hover:bg-purple-500' :
               state === 'waiting' ? 'bg-red-500' :
               'bg-green-500'
            }`}
         >
            {message}
         </button>
      </div>
   );
}
