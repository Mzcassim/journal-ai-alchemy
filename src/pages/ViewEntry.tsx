import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJournal } from '@/context/JournalContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import MoodIcon from '@/components/MoodIcon';
import { toast } from '@/components/ui/use-toast';
import { JournalAIInsights } from '@/components/JournalAIInsights';

const ViewEntry = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEntryById, deleteEntry } = useJournal();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const entry = getEntryById(id!);
  
  if (!entry) {
    return (
      <div className="container max-w-3xl py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Entry Not Found</h1>
        <p className="mb-6 text-muted-foreground">The journal entry you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/journal')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Journal
        </Button>
      </div>
    );
  }
  
  const handleDelete = () => {
    deleteEntry(entry.id);
    toast({
      title: "Entry deleted",
      description: "Your journal entry has been permanently deleted."
    });
    navigate('/journal');
  };
  
  const formattedDate = format(new Date(entry.createdAt), 'MMMM d, yyyy');
  
  return (
    <div className="container max-w-3xl animate-fade-in">
      <Button 
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/journal')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Journal
      </Button>
      
      <div className="mb-8">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <div className={`mr-3 p-2 rounded-full bg-mood-${entry.mood}/20`}>
              <MoodIcon mood={entry.mood} className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">{entry.title}</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="text-muted-foreground mb-2">
          {formattedDate} • Feeling <span className="font-medium capitalize">{entry.mood}</span>
        </div>
        
        {entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {entry.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="px-2 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="mt-8 prose prose-slate dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: entry.content }} />
        </div>
      </div>
      
      {/* AI Insights Component */}
      <JournalAIInsights entry={entry} />
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              journal entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ViewEntry;
