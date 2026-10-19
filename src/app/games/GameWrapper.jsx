'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getGameBySlug } from './games';
import { ArrowLeft, Trophy, Code, Settings } from 'lucide-react';
import { GamePad } from '@esvigy/react';

import { submitScore, getLeaderboard } from './actions';
import { Star } from 'lucide-react';

export default function GameWrapper({ slug, GameComponent }) {
   const router = useRouter();
   const game = getGameBySlug(slug);

   const [player, setPlayer] = useState(null);
   const [showStartModal, setShowStartModal] = useState(true);
   const [showSwitchModal, setShowSwitchModal] = useState(false);
   const [gameOverScore, setGameOverScore] = useState(null);
   const [formData, setFormData] = useState({ name: '', level: '100L' });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [leaderboard, setLeaderboard] = useState([]);
   const [loadingBoard, setLoadingBoard] = useState(true);

   const fetchBoard = useCallback(async () => {
      const data = await getLeaderboard(game.slug);
      if (data && data.length > 0) {
         const ranked = data.map((item, index) => ({
            rank: index + 1,
            name: item.gaming_name,
            level: item.level,
            score: item.score
         }));
         setLeaderboard(ranked);
      }
      setLoadingBoard(false);
   }, [game.slug]);

   useEffect(() => {
      fetchBoard();
   }, [fetchBoard]);

   useEffect(() => {
      const savedPlayer = localStorage.getItem('nacoss_player');
      if (savedPlayer) {
         setPlayer(JSON.parse(savedPlayer));
         setShowStartModal(false);
      }
   }, []);

   if (!game) return <div className="text-center mt-20 text-2xl font-bold">Game not found</div>;

   const handleStart = (e) => {
      e.preventDefault();
      if (!formData.name) return;

      localStorage.setItem('nacoss_player', JSON.stringify(formData));
      setPlayer(formData);
      setShowStartModal(false);
      setShowSwitchModal(false);
   };

   const handleGameOver = (finalScore) => {
      setGameOverScore(finalScore);
      
      if (!player) return;

      setIsSubmitting(true);
      
      // Create a basic hash using the public env secret or a fallback
      const secret = process.env.NEXT_PUBLIC_GAME_SECRET || 'nacoss_secret_2026';
      const hash = btoa(`${finalScore}-${game.slug}-${secret}`);
      
      // Fire and forget: save happens in parallel in the background
      submitScore({
         game_slug: game.slug,
         gaming_name: player.name,
         level: player.level,
         score: finalScore
      }, hash)
      .then(() => fetchBoard()) // Refresh the game's leaderboard
      .catch(err => console.error("Failed to submit score:", err))
      .finally(() => setIsSubmitting(false));
   };

   // Renders the player form used in both start modal and switch modal
   const renderPlayerForm = () => (
      <form onSubmit={handleStart} className="flex flex-col gap-4 text-left w-full max-w-sm mx-auto">
         <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Unique Gaming Name</label>
            <input
               type="text"
               placeholder="e.g. ShadowHunter"
               className="w-full border border-slate-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
               value={formData.name}
               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
               required
            />
         </div>
         <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Level</label>
            <select
               className="w-full border border-slate-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
               value={formData.level}
               onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            >
               <option value="100L">100 Level</option>
               <option value="200L">200 Level</option>
               <option value="300L">300 Level</option>
               <option value="400L">400 Level</option>
               <option value="Alumni">Alumni</option>
            </select>
         </div>
         <div className="flex gap-3 mt-2">
            {showSwitchModal && (
               <button 
                  type="button" 
                  onClick={() => setShowSwitchModal(false)}
                  className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl hover:bg-slate-200 transition-all"
               >
                  Cancel
               </button>
            )}
            <button type="submit" className="flex-1 bg-purple-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-purple-700 hover:shadow-lg transition-all active:scale-95">
               {showSwitchModal ? 'Update Player' : 'Start Playing'}
            </button>
         </div>
      </form>
   );

   return (
      <div className="max-w-4xl mx-auto p-4 md:p-6 relative">
         <button onClick={() => router.push('/games')} className="inline-flex items-center text-slate-500 hover:text-purple-600 font-medium mb-6 transition-colors">
            <ArrowLeft size={18} className="mr-2" /> Back to Games Hub
         </button>

         <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
               <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 flex items-center flex-wrap gap-3">
                  {game.name}
                  {game.isActive 
                     ? <span className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full font-bold uppercase tracking-wider">Weekly Live</span>
                     : <span className="bg-slate-100 text-slate-500 text-sm px-3 py-1 rounded-full font-bold uppercase tracking-wider">Archived</span>
                  }
               </h1>
               
               <a href={game.developerLink} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-semibold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors w-fit">
                  <Code size={16} className="mr-2" /> Built by {game.developer}
               </a>
            </div>
            
            <p className="text-slate-600 text-lg mb-6">{game.description}</p>
            
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm text-slate-700 leading-relaxed shadow-inner">
               <strong className="text-slate-900 block mb-1">How to play:</strong> 
               {game.howToPlay}
            </div>
         </div>

         {showStartModal ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl max-w-md mx-auto text-center">
               <div className="w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                  <GamePad animated={true} color="#9333ea" secondaryColor="rgba(147,51,234,0.12)" className="w-24 h-24 filter drop-shadow-md" />
               </div>
               <h2 className="text-2xl font-bold mb-2 text-slate-800">Join the Leaderboard</h2>
               <p className="text-slate-500 mb-6 text-sm">Enter your gaming profile to save your high scores.</p>
               {renderPlayerForm()}
            </div>
         ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl relative">
               
               {/* Player Header */}
               <div className="flex flex-wrap justify-between items-center mb-8 border-b border-slate-100 pb-4 gap-4">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
                        {player?.name?.charAt(0).toUpperCase()}
                     </div>
                     <div>
                        <div className="font-extrabold text-slate-800">{player?.name}</div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{player?.level}</div>
                     </div>
                  </div>
                  <button
                     onClick={() => {
                        setFormData({ name: player?.name || '', level: player?.level || '100L' });
                        setShowSwitchModal(true);
                     }}
                     className="inline-flex items-center text-sm text-slate-500 hover:text-purple-600 font-semibold transition-colors bg-slate-50 hover:bg-purple-50 px-3 py-1.5 rounded-lg"
                  >
                     <Settings size={16} className="mr-2" /> Switch Player
                  </button>
               </div>

               {/* Game Rendering area */}
               <div className="flex justify-center items-center min-h-100">
                  {GameComponent ? (
                     <GameComponent onGameOver={handleGameOver} player={player} />
                  ) : (
                     <div className="p-10 text-slate-400 font-medium">Game logic not found.</div>
                  )}
               </div>

               {/* Game Over Overlay Modal */}
               {gameOverScore !== null && (
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center z-20 animate-in fade-in duration-300">
                     <div className="bg-white border border-slate-200 shadow-2xl p-8 rounded-2xl max-w-sm w-full text-center">
                        <Trophy size={48} className="mx-auto text-yellow-400 mb-4" />
                        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Game Over!</h2>
                        <div className="text-slate-500 font-medium mb-6">
                           Your Score: <span className="text-4xl block text-purple-600 font-black mt-2">{gameOverScore}</span>
                        </div>
                        
                        {isSubmitting ? (
                           <div className="text-sm text-slate-500 animate-pulse mb-6">Saving to leaderboard...</div>
                        ) : null}

                        <button 
                           onClick={() => setGameOverScore(null)} 
                           className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition"
                        >
                           Play Again
                        </button>
                     </div>
                  </div>
               )}

               {/* Switch Player Overlay Modal */}
               {showSwitchModal && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center z-30 animate-in fade-in duration-200">
                     <h2 className="text-2xl font-bold mb-6 text-slate-800">Switch Player Details</h2>
                     {renderPlayerForm()}
                  </div>
               )}
               
            </div>
         )}

         {/* Game Leaderboard */}
         {!showStartModal && (
            <div className="mt-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
               <h3 className="text-xl font-bold mb-4 text-slate-800 flex items-center border-b pb-3">
                  <Trophy className="text-yellow-500 mr-2" size={20} /> {game.name} Leaderboard
               </h3>
               
               {loadingBoard ? (
                  <div className="text-center text-slate-400 py-6">Loading scores...</div>
               ) : leaderboard.length === 0 ? (
                  <div className="text-center text-slate-400 py-6">No scores yet. Be the first to set a record!</div>
               ) : (
                  <div className="overflow-x-auto">
                     <table className="w-full text-left border-collapse">
                        <thead>
                           <tr className="text-xs text-slate-400 uppercase tracking-wider border-b">
                              <th className="pb-2 font-semibold w-16">Rank</th>
                              <th className="pb-2 font-semibold">Player</th>
                              <th className="pb-2 font-semibold">Level</th>
                              <th className="pb-2 font-semibold text-right">Score</th>
                           </tr>
                        </thead>
                        <tbody>
                           {leaderboard.map((s, idx) => (
                              <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition">
                                 <td className="py-3 text-sm font-bold">
                                    {s.rank === 1 && <Star className="inline text-yellow-500 fill-yellow-500" size={16} />}
                                    {s.rank === 2 && <Star className="inline text-gray-400 fill-gray-400" size={16} />}
                                    {s.rank === 3 && <Star className="inline text-amber-600 fill-amber-600" size={16} />}
                                    {s.rank > 3 && <span className="text-slate-400 pl-1">#{s.rank}</span>}
                                 </td>
                                 <td className="py-3 font-bold text-slate-700 text-sm">
                                    {s.name}
                                 </td>
                                 <td className="py-3 text-xs text-slate-400">
                                    {s.level}
                                 </td>
                                 <td className="py-3 font-mono font-bold text-slate-800 text-right text-sm">
                                    {s.score}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               )}
            </div>
         )}
      </div>
   );
}
