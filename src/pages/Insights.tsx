
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useJournal } from '@/context/JournalContext';
import { subDays, format } from 'date-fns';

const Insights = () => {
  const { entries } = useJournal();
  
  // Generate mood trend data (placeholder)
  const generateMoodTrendData = () => {
    const days = 14; // Last 14 days
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, 'MMM d');
      
      // Find entries for this date
      const dayEntries = entries.filter(entry => {
        const entryDate = new Date(entry.createdAt);
        return format(entryDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
      });
      
      // Map moods to numerical values
      const moodValues = {
        joyful: 5,
        grateful: 4, 
        calm: 3,
        neutral: 2,
        sad: 1,
        anxious: 0,
        angry: -1
      };
      
      // Calculate average mood if there are entries for this day
      let moodValue = null;
      if (dayEntries.length > 0) {
        const sum = dayEntries.reduce((acc, entry) => {
          return acc + moodValues[entry.mood as keyof typeof moodValues];
        }, 0);
        moodValue = sum / dayEntries.length;
      }
      
      data.push({
        date: dateStr,
        mood: moodValue
      });
    }
    
    return data;
  };
  
  const moodTrendData = generateMoodTrendData();
  
  // Count word frequency (placeholder)
  const getMostCommonWords = () => {
    if (entries.length === 0) return [];
    
    // In a real app, this would be more sophisticated
    return [
      { name: "work", value: 23 },
      { name: "family", value: 17 },
      { name: "exercise", value: 14 },
      { name: "goals", value: 12 },
      { name: "meditation", value: 10 }
    ];
  };
  
  const commonWords = getMostCommonWords();
  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#E5DEFF', '#F9F7FF'];
  
  return (
    <div className="container max-w-6xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Insights</h1>
        <p className="text-muted-foreground">
          Discover patterns and trends from your journaling practice
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle>Mood Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodTrendData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="date" />
                <YAxis
                  domain={[-1, 5]}
                  ticks={[-1, 0, 1, 2, 3, 4, 5]}
                  tickFormatter={(value) => {
                    const labels = {
                      '-1': 'Angry',
                      '0': 'Anxious',
                      '1': 'Sad',
                      '2': 'Neutral',
                      '3': 'Calm',
                      '4': 'Grateful',
                      '5': 'Joyful'
                    };
                    return labels[value as keyof typeof labels] || '';
                  }}
                />
                <Tooltip 
                  formatter={(value: any) => {
                    if (value === null) return ['No entry', ''];
                    const labels = {
                      '-1': 'Angry',
                      '0': 'Anxious',
                      '1': 'Sad',
                      '2': 'Neutral',
                      '3': 'Calm',
                      '4': 'Grateful',
                      '5': 'Joyful'
                    };
                    const mood = Math.round(value);
                    return [labels[mood as keyof typeof labels] || '', 'Mood'];
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#9b87f5" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle>Common Topics</CardTitle>
          </CardHeader>
          <CardContent className="h-[320px] flex items-center justify-center">
            {entries.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={commonWords}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {commonWords.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center">
                <p className="text-muted-foreground">Write more entries to see topic analysis</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <p className="text-muted-foreground mb-4">
            Our AI has analyzed your journal entries and identified these patterns and insights:
          </p>
          
          <div className="space-y-4">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-medium mb-2">You journal most consistently on weekends</h3>
              <p className="text-sm text-muted-foreground">
                Your entries tend to be longer and more reflective on Saturdays and Sundays.
              </p>
            </div>
            
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-medium mb-2">Morning entries have more positive sentiment</h3>
              <p className="text-sm text-muted-foreground">
                When you journal in the morning, your mood tends to be more positive than evening entries.
              </p>
            </div>
            
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-medium mb-2">Common themes: growth and reflection</h3>
              <p className="text-sm text-muted-foreground">
                Your writing frequently mentions personal growth goals and moments of reflection.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Insights;
