
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: 'joyful' | 'grateful' | 'calm' | 'sad' | 'anxious' | 'angry' | 'neutral';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface JournalContextType {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEntry: (entry: JournalEntry) => void;
  deleteEntry: (id: string) => void;
  getEntryById: (id: string) => JournalEntry | undefined;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

interface JournalProviderProps {
  children: ReactNode;
}

// Sample initial entries
const initialEntries: JournalEntry[] = [
  {
    id: '1',
    title: 'First Journal Entry',
    content: 'Today was a productive day. I managed to finish the project I was working on and started planning for the next one.',
    mood: 'grateful',
    tags: ['work', 'productivity'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Reflections on Mindfulness',
    content: 'I practiced meditation for 20 minutes this morning. My mind was clearer throughout the day and I felt more present during conversations.',
    mood: 'calm',
    tags: ['meditation', 'mindfulness'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Feeling Overwhelmed',
    content: 'There\'s so much to do and I\'m not sure where to start. I need to organize my tasks better and take things one step at a time.',
    mood: 'anxious',
    tags: ['stress', 'planning'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const JournalProvider = ({ children }: JournalProviderProps) => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    return savedEntries ? JSON.parse(savedEntries) : initialEntries;
  });

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const timestamp = new Date().toISOString();
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    setEntries((prevEntries) => [newEntry, ...prevEntries]);
  };

  const updateEntry = (updatedEntry: JournalEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === updatedEntry.id
          ? { ...updatedEntry, updatedAt: new Date().toISOString() }
          : entry
      )
    );
  };

  const deleteEntry = (id: string) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
  };

  const getEntryById = (id: string) => {
    return entries.find((entry) => entry.id === id);
  };

  const value = {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntryById,
  };

  return <JournalContext.Provider value={value}>{children}</JournalContext.Provider>;
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};
