import type { HealthCheckEntry, HealthCheckRating } from '../../../types';
import { Favorite, Medication } from '@mui/icons-material';

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
}

const healthCheackRating = (rating: HealthCheckRating) => {
  switch (rating) {
    case 0:
      return <Favorite style={{ color: 'green' }} />;
    case 1:
      return <Favorite style={{ color: 'yellow' }} />;
    case 2:
      return <Favorite style={{ color: 'orange' }} />;
    case 3:
      return <Favorite style={{ color: 'red' }} />;
    default:
      return null;
  }
};

const HealthCheckEntry = ({ entry }: HealthCheckEntryProps) => {
  return (
    <div>
      <p>
        {entry.date}
        <Medication />
      </p>
      <i>{entry.description}</i>
      <p>{healthCheackRating(entry.healthCheckRating)}</p>
      <p>Diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntry;
