
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useJournal } from '@/context/JournalContext';
import { ArrowRight, BookOpen, Brain, Heart, Lightbulb, Sparkles } from 'lucide-react';

interface Prompt {
  id: string;
  text: string;
  category: 'reflection' | 'gratitude' | 'growth' | 'ai-generated';
}

const Prompts = () => {
  const navigate = useNavigate();
  const { addEntry } = useJournal();
  const [selectedTab, setSelectedTab] = useState('reflection');
  
  const prompts: Prompt[] = [
    {
      id: '1',
      text: 'What made you smile today and why?',
      category: 'reflection'
    },
    {
      id: '2',
      text: 'Describe a challenge you\'re currently facing and three possible ways to overcome it.',
      category: 'reflection'
    },
    {
      id: '3',
      text: 'What are three things you\'re grateful for today?',
      category: 'gratitude'
    },
    {
      id: '4',
      text: 'Think about someone who has helped you recently. How did their actions affect you?',
      category: 'gratitude'
    },
    {
      id: '5',
      text: 'What is one skill you\'d like to improve this month? What steps can you take to make progress?',
      category: 'growth'
    },
    {
      id: '6',
      text: 'Reflect on a mistake you made recently. What did you learn from it?',
      category: 'growth'
    },
    {
      id: '7',
      text: 'Based on your recent entries, it seems exploring your creative side brings you joy. What creative project could you start this week?',
      category: 'ai-generated'
    },
    {
      id: '8',
      text: 'You\'ve mentioned feeling overwhelmed at work three times this week. What boundaries could you set to improve your work-life balance?',
      category: 'ai-generated'
    },
  ];
  
  const handleUsePrompt = (prompt: Prompt) => {
    addEntry({
      title: `Prompt: ${prompt.text.slice(0, 30)}...`,
      content: `<p><em>${prompt.text}</em></p><p><br></p>`,
      mood: 'neutral',
      tags: [prompt.category]
    });
    
    navigate('/journal');
  };
  
  const filteredPrompts = prompts.filter(prompt => prompt.category === selectedTab);
  
  return (
    <div className="container max-w-4xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Journal Prompts</h1>
        <p className="text-muted-foreground">
          Inspiration for your journal entries
        </p>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-4 w-full mb-6">
          <TabsTrigger value="reflection" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Reflection</span>
          </TabsTrigger>
          <TabsTrigger value="gratitude" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span>Gratitude</span>
          </TabsTrigger>
          <TabsTrigger value="growth" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Growth</span>
          </TabsTrigger>
          <TabsTrigger value="ai-generated" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>AI-Generated</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedTab} className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {filteredPrompts.map((prompt) => (
              <Card key={prompt.id} className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-start">
                    <Lightbulb className="h-5 w-5 mr-2 text-journal-purple" />
                    <span>Prompt</span>
                  </CardTitle>
                  <CardDescription>
                    {prompt.category === 'ai-generated' 
                      ? 'Personalized based on your journal entries'
                      : `${prompt.category.charAt(0).toUpperCase() + prompt.category.slice(1)} prompt`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-serif">{prompt.text}</p>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button onClick={() => handleUsePrompt(prompt)} className="gap-2">
                    <span>Use This Prompt</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Don't see a prompt that inspires you?
        </p>
        <Button variant="outline" className="mt-2 animate-fade-in">
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Custom Prompt
        </Button>
      </div>
    </div>
  );
};

export default Prompts;
