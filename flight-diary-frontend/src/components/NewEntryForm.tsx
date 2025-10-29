import { useState } from 'react';
import type { NewDiaryEntry, Visibility, Weather } from '../types';

interface NewEntryFormProps {
  entryCreation: (newEntry: NewDiaryEntry) => void;
}

const NewEntryForm = ({ entryCreation }: NewEntryFormProps) => {
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: '',
    visibility: '' as Visibility,
    weather: '' as Weather,
    comment: '',
  });

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    entryCreation(newEntry);
  };

  return (
    <div>
      <h2>Add new entry:</h2>
      <form onSubmit={handleSubmit}>
        <label className='block' htmlFor='date'>
          {' '}
          Date:{' '}
          <input
            id='date'
            value={newEntry.date}
            onChange={event => setNewEntry({ ...newEntry, date: event.target.value })}
            type='date'
            placeholder='aaaa-mm-dd'
          />
        </label>
        <label className='block' htmlFor='visibility'>
          {' '}
          Visibility:{' '}
          <input
            id='visibility'
            value={newEntry.visibility}
            onChange={event => setNewEntry({ ...newEntry, visibility: event.target.value as Visibility })}
            placeholder='great | good | ok | poor'
          />
        </label>
        <label className='block' htmlFor='weather'>
          {' '}
          Weather:{' '}
          <input
            id='weather'
            value={newEntry.weather}
            onChange={event => setNewEntry({ ...newEntry, weather: event.target.value as Weather })}
            placeholder='sunny | rainy | cloudy | stormy | windy'
          />
        </label>
        <label className='block' htmlFor='comment'>
          {' '}
          Comment:{' '}
          <input
            id='comment'
            value={newEntry.comment}
            onChange={event => setNewEntry({ ...newEntry, comment: event.target.value })}
            placeholder='How was the experience'
          />
        </label>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default NewEntryForm;
