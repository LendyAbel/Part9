interface BmiValues {
  height: number;
  weight: number;
}

interface ExercisesValues {
  target: number;
  hoursPerDay: number[];
}

const isNotNumber = (value: unknown): boolean => {
  return isNaN(Number(value));
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 16.0) return 'Underweight (Severe thinness)';
  if (bmi >= 16.0 && bmi < 17.0) return 'Underweight (Moderate thinness)';
  if (bmi >= 17.0 && bmi < 18.5) return 'Underweight (Mild thinness)';
  if (bmi >= 18.5 && bmi < 25.0) return 'Normal range';
  if (bmi >= 25.0 && bmi < 30.0) return 'Overweight (Pre-obese)';
  if (bmi >= 30.0 && bmi < 35.0) return 'Obese (Class I)';
  if (bmi >= 35.0 && bmi < 40.0) return 'Obese (Class II)';
  if (bmi >= 40.0) return 'Obese (Class III)';
  return 'Unkown BMI value';
};

export const parseArgumentsBmi = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return { height: Number(args[2]), weight: Number(args[3]) };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const parseArgumentsExercises = (args: string[]): ExercisesValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = args[2];
  const hours = args.slice(3);

  if (isNotNumber(target)) {
    throw new Error('Target value is not a number');
  }
  hours.forEach(arg => {
    if (isNotNumber(arg)) {
      throw new Error('One of the provided values is not a number');
    }
  });
  return { target: Number(target), hoursPerDay: hours.map(Number) };
};
