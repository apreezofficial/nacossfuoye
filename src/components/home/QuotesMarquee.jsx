'use client';

import React from 'react';

export default function QuotesMarquee({ quotes }) {
   if (!quotes?.dyk && !quotes?.invest_friday) return null;

   return (
      <div className="w-full text-primary overflow-hidden mb-10 rounded-2xl flex">
         <div className="animate-marquee flex gap-12 font-medium items-center whitespace-nowrap px-4 w-max">
            {quotes.dyk && (
               <span>
                  <strong className="text-secondary-foreground mr-2 uppercase tracking-wide">DYK of the week:</strong>{' '}
                  {quotes.dyk}
               </span>
            )}
            {quotes.invest_friday && (
               <span className='text-slate-900'>
                  <strong className="text-orange-400 mr-2 uppercase tracking-wide">Invest Friday:</strong>{' '}
                  {quotes.invest_friday}
               </span>
            )}
            {/* Duplicated for seamless scrolling */}
            {quotes.dyk && (
               <span>
                  <strong className="text-secondary-foreground mr-2 uppercase tracking-wide">DYK of the week:</strong>{' '}
                  {quotes.dyk}
               </span>
            )}
            {quotes.invest_friday && (
               <span className='text-slate-900'>
                  <strong className="text-orange-400 mr-2 uppercase tracking-wide">Invest Friday:</strong>{' '}
                  {quotes.invest_friday}
               </span>
            )}
            {quotes.dyk && (
               <span>
                  <strong className="text-secondary-foreground mr-2 uppercase tracking-wide">DYK of the week:</strong>{' '}
                  {quotes.dyk}
               </span>
            )}
            {quotes.invest_friday && (
               <span className='text-slate-900'>
                  <strong className="text-orange-400 mr-2 uppercase tracking-wide">Invest Friday:</strong>{' '}
                  {quotes.invest_friday}
               </span>
            )}
         </div>
      </div>
   );
}
