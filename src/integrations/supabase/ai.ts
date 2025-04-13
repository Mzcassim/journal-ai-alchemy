import { supabase } from './client';
import type { JournalEntry } from '@/context/JournalContext';

export interface AIInsight {
  summary: string;
  mood_analysis: string;
  patterns: string[];
  suggestions: string[];
}

// Mock AI analysis function for local development
function mockAnalyzeJournalEntry(entry: JournalEntry): AIInsight {
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

/**
 * Get AI insights for a journal entry
 * Uses a local mock during development, and Supabase Edge Functions in production
 */
export async function getJournalInsights(entry: JournalEntry): Promise<AIInsight> {
  try {
    // Use the mock implementation for local development
    // In production, you would uncomment the Supabase function call
    
    // Simulate network delay for realistic testing
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockAnalyzeJournalEntry(entry);
    
    /* Uncomment this code when your Supabase project is active
    const { data, error } = await supabase.functions.invoke('analyze-journal', {
      body: { entry },
    });

    if (error) {
      console.error('Error getting AI insights:', error);
      throw error;
    }

    return data as AIInsight;
    */
  } catch (error) {
    console.error('Failed to get AI insights:', error);
    // Return fallback data if request fails
    return {
      summary: "AI insights are currently unavailable.",
      mood_analysis: "Unable to analyze mood at this time.",
      patterns: [],
      suggestions: ["Try again later."],
    };
  }
} 