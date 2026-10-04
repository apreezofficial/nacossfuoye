'use client';

import { useState, useRef, useEffect } from 'react';

export default function BlindTimer({ onGameOver }) {
   const [state, setState] = useState('idle'); // idle, running, finished
   const [targetMs, setTargetMs] = useState(0);
   const [actualMs, setActualMs] = useState(0);
   const [score, setScore] = useState(null);
   const startTimeRef = useRef(0);

   useEffect(() => {
      resetGame();
   }, []);

   const resetGame = () => {
      // Random target between 3.00 and 10.00 seconds
      const target = Math.floor(Math.random() * 7000) + 3000;
      setTargetMs(target);
      setState('idle');
      setActualMs(0);
      setScore(null);
   };

   const handleStart = () => {
      setState('running');
      startTimeRef.current = Date.now();
   };

   const handleStop = () => {
      if (state !== 'running') return;
      const endTime = Date.now();
      const difference = endTime - startTimeRef.current;
      
      setActualMs(difference);
      setState('finished');
      
      const diffFromTarget = Math.abs(targetMs - difference);
      // 1000 base score. Minus 1 point for every 2ms off. Max score is 1000.
      const finalScore = Math.max(0, 1000 - Math.floor(diffFromTarget / 2));
      setScore(finalScore);
      setTimeout(() => onGameOver(finalScore), 1000);
   };

   return (
      <div className="flex flex-col items-center w-full max-w-md">
         <div className="mb-8 text-center">
            <h3 className="text-xl font-bold text-slate-500 mb-2">Target Time</h3>
            <div className="text-5xl font-black text-slate-800 tracking-wider">
               {(targetMs / 1000).toFixed(2)}s
            </div>
         </div>

         {state === 'finished' && (
            <div className="mb-8 text-center animate-in fade-in zoom-in duration-300">
               <h3 className="text-lg font-bold text-slate-500 mb-1">Your Time</h3>
               <div className={`text-4xl font-bold ${Math.abs(targetMs - actualMs) < 200 ? 'text-green-500' : 'text-purple-600'}`}>
                  {(actualMs / 1000).toFixed(2)}s
               </div>
               <div className="text-sm font-semibold mt-2 text-slate-400">
                  Off by {(Math.abs(targetMs - actualMs) / 1000).toFixed(2)}s
               </div>
            </div>
         )}

         {state === 'idle' && (
            <button 
               onClick={handleStart}
               className="w-full bg-purple-600 text-white font-bold text-2xl py-12 rounded-3xl shadow-lg hover:bg-purple-700 hover:-translate-y-1 transition-all active:scale-95"
            >
               Start Timer
            </button>
         )}

         {state === 'running' && (
            <button 
               onClick={handleStop}
               className="w-full bg-red-500 text-white font-bold text-2xl py-12 rounded-3xl shadow-lg hover:bg-red-600 transition-all active:scale-95"
            >
               Stop Timer!
            </button>
         )}
         
         {state === 'finished' && (
            <button 
               onClick={resetGame}
               className="w-full bg-slate-200 text-slate-700 font-bold text-xl py-6 rounded-3xl hover:bg-slate-300 transition-all active:scale-95 mt-4"
            >
               Try Again
            </button>
         )}
      </div>
   );
}
