import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import type { Diagnosis, NewEntry } from '../../../../types';
import { SyntheticEvent, useState } from 'react';

interface EntryFormProps {
  onCancel: () => void;
  onSubmit: (value: NewEntry) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: EntryFormProps) => {
  const [entryData, setEntryData] = useState<NewEntry>({
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [] as Array<Diagnosis['code']>,
    type: '' as NewEntry['type'],
  } as NewEntry);

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await onSubmit(entryData);
      setEntryData({ type: '' as NewEntry['type'] } as NewEntry);
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value as NewEntry['type'];
    const baseData = {
      description: entryData.description,
      date: entryData.date,
      specialist: entryData.specialist,
      diagnosisCodes: entryData.diagnosisCodes,
      type,
    };

    switch (type) {
      case 'Hospital':
        setEntryData({
          ...baseData,
          discharge: { date: '', criteria: '' },
        } as NewEntry);
        break;
      case 'OccupationalHealthcare':
        setEntryData({
          ...baseData,
          employerName: '',
          sickLeave: { startDate: '', endDate: '' },
        } as NewEntry);
        break;
      case 'HealthCheck':
        setEntryData({
          ...baseData,
          healthCheckRating: 0,
        } as NewEntry);
        break;
      default:
        setEntryData(baseData as NewEntry);
    }
  };

  const handleHealthCheckRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setEntryData({ ...entryData, healthCheckRating: value } as NewEntry);
  };

  const HospitalForm = () => {
    if (entryData.type === 'Hospital') {
      return (
        <div>
          <FormLabel>Discharge</FormLabel>
          <TextField
            label='Date'
            fullWidth
            value={entryData.discharge.date}
            onChange={({ target }) =>
              setEntryData({ ...entryData, discharge: { ...entryData.discharge, date: target.value } } as NewEntry)
            }
          />
          <TextField
            label='Criteria'
            fullWidth
            value={entryData.discharge.criteria}
            onChange={({ target }) =>
              setEntryData({ ...entryData, discharge: { ...entryData.discharge, criteria: target.value } } as NewEntry)
            }
          />
        </div>
      );
    }
  };
  const OccupationalForm = () => {
    if (entryData.type === 'OccupationalHealthcare') {
      return (
        <div>
          <TextField
            label='Employer Name'
            fullWidth
            value={entryData.employerName}
            onChange={({ target }) => setEntryData({ ...entryData, employerName: target.value } as NewEntry)}
          />
          <FormLabel>Sick Leave</FormLabel>
          <TextField
            label='Start Date'
            fullWidth
            value={entryData.sickLeave?.startDate || ''}
            onChange={({ target }) =>
              setEntryData({
                ...entryData,
                sickLeave: { ...entryData.sickLeave, startDate: target.value },
              } as NewEntry)
            }
          />
          <TextField
            label='End Date'
            fullWidth
            value={entryData.sickLeave?.endDate || ''}
            onChange={({ target }) =>
              setEntryData({
                ...entryData,
                sickLeave: { ...entryData.sickLeave, endDate: target.value },
              } as NewEntry)
            }
          />
        </div>
      );
    }
  };
  const HealthCheckFrom = () => {
    if (entryData.type === 'HealthCheck') {
      return (
        <div>
          <TextField
            label='Health Check Rating'
            fullWidth
            value={entryData.healthCheckRating}
            onChange={handleHealthCheckRatingChange}
          />
        </div>
      );
    }
  };

  const typeForm = () => {
    switch (entryData.type) {
      case 'Hospital':
        return HospitalForm();
      case 'OccupationalHealthcare':
        return OccupationalForm();
      case 'HealthCheck':
        return HealthCheckFrom();
      default:
        return null;
    }
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
          <RadioGroup value={entryData.type} onChange={handleTypeChange}>
            <div>
              <FormControlLabel value={'Hospital'} control={<Radio />} label='Hospital' />
              <FormControlLabel value={'OccupationalHealthcare'} control={<Radio />} label='Occupational Healthcare' />
              <FormControlLabel value={'HealthCheck'} control={<Radio />} label='Health Check' />
            </div>
          </RadioGroup>
          {/* {entryData.type === 'HealthCheck' && (
            <TextField
              label='Health Check Rating'
              fullWidth
              value={entryData.healthCheckRating}
              onChange={handleHealthCheckRatingChange}
            />
          )} */}
          {typeForm()}
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
