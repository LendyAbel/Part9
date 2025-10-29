import { useEffect, useState } from 'react';
import diaryService from './services/diaryService';
import Diaries from './components/Diary';
import Header from './components/Header';
import type { NonSensitiveDiaryEntry } from './types';

function App() {
  const [data, setData] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAllEntries().then(data => {
      setData(data);
    });
  }, []);

  return (
    <>
      <Header />
      <Diaries entries={data} />
    </>
  );
}

export default App;
