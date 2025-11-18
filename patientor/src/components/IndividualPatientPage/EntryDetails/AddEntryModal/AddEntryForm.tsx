import { Button, FormControl, Grid, TextField } from '@mui/material';
import type { NewEntry } from '../../../../types';
import { SyntheticEvent, useState } from 'react';

interface EntryFormProps {
  onCancel: () => void;
  onSubmit: (value: NewEntry) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: EntryFormProps) => {
  const [entryData, setEntryData] = useState<NewEntry>({ type: 'HealthCheck' } as NewEntry);

  if (entryData.type !== 'HealthCheck') {
    return <div>Form for type {entryData.type} not implemented yet</div>;
  }

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await onSubmit(entryData);
      setEntryData({ type: 'HealthCheck' } as NewEntry);
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const handleHealthCheckRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setEntryData({ ...entryData, healthCheckRating: value });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <FormControl fullWidth style={{ gap: 10 }}>
          <TextField
            label='Description'
            fullWidth
            value={entryData.description}
            onChange={({ target }) => setEntryData({ ...entryData, description: target.value })}
          />
          <TextField
            label='Date'
            fullWidth
            value={entryData.date}
            onChange={({ target }) => setEntryData({ ...entryData, date: target.value })}
          />
          <TextField
            label='Specialist'
            fullWidth
            value={entryData.specialist}
            onChange={({ target }) => setEntryData({ ...entryData, specialist: target.value })}
          />
          <TextField
            label='Diagnosis Codes'
            fullWidth
            value={entryData.diagnosisCodes?.join(', ')}
            onChange={({ target }) =>
              setEntryData({ ...entryData, diagnosisCodes: target.value.split(',').map(code => code.trim()) })
            }
          />
          <TextField
            label='Health Check Rating'
            fullWidth
            value={entryData.healthCheckRating}
            onChange={handleHealthCheckRatingChange}
          />
        </FormControl>

        {/* Buttons */}
        <Grid>
          <Grid item>
            <Button color='secondary' variant='contained' style={{ float: 'left' }} type='button' onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type='submit'
              variant='contained'
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
