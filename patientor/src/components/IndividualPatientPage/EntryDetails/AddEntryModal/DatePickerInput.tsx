import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DatePickerInputProps {
  label?: string;
  value: string;
  onChange: (date: string) => void;
}

const DatePickerInput = ({ label, value, onChange }: DatePickerInputProps) => {
  const today = dayjs(new Date());

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange(newValue.format('YYYY-MM-DD'));
    }
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label || 'Date'}
          sx={{ width: '100%' }}
          referenceDate={today}
          value={value ? dayjs(value) : null}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePickerInput;
