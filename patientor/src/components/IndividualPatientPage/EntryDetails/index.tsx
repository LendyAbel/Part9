import { assertNever } from '../../../helper';
import type { Diagnosis, Entry } from '../../../types';

import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import HealthCheckEntry from './HealthCheckEntry';

import { Card } from '@mui/material';

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const entryType = (entry: Entry) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
      break;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
      break;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;
      break;
    default:
      return assertNever(entry);
  }
};

const EntryDetails = ({ entry, diagnoses }: EntryProps) => {
  return (
    <Card variant='outlined' sx={{ padding: 2 }}>
      {entryType(entry)}
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li key={code}>
            {code}{' '}
            {
              diagnoses.find(d => {
                return d.code === code;
              })?.name
            }
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default EntryDetails;
