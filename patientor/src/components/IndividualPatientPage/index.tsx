import { Female, Male, Transgender } from '@mui/icons-material';
import { Gender, Patient } from '../../types';

interface Props {
  patient: Patient | null | undefined;
}

const IndividualPatientPage = ({ patient }: Props) => {
  if (!patient) {
    return <div>Pattient not found</div>;
  }
  const { name, gender, ssn, occupation } = patient;

  const genderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Female:
        return <Female />;
        break;
      case Gender.Male:
        return <Male />;
      default:
        return <Transgender />;
        break;
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
    </div>
  );
};

export default IndividualPatientPage;
