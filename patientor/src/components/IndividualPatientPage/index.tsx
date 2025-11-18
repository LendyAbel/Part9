import { Female, Male, Transgender } from '@mui/icons-material';
import { ErrorResponse, type Diagnosis, type Gender, type NewEntry, type Patient } from '../../types';
import EntryDetails from './EntryDetails';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import AddEntryModal from './EntryDetails/AddEntryModal';
import axios from 'axios';
import patientService from '../../services/patients';

interface Props {
  patient: Patient | null | undefined;
  diagnoses: Diagnosis[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const IndividualPatientPage = ({ patient, diagnoses, setPatients }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string>();

  const errorHandler = (error: unknown) => {
    if (axios.isAxiosError<ErrorResponse>(error)) {
      const responseData = error.response?.data;
      if (responseData && typeof responseData === 'object' && 'error' in responseData) {
        const message = responseData.error.replace('Something went wrong. Error: ', '');
        console.error(message);
        setError(message);
      } else {
        setError('Unrecognized axios error');
      }
    } else {
      console.error('Unknown error', error);
      setError('Unknown error');
    }
  };

  if (!patient) {
    return <div>Pattient not found</div>;
  }
  const { name, gender, ssn, occupation, entries } = patient;

  const genderIcon = (gender: Gender) => {
    switch (gender) {
      case 'female':
        return <Female />;
        break;
      case 'male':
        return <Male />;
        break;
      default:
        return <Transgender />;
        break;
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const addEntry = async (value: NewEntry) => {
    const entry = await patientService.newEntry(patient.id, value);
    const patientUpdated = { ...patient, entries: patient.entries.concat(entry) };
    setPatients(prevState => prevState.map(p => (p.id === patientUpdated.id ? patientUpdated : p)));
    closeModal();
    setError('');
  };

  const submitNewEntry = async (value: NewEntry) => {
    try {
      await addEntry(value);
    } catch (error: unknown) {
      errorHandler(error);
      throw error;
    }
  };

  return (
    <div>
      <h3>
        {name}
        {genderIcon(gender)}
      </h3>
      <p>ssn: {ssn ? ssn : ''}</p>
      <p>occupation: {occupation}</p>

      <Button variant='contained' onClick={() => openModal()}>
        Add New Entry
      </Button>
      <AddEntryModal modalOpen={modalOpen} onClose={() => closeModal()} onSubmit={submitNewEntry} error={error} />
      <h3>Entries:</h3>
      <div>
        {entries.map(entry => {
          return (
            <div key={entry.id}>
              <EntryDetails entry={entry} diagnoses={diagnoses} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndividualPatientPage;
