
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { JournalProvider } from './context/JournalContext.tsx';

createRoot(document.getElementById("root")!).render(
  <JournalProvider>
    <App />
  </JournalProvider>
);
