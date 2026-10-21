'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import HomeHero from '@/components/home/HomeHero';
import QuotesMarquee from '@/components/home/QuotesMarquee';
import ActivitiesGrid from '@/components/home/ActivitiesGrid';
import ContributorsSection from '@/components/home/ContributorsSection';

export default function Home() {
   const [quotes, setQuotes] = useState({ dyk: '', invest_friday: '' });
   const supabase = createClient();

   useEffect(() => {
      let isMounted = true;
      const fetchQuotes = async () => {
         const { data, error } = await supabase
            .from('quotes')
            .select('dyk, invest_friday')
            .eq('id', 1)
            .single();
         if (isMounted && data && !error) setQuotes(data);
      };
      fetchQuotes();
      return () => {
         isMounted = false;
      };
   }, [supabase]);

   return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 min-h-[85vh] flex flex-col">
         {/* Hero Rounded Box */}
         <HomeHero />

         {/* Scrolling Quotes Marquee */}
         <QuotesMarquee quotes={quotes} />

         {/* Portal Activities Cards Section */}
         <ActivitiesGrid />

         {/* Open Source Contributors Section */}
         <ContributorsSection />
      </main>
   );
}
