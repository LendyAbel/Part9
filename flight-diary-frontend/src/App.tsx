import { useEffect, useState } from 'react';
import diaryService from './services/diaryService';
import Header from './components/Header';
import Diaries from './components/Diary';
import NewEntryForm from './components/NewEntryForm';
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from './types';

function App() {
  const [data, setData] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAllEntries().then(data => {
      setData(data);
    });
  }, []);

  const entryCreation = (newEntry: NewDiaryEntry) => {
    diaryService.createEntry(newEntry).then(newEntry => {
      setData(data.concat(newEntry));
    });
  };

  return (
    <>
      <Header />
      <NewEntryForm entryCreation={entryCreation} />
      <Diaries entries={data} />
    </>
  );
}

export default App;
