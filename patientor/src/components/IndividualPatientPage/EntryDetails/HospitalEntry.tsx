import type { HospitalEntry } from '../../../types';

interface HospitalEntryProps {
  entry: HospitalEntry;
}

const HospitalEntry = ({ entry }: HospitalEntryProps) => {
  return (
    <div>
      <p>{entry.date}</p>
      <i>{entry.description}</i>
      <p>Discharge: {entry.discharge.date} </p>
      <i>{entry.discharge.criteria}</i>
      <p>Diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HospitalEntry;
