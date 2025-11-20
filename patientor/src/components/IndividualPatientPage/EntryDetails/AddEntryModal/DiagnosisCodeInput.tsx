import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Diagnosis } from '../../../../types';
import { useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface DiagnosisCodeInputProps {
  diagnoses: Diagnosis[];
  label: string;
  onChange: (codes: Array<Diagnosis['code']>) => void;
}
const DiagnosisCodeInput = ({ diagnoses, label, onChange }: DiagnosisCodeInputProps) => {
  const [diagnosesCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);

  const handleChange = (event: SelectChangeEvent<Array<Diagnosis['code']>>) => {
    const {
      target: { value },
    } = event;
    const codes = typeof value === 'string' ? value.split(',') : value;
    setDiagnosisCodes(codes as Array<Diagnosis['code']>);
    onChange(codes);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id='diagnosis-codes-label'>Diagnosis Codes</InputLabel>
        <Select
          labelId='diagnosis-codes-label'
          id='diagnosis-multiple-checkbox'
          multiple
          value={diagnosesCodes}
          onChange={handleChange}
          label={label}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {diagnoses.map(diagnosis => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              <Checkbox checked={diagnosesCodes.includes(diagnosis.code)} />
              <ListItemText primary={`${diagnosis.code} ${diagnosis.name}`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DiagnosisCodeInput;
