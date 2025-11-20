import { Alert, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import AddEntryForm from './AddEntryForm';
import type { Diagnosis, NewEntry } from '../../../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
  diagnoses: Diagnosis[];
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, diagnoses }: Props) => {
  return (
    <Dialog fullWidth={true} open={modalOpen}>
      <DialogTitle>Add new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity='error'>{error}</Alert>}
        <AddEntryForm onCancel={onClose} onSubmit={onSubmit} diagnoses={diagnoses} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
