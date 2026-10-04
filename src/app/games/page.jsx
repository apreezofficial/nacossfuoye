'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GAMES, getActiveGame } from './games';
import { Star, Trophy, Home } from 'lucide-react';
import { getLeaderboard } from './actions';

export default function GamesDirectory() {
   const activeGame = getActiveGame();
   const [topScores, setTopScores] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchScores = async () => {
         if (!activeGame) {
            setLoading(false);
            return;
         }
         
         const data = await getLeaderboard(activeGame.slug);
            
         if (data && data.length > 0) {
            const ranked = data.map((item, index) => ({
               rank: index + 1,
               name: item.gaming_name,
               level: item.level,
               score: item.score
            }));
            setTopScores(ranked);
         }
         setLoading(false);
      };
      
      fetchScores();
   }, [activeGame]);

   const allGames = GAMES;

   return (
      <div className="max-w-6xl mx-auto p-6">
         <div className="mb-4">
            <Link href="/" className="inline-flex items-center text-slate-500 hover:text-purple-600 font-medium transition-colors">
               <Home size={18} className="mr-2" /> Back to Home
            </Link>
         </div>

         <h1 className="text-4xl font-extrabold mb-8 text-center text-slate-800">NACOSS Games Hub</h1>

         <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Left: Active Game of the Week */}
            <div className="flex-1 bg-purple-700 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-center border border-white/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-widest z-10">
                  Game of the Week
               </div>
               
               <div className="relative z-10">
                  <h2 className="text-4xl font-extrabold mb-2">{activeGame?.name}</h2>
                  
                  <div className="inline-block bg-white/20 px-3 py-1 rounded-md text-sm mb-4 border border-white/20">
                     Built by <a href={activeGame?.developerLink} target="_blank" rel="noreferrer" className="font-bold hover:underline text-yellow-300">{activeGame?.developer}</a>
                  </div>
                  
                  <p className="mb-8 text-lg opacity-90 leading-relaxed max-w-lg">{activeGame?.description}</p>
                  
                  <Link
                     href={`/games/${activeGame?.slug}`}
                     className="inline-flex items-center justify-center bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-lg active:scale-95"
                  >
                     <Trophy className="mr-2" size={24} /> Play & Compete
                  </Link>
               </div>
            </div>

            {/* Right: Leaderboard */}
            <div className="lg:w-1/3 bg-white rounded-3xl p-6 shadow-xl border border-slate-200 flex flex-col">
               <h3 className="text-2xl font-bold mb-4 text-slate-800 flex items-center border-b pb-3">
                  <Trophy className="text-yellow-500 mr-2" /> GOTW Top 10
               </h3>
               
               <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: '320px' }}>
                  {loading ? (
                     <div className="text-center text-slate-400 py-10">Loading scores...</div>
                  ) : topScores.length === 0 ? (
                     <div className="text-center text-slate-400 py-10">No scores yet. Be the first!</div>
                  ) : (
                     <table className="w-full text-left border-collapse">
                        <thead>
                           <tr className="text-xs text-slate-400 uppercase tracking-wider border-b">
                              <th className="pb-2 font-semibold">Rank</th>
                              <th className="pb-2 font-semibold">Player</th>
                              <th className="pb-2 font-semibold text-right">Score</th>
                           </tr>
                        </thead>
                        <tbody>
                           {topScores.map((s, idx) => (
                              <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition">
                                 <td className="py-3 text-sm font-bold w-12">
                                    {s.rank === 1 && <Star className="inline text-yellow-500 fill-yellow-500" size={16} />}
                                    {s.rank === 2 && <Star className="inline text-gray-400 fill-gray-400" size={16} />}
                                    {s.rank === 3 && <Star className="inline text-amber-600 fill-amber-600" size={16} />}
                                    {s.rank > 3 && <span className="text-slate-400 pl-1">#{s.rank}</span>}
                                 </td>
                                 <td className="py-3">
                                    <div className="font-bold text-slate-700 text-sm">{s.name}</div>
                                    <div className="text-xs text-slate-400">{s.level}</div>
                                 </td>
                                 <td className="py-3 font-mono font-bold text-slate-800 text-right text-sm">
                                    {s.score}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  )}
               </div>
            </div>
         </div>

         <div className="mb-6 border-b pb-2 mt-12">
            <h2 className="text-2xl font-bold text-slate-800">All Games</h2>
            <p className="text-slate-500 text-sm mt-1">Play any past or present game and climb their individual leaderboards.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allGames.map((game) => (
               <div key={game.slug} className={`bg-white rounded-3xl border-2 ${game.isActive ? 'border-purple-500 shadow-purple-100 shadow-lg' : 'border-slate-200 hover:border-purple-300 hover:shadow-lg'} p-6 transition-all flex flex-col relative`}>
                  {game.isActive && (
                     <div className="absolute -top-3 -right-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                        Active Weekly
                     </div>
                  )}
                  <h3 className="text-2xl font-extrabold mb-1">{game.name}</h3>
                  <div className="flex justify-between items-start mb-3">
                     <div className="text-xs text-slate-500 mb-3 bg-slate-50 p-2 rounded inline-block w-fit">
                        By <a href={game.developerLink} target="_blank" rel="noreferrer" className="text-purple-600 hover:underline font-bold">{game.developer}</a>
                     </div>
                  </div>
                  <p className="text-slate-600 mb-6 grow text-sm leading-relaxed">{game.description}</p>
                  
                  <Link
                     href={`/games/${game.slug}`}
                     className={`w-full text-center font-bold py-3 rounded-xl transition mt-auto ${game.isActive ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                  >
                     Play Now
                  </Link>
               </div>
            ))}
         </div>
      </div>
   );
}
