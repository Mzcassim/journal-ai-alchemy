
import { Link } from 'react-router-dom';
import { JournalEntry } from '@/context/JournalContext';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import MoodIcon from './MoodIcon';

interface RecentEntryCardProps {
  entry: JournalEntry;
}

const RecentEntryCard = ({ entry }: RecentEntryCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true });
  
  return (
    <Link to={`/journal/${entry.id}`}>
      <div className="p-4 rounded-lg border border-border hover:border-gray-300 dark:hover:border-gray-700 transition-all journal-card bg-white dark:bg-gray-800">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold font-serif text-lg">{entry.title}</h3>
          <div className="flex items-center">
            <MoodIcon mood={entry.mood} className="h-5 w-5" />
          </div>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {entry.content.replace(/<[^>]*>?/gm, '')}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {entry.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {entry.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{entry.tags.length - 2} more
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>
      </div>
    </Link>
  );
};

export default RecentEntryCard;
