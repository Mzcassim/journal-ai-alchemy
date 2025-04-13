
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJournal, JournalEntry } from '@/context/JournalContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import MoodIcon from '@/components/MoodIcon';

const JournalEntries = () => {
  const { entries } = useJournal();
  const [searchQuery, setSearchQuery] = useState('');
  const [moodFilter, setMoodFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('newest');

  // Get all unique tags
  const allTags = Array.from(new Set(entries.flatMap(entry => entry.tags)));

  // Filter entries based on search query, mood filter, and tag filter
  const filteredEntries = entries.filter(entry => {
    const matchesQuery = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesMood = moodFilter === 'all' || entry.mood === moodFilter;
    
    return matchesQuery && matchesMood;
  });

  // Sort entries
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  // Group entries by month and year
  const entriesByDate = sortedEntries.reduce<Record<string, JournalEntry[]>>((groups, entry) => {
    const date = new Date(entry.createdAt);
    const monthYear = format(date, 'MMMM yyyy');
    
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    
    groups[monthYear].push(entry);
    return groups;
  }, {});

  return (
    <div className="container max-w-4xl animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Journal Entries</h1>
          <p className="text-muted-foreground">Browse and search your journal history</p>
        </div>
        <Link to="/journal/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </Link>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={moodFilter} onValueChange={setMoodFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All moods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All moods</SelectItem>
              <SelectItem value="joyful">Joyful</SelectItem>
              <SelectItem value="grateful">Grateful</SelectItem>
              <SelectItem value="calm">Calm</SelectItem>
              <SelectItem value="sad">Sad</SelectItem>
              <SelectItem value="anxious">Anxious</SelectItem>
              <SelectItem value="angry">Angry</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">No Journal Entries Yet</h3>
          <p className="text-muted-foreground mb-6">Start by creating your first journal entry</p>
          <Link to="/journal/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create First Entry
            </Button>
          </Link>
        </div>
      ) : sortedEntries.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">No Matching Entries</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
          <Button variant="outline" onClick={() => { setSearchQuery(''); setMoodFilter('all'); }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(entriesByDate).map(([monthYear, entries]) => (
            <div key={monthYear}>
              <h2 className="text-lg font-medium mb-4 px-2">{monthYear}</h2>
              <div className="space-y-3">
                {entries.map((entry) => (
                  <Link to={`/journal/${entry.id}`} key={entry.id}>
                    <div className="p-4 rounded-lg border border-border hover:border-gray-300 dark:hover:border-gray-700 transition-all journal-card bg-white dark:bg-gray-800">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <MoodIcon mood={entry.mood} />
                          <h3 className="font-semibold font-serif">{entry.title}</h3>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(entry.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                        {entry.content.replace(/<[^>]*>?/gm, '')}
                      </p>
                      {entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {entry.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalEntries;
