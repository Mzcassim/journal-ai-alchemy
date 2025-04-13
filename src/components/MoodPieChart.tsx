
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { JournalEntry } from '@/context/JournalContext';

interface MoodPieChartProps {
  entries: JournalEntry[];
}

const MoodPieChart = ({ entries }: MoodPieChartProps) => {
  const moodColors = {
    joyful: '#FFD166',
    grateful: '#06D6A0',
    calm: '#118AB2',
    sad: '#8A96A6',
    anxious: '#EF476F',
    angry: '#E63946',
    neutral: '#8E9196',
  };

  const moodCounts = entries.reduce<{ [key: string]: number }>((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(moodCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={moodColors[entry.name.toLowerCase() as keyof typeof moodColors]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MoodPieChart;
