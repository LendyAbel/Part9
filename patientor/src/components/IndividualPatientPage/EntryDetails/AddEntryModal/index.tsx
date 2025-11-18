import { Alert, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import AddEntryForm from './AddEntryForm';
import type { NewEntry } from '../../../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  return (
    <Dialog fullWidth={true} open={modalOpen}>
      <DialogTitle>Add new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity='error'>{error}</Alert>}
        <AddEntryForm onCancel={onClose} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
