
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, BookText, PlusCircle } from "lucide-react";
import { useJournal } from '@/context/JournalContext';
import RecentEntryCard from '@/components/RecentEntryCard';
import MoodPieChart from '@/components/MoodPieChart';

const Dashboard = () => {
  const { entries } = useJournal();
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  });

  // Get streak days (consecutive days with entries)
  const calculateStreak = () => {
    if (entries.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dateEntries = entries.reduce<{[key: string]: boolean}>((acc, entry) => {
      const entryDate = new Date(entry.createdAt).toISOString().split('T')[0];
      acc[entryDate] = true;
      return acc;
    }, {});
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      if (dateEntries[dateStr]) {
        streak++;
      } else if (i === 0) {
        // If no entry for today, check yesterday to start streak
        continue;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const streak = calculateStreak();
  const recentEntries = entries.slice(0, 3);
  const entryCount = entries.length;
  const uniqueTags = [...new Set(entries.flatMap(entry => entry.tags))].length;

  return (
    <div className="container max-w-6xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">{greeting}!</h1>
        <p className="text-muted-foreground">
          Record your thoughts, track your mood, and discover insights.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Journal Entries</CardTitle>
            <CardDescription>Total entries written</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{entryCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Streak</CardTitle>
            <CardDescription>Days journaling consecutively</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{streak} day{streak !== 1 ? 's' : ''}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Topics</CardTitle>
            <CardDescription>Unique tags across entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{uniqueTags}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl">Recent Entries</CardTitle>
              <CardDescription>Your latest journal entries</CardDescription>
            </div>
            <Link to="/journal/new">
              <Button variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Entry
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentEntries.length > 0 ? (
              <div className="space-y-4">
                {recentEntries.map((entry) => (
                  <RecentEntryCard key={entry.id} entry={entry} />
                ))}
                <div className="pt-2">
                  <Link to="/journal">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <BookText className="h-4 w-4" />
                      View All Entries
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't written any journal entries yet.</p>
                <Link to="/journal/new">
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Write Your First Entry
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Mood Analysis</CardTitle>
            <CardDescription>Your emotional patterns</CardDescription>
          </CardHeader>
          <CardContent>
            {entries.length > 0 ? (
              <div className="h-64">
                <MoodPieChart entries={entries} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-muted-foreground mb-4">No mood data yet</p>
                <Link to="/insights">
                  <Button variant="outline" size="sm" className="gap-2">
                    <BarChart2 className="h-4 w-4" />
                    Explore Insights
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
