const getBMICategory = (bmi: number): string => {
  if (bmi < 16.0) return 'Underweight (Severe thinness)'
  if (bmi >= 16.0 && bmi < 17.0) return 'Underweight (Moderate thinness)'
  if (bmi >= 17.0 && bmi < 18.5) return 'Underweight (Mild thinness)'
  if (bmi >= 18.5 && bmi < 25.0) return 'Normal range'
  if (bmi >= 25.0 && bmi < 30.0) return 'Overweight (Pre-obese)'
  if (bmi >= 30.0 && bmi < 35.0) return 'Obese (Class I)'
  if (bmi >= 35.0 && bmi < 40.0) return 'Obese (Class II)'
  if (bmi >= 40.0) return 'Obese (Class III)'
}

const calculateBmi = (height: number, weight: number): string => {
  const heihtInMeters = height / 100
  const bmi = weight / (heihtInMeters ^ 2)
  return getBMICategory(bmi)
}

const height = Number(process.argv[2])
const weight = Number(process.argv[3])

console.log(calculateBmi(height, weight))
