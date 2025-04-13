import { useState } from 'react';
import { JournalEntry } from '@/context/JournalContext';
import { getJournalInsights, AIInsight } from '@/integrations/supabase/ai';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface JournalAISummaryProps {
  entries: JournalEntry[];
}

export default function JournalAISummary({ entries }: JournalAISummaryProps) {
  const [insights, setInsights] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the latest entry for analysis
  const latestEntry = entries.length > 0 ? entries[0] : null;

  const generateInsights = async () => {
    if (!latestEntry) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getJournalInsights(latestEntry);
      setInsights(data);
    } catch (err) {
      setError('Failed to generate AI insights');
      console.error('Error generating AI insights:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!latestEntry) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-xl">AI Insights</CardTitle>
          </div>
          <CardDescription>AI-powered journal analysis</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex flex-col items-center justify-center">
          <p className="text-muted-foreground text-center">
            Write your first journal entry to get AI insights
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-xl">AI Insights</CardTitle>
          </div>
          {!loading && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={generateInsights}
              disabled={loading}
            >
              {insights ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </>
              ) : (
                'Generate'
              )}
            </Button>
          )}
        </div>
        <CardDescription>AI-powered journal analysis</CardDescription>
      </CardHeader>
      
      <CardContent>
        {loading && (
          <div className="h-56 flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500 mb-4" />
            <p className="text-muted-foreground">Analyzing your journal...</p>
          </div>
        )}
        
        {!loading && !insights && !error && (
          <div className="h-56 flex flex-col items-center justify-center">
            <Sparkles className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground text-center mb-4">
              Click "Generate" to get AI insights from your latest entry
            </p>
          </div>
        )}
        
        {error && (
          <div className="h-56 flex flex-col items-center justify-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button variant="outline" size="sm" onClick={generateInsights}>
              Try Again
            </Button>
          </div>
        )}
        
        {!loading && insights && (
          <ScrollArea className="h-56">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Summary</h3>
                <p className="text-sm text-muted-foreground">{insights.summary}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Mood Analysis</h3>
                <p className="text-sm text-muted-foreground">{insights.mood_analysis}</p>
              </div>
              
              {insights.patterns.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-1">Patterns</h3>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    {insights.patterns.slice(0, 2).map((pattern, index) => (
                      <li key={index}>{pattern}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {insights.suggestions.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-1">Suggestions</h3>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    {insights.suggestions.slice(0, 2).map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
} 