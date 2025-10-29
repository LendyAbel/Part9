import type { NonSensitiveDiaryEntry } from '../types';
import Entry from './Entry';

interface DiaryProps {
  entries: NonSensitiveDiaryEntry[];
}

const Diary = ({ entries }: DiaryProps) => {
  return (
    <div>
      <h2>Diary Entries:</h2>
      {entries.map(entry => (
        <div key={entry.id}>
          <Entry entry={entry} />
        </div>
      ))}
    </div>
  );
};

export default Diary;
