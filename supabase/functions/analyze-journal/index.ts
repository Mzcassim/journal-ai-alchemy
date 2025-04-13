// Import necessary types
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: 'joyful' | 'grateful' | 'calm' | 'sad' | 'anxious' | 'angry' | 'neutral';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface AIInsight {
  summary: string;
  mood_analysis: string;
  patterns: string[];
  suggestions: string[];
}

// Simple mock AI analysis function
function analyzeJournalEntry(entry: JournalEntry): AIInsight {
  // Extract clean content (remove HTML tags)
  const cleanContent = entry.content.replace(/<[^>]*>?/gm, '');
  
  // Simple keyword-based analysis for mood
  const moodKeywords = {
    joyful: ['happy', 'joy', 'excited', 'great', 'wonderful'],
    grateful: ['thank', 'grateful', 'appreciate', 'blessed'],
    calm: ['calm', 'peaceful', 'relaxed', 'serene'],
    sad: ['sad', 'lonely', 'depressed', 'unhappy', 'tears'],
    anxious: ['worry', 'anxious', 'stress', 'nervous', 'fear'],
    angry: ['angry', 'frustrated', 'annoyed', 'mad'],
    neutral: []
  };

  // Generate a summary based on title and content
  const summary = `This entry is about ${entry.title.toLowerCase()}. The overall tone appears to be ${entry.mood}.`;
  
  // Simple mood analysis
  let moodAnalysis = `Your journaled mood was "${entry.mood}".`;
  
  // Check if content matches the mood
  const lowerContent = cleanContent.toLowerCase();
  const moodMatches = Object.entries(moodKeywords).filter(([mood, keywords]) =>
    keywords.some(keyword => lowerContent.includes(keyword))
  ).map(([mood]) => mood);
  
  if (moodMatches.length > 0 && !moodMatches.includes(entry.mood)) {
    moodAnalysis += ` However, your writing contains words associated with ${moodMatches.join(', ')}.`;
  }
  
  // Identify patterns based on tags
  const patterns = [
    `You've used the tag "${entry.tags[0]}" in this entry.`,
    `Your entry was written on ${new Date(entry.createdAt).toLocaleDateString()}.`
  ].filter(() => entry.tags.length > 0);
  
  // Generate suggestions
  const suggestions = [
    "Try to expand more on your feelings in future entries.",
    "Consider adding more specific details to your journals.",
    "Reflecting on past entries can help identify patterns in your mood."
  ];
  
  return {
    summary,
    mood_analysis: moodAnalysis,
    patterns,
    suggestions
  };
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    const { entry } = await req.json();
    
    if (!entry) {
      return new Response(
        JSON.stringify({ error: 'Journal entry is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Analyze the journal entry
    const insights = analyzeJournalEntry(entry);
    
    // Return the AI insights
    return new Response(
      JSON.stringify(insights),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
}); 