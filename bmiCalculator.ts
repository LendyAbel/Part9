import { getBMICategory } from './helper';
import { parseArgumentsBmi } from './helper';

const calculateBmi = (height: number, weight: number): string => {
  const heihtInMeters = height / 100;
  const bmi = weight / (heihtInMeters ^ 2);
  return getBMICategory(bmi);
};

if (require.main === module) {
  try {
    const { height, weight } = parseArgumentsBmi(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happend.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;
