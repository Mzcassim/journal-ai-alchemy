
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJournal } from '@/context/JournalContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { X, Save } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

const CreateEntry = () => {
  const navigate = useNavigate();
  const { addEntry } = useJournal();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<'joyful' | 'grateful' | 'calm' | 'sad' | 'anxious' | 'angry' | 'neutral'>('neutral');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  const handleAddTag = () => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title for your journal entry.",
        variant: "destructive"
      });
      return;
    }
    
    addEntry({
      title,
      content,
      mood,
      tags,
    });
    
    toast({
      title: "Entry saved!",
      description: "Your journal entry has been saved successfully."
    });
    
    navigate('/journal');
  };

  const moodOptions = [
    { value: 'joyful', label: 'Joyful', color: 'bg-mood-joyful' },
    { value: 'grateful', label: 'Grateful', color: 'bg-mood-grateful' },
    { value: 'calm', label: 'Calm', color: 'bg-mood-calm' },
    { value: 'sad', label: 'Sad', color: 'bg-mood-sad' },
    { value: 'anxious', label: 'Anxious', color: 'bg-mood-anxious' },
    { value: 'angry', label: 'Angry', color: 'bg-mood-angry' },
    { value: 'neutral', label: 'Neutral', color: 'bg-mood-neutral' }
  ];
  
  return (
    <div className="container max-w-3xl animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold gradient-text mb-2">New Journal Entry</h1>
        <p className="text-muted-foreground">Record your thoughts, feelings, and experiences</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card className="p-6 bg-white dark:bg-gray-800 mb-6">
          <div className="mb-6">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Give your entry a title"
              className="mt-1"
            />
          </div>
          
          <div className="mb-6">
            <Label>How are you feeling?</Label>
            <RadioGroup 
              value={mood} 
              onValueChange={(value) => setMood(value as any)} 
              className="flex flex-wrap gap-2 mt-2"
            >
              {moodOptions.map(option => (
                <div key={option.value} className="flex items-center">
                  <RadioGroupItem
                    value={option.value}
                    id={`mood-${option.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`mood-${option.value}`}
                    className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium 
                      ring-offset-background transition-colors focus-visible:outline-none 
                      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                      disabled:pointer-events-none disabled:opacity-50 
                      peer-data-[state=checked]:${option.color} peer-data-[state=checked]:text-white
                      hover:bg-muted hover:text-muted-foreground
                      border border-muted`}
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="mb-6">
            <Label htmlFor="content">Journal Entry</Label>
            <div 
              id="content"
              className="rich-editor bg-background mt-1"
              contentEditable
              data-placeholder="Write your thoughts here..."
              onInput={(e) => setContent(e.currentTarget.innerHTML)}
            />
          </div>
          
          <div className="mb-6">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex mt-1">
              <Input
                id="tags"
                value={tag}
                onChange={e => setTag(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add tags and press Enter"
                className="flex-grow"
              />
              <Button 
                type="button"
                onClick={handleAddTag}
                variant="secondary"
                className="ml-2"
              >
                Add
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map(tag => (
                  <Badge key={tag} className="flex items-center gap-1 px-2 py-1">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full p-0 hover:bg-primary/20"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove tag</span>
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>
        
        <div className="flex justify-end gap-4">
          <Button 
            type="button"
            variant="outline"
            onClick={() => navigate('/journal')}
          >
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Entry
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEntry;
