import { useEffect, useState } from 'react';
import diaryService from './services/diaryService';
import Header from './components/Header';
import Diaries from './components/Diary';
import NewEntryForm from './components/NewEntryForm';
import ErrorNotification from './components/ErrorNotification';
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from './types';

function App() {
  const [data, setData] = useState<NonSensitiveDiaryEntry[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    diaryService.getAllEntries().then(data => {
      setData(data);
    });
  }, []);

  const clearError = () => {
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  const entryCreation = async (newEntry: NewDiaryEntry) => {
    try {
      const createdEntry = await diaryService.createEntry(newEntry);
      if (createdEntry) {
        setData(data.concat(createdEntry));
        setError('');
      }
    } catch (error) {
      if (typeof error === 'string') {
        setError(error);
      } else {
        setError('Something went wrong creating a new entry');
      }
      clearError();
    }
  };

  return (
    <>
      <Header />
      <ErrorNotification error={error} />
      <NewEntryForm entryCreation={entryCreation} />
      <Diaries entries={data} />
    </>
  );
}

export default App;
