'use server';

import { createClient } from '@supabase/supabase-js';

export async function submitScore(data, hash) {
   // The secret key should ideally be set in your .env.local file
   const secret = process.env.NEXT_PUBLIC_GAME_SECRET || 'nacoss_secret_2026';

   // Reconstruct the expected hash on the server side
   const expectedHash = Buffer.from(`${data.score}-${data.game_slug}-${secret}`).toString('base64');

   if (hash !== expectedHash) {
      console.error('Cheating detected! Invalid hash signature.');
      return { success: false, error: 'Invalid score signature' };
   }

   // Initialize Supabase client
   // We MUST use the service key to bypass Row Level Security on the server side
   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
   const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

   if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase environment variables missing. SUPABASE_SERVICE_ROLE_KEY is required.");
      return { success: false, error: 'Server misconfiguration' };
   }

   const supabase = createClient(supabaseUrl, supabaseKey);

   // 1. Check if the player already has a score for this game
   const { data: existingRecords, error: fetchError } = await supabase
      .from('game_scores')
      .select('id, score')
      .eq('game_slug', data.game_slug)
      .eq('gaming_name', data.gaming_name);

   if (fetchError) {
      console.error('Supabase Fetch Error:', fetchError);
      return { success: false, error: fetchError.message };
   }

   const existingRecord = existingRecords?.[0];

   if (existingRecord) {
      // 2. If new score is higher, update it. If not, ignore it.
      if (data.score > existingRecord.score) {
         const { error: updateError } = await supabase
            .from('game_scores')
            .update({ score: data.score, level: data.level })
            .eq('id', existingRecord.id);
            
         if (updateError) {
            console.error('Supabase Update Error:', updateError);
            return { success: false, error: updateError.message };
         }
      }
   } else {
      // 3. No existing score found, insert a new row
      const { error: insertError } = await supabase.from('game_scores').insert({
         game_slug: data.game_slug,
         gaming_name: data.gaming_name,
         level: data.level,
         score: data.score
      });

      if (insertError) {
         console.error('Supabase Insert Error:', insertError);
         return { success: false, error: insertError.message };
      }
   }

   return { success: true };
}

export async function getLeaderboard(game_slug) {
   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
   const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

   if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase environment variables missing");
      return [];
   }

   const supabase = createClient(supabaseUrl, supabaseKey);

   const { data, error } = await supabase
      .from('game_scores')
      .select('gaming_name, level, score')
      .eq('game_slug', game_slug)
      .order('score', { ascending: false })
      .limit(10);

   if (error) {
      console.error('Supabase Fetch Error (Leaderboard):', error);
      return [];
   }

   return data || [];
}
