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

  const handleRadioButtons = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEntry({ ...newEntry, [name]: value });
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
            required
          />
        </label>
        <label className='block' htmlFor='visibility'>
          {' '}
          Visibility:{' '}
          <div className='radio'>
            <input type='radio' id='great' name='visibility' value='great' required onChange={handleRadioButtons} />
            <label htmlFor='great'> great </label>
          </div>
          <div className='radio'>
            <input type='radio' id='good' name='visibility' value='good' onChange={handleRadioButtons} />
            <label htmlFor='good'> good </label>
          </div>
          <div className='radio'>
            <input type='radio' id='ok' name='visibility' value='ok' onChange={handleRadioButtons} />
            <label htmlFor='ok'> ok </label>
          </div>
          <div className='radio'>
            <input type='radio' id='poor' name='visibility' value='poor' onChange={handleRadioButtons} />
            <label htmlFor='poor'> poor </label>
          </div>
          {/* <input
            id='visibility'
            value={newEntry.visibility}
            onChange={event => setNewEntry({ ...newEntry, visibility: event.target.value as Visibility })}
            placeholder='great | good | ok | poor'
          /> */}
        </label>
        <label className='block' htmlFor='weather'>
          {' '}
          Weather:{' '}
          <div className='radio'>
            <input type='radio' id='sunny' name='weather' value='sunny' required onChange={handleRadioButtons} />
            <label htmlFor='sunny'> sunny </label>
          </div>
          <div className='radio'>
            <input type='radio' id='rainy' name='weather' value='rainy' onChange={handleRadioButtons} />
            <label htmlFor='rainy'> rainy </label>
          </div>
          <div className='radio'>
            <input type='radio' id='cloudy' name='weather' value='cloudy' onChange={handleRadioButtons} />
            <label htmlFor='cloudy'> cloudy </label>
          </div>
          <div className='radio'>
            <input type='radio' id='stormy' name='weather' value='stormy' onChange={handleRadioButtons} />
            <label htmlFor='stormy'> stormy </label>
          </div>
          <div className='radio'>
            <input type='radio' id='windy' name='weather' value='windy' onChange={handleRadioButtons} />
            <label htmlFor='windy'> windy </label>
          </div>
          {/* <input
            id='weather'
            value={newEntry.weather}
            onChange={event => setNewEntry({ ...newEntry, weather: event.target.value as Weather })}
            placeholder='sunny | rainy | cloudy | stormy | windy'
          /> */}
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
