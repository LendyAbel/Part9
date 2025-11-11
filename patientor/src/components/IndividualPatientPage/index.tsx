import { Female, Male, Transgender } from '@mui/icons-material';
import { Diagnosis, Gender, Patient } from '../../types';

interface Props {
  patient: Patient | null | undefined;
  diagnoses: Diagnosis[];
}

const IndividualPatientPage = ({ patient, diagnoses }: Props) => {
  if (!patient) {
    return <div>Pattient not found</div>;
  }
  const { name, gender, ssn, occupation, entries } = patient;

  const genderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Female:
        return <Female />;
        break;
      case Gender.Male:
        return <Male />;
        break;
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
      <div>
        {entries.map(({ date, description, diagnosisCodes, id }) => {
          return (
            <div key={id}>
              <p>
                {date} <i>{description}</i>
              </p>
              <ul>
                {diagnosisCodes?.map(code => (
                  <li key={code}>
                    {code}{' '}
                    {
                      diagnoses.find(d => {
                        return d.code === code;
                      })?.name
                    }
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndividualPatientPage;
