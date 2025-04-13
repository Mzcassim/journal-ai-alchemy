import { useState, useEffect } from 'react';
import { getJournalInsights, AIInsight } from '@/integrations/supabase/ai';
import { JournalEntry } from '@/context/JournalContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Lightbulb, BarChart, ArrowDownCircle, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface JournalAIInsightsProps {
  entry: JournalEntry;
}

export function JournalAIInsights({ entry }: JournalAIInsightsProps) {
  const [insights, setInsights] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadInsights = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getJournalInsights(entry);
      setInsights(data);
    } catch (err) {
      setError('Failed to load AI insights. Please try again later.');
      console.error('Error loading AI insights:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <CardTitle>AI Insights</CardTitle>
          </div>
          {!loading && !insights && (
            <Button variant="outline" onClick={loadInsights}>
              Analyze Entry
            </Button>
          )}
          {loading && (
            <Button variant="outline" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </Button>
          )}
        </div>
        <CardDescription>
          Get AI-powered insights about your journal entry
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!insights && !loading && !error && (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Sparkles className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              Click "Analyze Entry" to get AI-powered insights about your journal entry.
            </p>
          </div>
        )}
        
        {error && (
          <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-md text-center">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}
        
        {insights && (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <h3 className="font-medium">Summary</h3>
              </div>
              <p className="text-muted-foreground">{insights.summary}</p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4 text-blue-500" />
                <h3 className="font-medium">Mood Analysis</h3>
              </div>
              <p className="text-muted-foreground">{insights.mood_analysis}</p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="patterns">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <ArrowDownCircle className="h-4 w-4 text-green-500" />
                    <span>Patterns & Suggestions</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {insights.patterns.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Patterns</h4>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        {insights.patterns.map((pattern, index) => (
                          <li key={index}>{pattern}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {insights.suggestions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Suggestions</h4>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        {insights.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 