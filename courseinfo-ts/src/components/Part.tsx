import type { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ part }: PartProps) => {
  const contentToShow = () => {
    switch (part.kind) {
      case 'basic':
        return (
          <div className='part'>
            <p>
              <strong>
                {part.name} {part.exerciseCount}
              </strong>
            </p>
            <p className='description'>{part.description}</p>
          </div>
        );
        break;
      case 'group':
        return (
          <div className='part'>
            <p>
              <strong>
                {part.name} {part.exerciseCount}
              </strong>
            </p>
            <p>project exercises {part.groupProjectCount}</p>
          </div>
        );
        break;
      case 'background':
        return (
          <div className='part'>
            <p>
              <strong>
                {part.name} {part.exerciseCount}
              </strong>
            </p>
            <p className='description'>{part.description}</p>
            <p>submit to {part.backgroundMaterial}</p>
          </div>
        );
        break;
      case 'special':
        return (
          <div className='part'>
            <p>
              <strong>
                {part.name} {part.exerciseCount}
              </strong>
            </p>
            <p className='description'>{part.description}</p>
            <p>
              required skils:{' '}
              {part.requirements.map((r, index) => (
                <span key={index}>
                  {r}
                  {index < part.requirements.length - 1 && ', '}
                </span>
              ))}
            </p>
          </div>
        );
        break;
      default:
        return assertNever(part);
        break;
    }
  };
  return <div>{contentToShow()}</div>;
};

export default Part;
