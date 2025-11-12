import type { OccupationalHealthcareEntry } from '../../../types';

import { Work } from '@mui/icons-material';

interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntry = ({ entry }: OccupationalHealthcareEntryProps) => {
  return (
    <div>
      <p>
        {entry.date}
        <Work />
        {entry.employerName}
      </p>
      <i>{entry.description}</i>
      {entry.sickLeave && (
        <>
          <p>Sick Leave:</p>
          <p>Start: {entry.sickLeave.startDate}</p>
          <p>End: {entry.sickLeave.endDate}</p>
        </>
      )}
      <p>Diagnose by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcareEntry;
