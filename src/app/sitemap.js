import { SITE_URL } from '@/lib/site-config';
import { createClient } from '@supabase/supabase-js';

export default async function sitemap() {
   const now = new Date();

   // Core public hub routes
   const staticRoutes = [
      {
         url: `${SITE_URL}`,
         lastModified: now,
         changeFrequency: 'daily',
         priority: 1.0,
      },
      {
         url: `${SITE_URL}/memos`,
         lastModified: now,
         changeFrequency: 'daily',
         priority: 0.9,
      },
      {
         url: `${SITE_URL}/academics`,
         lastModified: now,
         changeFrequency: 'weekly',
         priority: 0.85,
      },
      {
         url: `${SITE_URL}/buildlab`,
         lastModified: now,
         changeFrequency: 'weekly',
         priority: 0.85,
      },
      {
         url: `${SITE_URL}/events`,
         lastModified: now,
         changeFrequency: 'weekly',
         priority: 0.8,
      },
      {
         url: `${SITE_URL}/governance`,
         lastModified: now,
         changeFrequency: 'monthly',
         priority: 0.75,
      },
      {
         url: `${SITE_URL}/games`,
         lastModified: now,
         changeFrequency: 'weekly',
         priority: 0.7,
      },
      {
         url: `${SITE_URL}/games/reaction-timer`,
         lastModified: now,
         changeFrequency: 'monthly',
         priority: 0.65,
      },
      {
         url: `${SITE_URL}/games/memory-match`,
         lastModified: now,
         changeFrequency: 'monthly',
         priority: 0.65,
      },
      {
         url: `${SITE_URL}/games/blind-timer`,
         lastModified: now,
         changeFrequency: 'monthly',
         priority: 0.65,
      },
      {
         url: `${SITE_URL}/graphics`,
         lastModified: now,
         changeFrequency: 'monthly',
         priority: 0.65,
      },
   ];

   let memoRoutes = [];
   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
   const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

   if (supabaseUrl && supabaseKey) {
      try {
         const supabase = createClient(supabaseUrl, supabaseKey);
         const { data, error } = await supabase
            .from('memo')
            .select('reference, updated_at, created_at, date')
            .order('created_at', { ascending: false });

         if (!error && Array.isArray(data)) {
            memoRoutes = data
               .filter((item) => Boolean(item?.reference))
               .map((item) => ({
                  url: `${SITE_URL}/${encodeURIComponent(item.reference)}`,
                  lastModified: item.updated_at || item.created_at || now,
                  changeFrequency: 'monthly',
                  priority: 0.7,
               }));
         }
      } catch (err) {
         console.warn('[sitemap] Failed to fetch dynamic memos from Supabase:', err?.message);
      }
   }

   return [...staticRoutes, ...memoRoutes];
}
