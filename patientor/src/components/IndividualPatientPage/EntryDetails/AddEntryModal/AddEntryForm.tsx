import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import type { Diagnosis, NewEntry } from '../../../../types';
import { SyntheticEvent, useState } from 'react';
import DatePickerInput from './DatePickerInput';
import DiagnosisCodeInput from './DiagnosisCodeInput';

interface EntryFormProps {
  onCancel: () => void;
  onSubmit: (value: NewEntry) => void;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: EntryFormProps) => {
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

  const handleDiagnosisCodesChange = (codes: Array<Diagnosis['code']>) => {
    setEntryData({ ...entryData, diagnosisCodes: codes } as NewEntry);
  };

  const HospitalForm = () => {
    
    if (entryData.type === 'Hospital') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '5px' }}>
          <FormLabel>Discharge</FormLabel>
          <DatePickerInput
            label='Date'
            value={entryData.discharge.date}
            onChange={date => setEntryData({ ...entryData, discharge: { ...entryData.discharge, date } })}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '5px' }}>
          <TextField
            label='Employer Name'
            fullWidth
            value={entryData.employerName}
            onChange={({ target }) => setEntryData({ ...entryData, employerName: target.value } as NewEntry)}
          />
          <FormLabel>Sick Leave</FormLabel>
          <Stack direction='row' spacing={2}>
            <DatePickerInput
              label='Start Date'
              value={entryData.sickLeave?.startDate || ''}
              onChange={date =>
                setEntryData({ ...entryData, sickLeave: { ...entryData.sickLeave, startDate: date } } as NewEntry)
              }
            />
            <DatePickerInput
              label='End Date'
              value={entryData.sickLeave?.endDate || ''}
              onChange={date =>
                setEntryData({ ...entryData, sickLeave: { ...entryData.sickLeave, endDate: date } } as NewEntry)
              }
            />
          </Stack>
        </div>
      );
    }
  };
  const HealthCheckFrom = () => {
    if (entryData.type === 'HealthCheck') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '5px' }}>
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
          <DatePickerInput
            label='Date'
            value={entryData.date}
            onChange={date => setEntryData({ ...entryData, date })}
          />
          <TextField
            label='Specialist'
            fullWidth
            value={entryData.specialist}
            onChange={({ target }) => setEntryData({ ...entryData, specialist: target.value })}
          />
          <DiagnosisCodeInput label='Diagnosis Codes' diagnoses={diagnoses} onChange={handleDiagnosisCodesChange} />
          <RadioGroup value={entryData.type} onChange={handleTypeChange}>
            <div>
              <FormControlLabel value={'Hospital'} control={<Radio />} label='Hospital' />
              <FormControlLabel value={'OccupationalHealthcare'} control={<Radio />} label='Occupational Healthcare' />
              <FormControlLabel value={'HealthCheck'} control={<Radio />} label='Health Check' />
            </div>
          </RadioGroup>

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
