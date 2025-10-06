interface Result {
  periodLength: number
  trainingDays: number
  target: number
  average: number
  success: boolean
  rating: 1 | 2 | 3
  ratingDescriptiong: string
}
const calculateExercises = (hoursPerDay: number[], target: number): Result => {
  const periodLength = hoursPerDay.length
  const trainingDays = hoursPerDay.filter(day => day > 0).length
  const average = hoursPerDay.reduce((acc, hour) => acc + hour, 0) / periodLength
  const success = average >= target
  let rating: 1 | 2 | 3
  let ratingDescriptiong: string
  if (average >= target) (rating = 3), (ratingDescriptiong = 'Great job, you met your target!')
  else if (average >= target * 0.75) (rating = 2), (ratingDescriptiong = 'Not too bad but could be better')
  else (rating = 1), (ratingDescriptiong = 'You need to work harder')

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescriptiong,
    target,
    average,
  }
}

const target = Number(process.argv[2])
const hoursPerDay = process.argv.slice(3).map(Number)

console.log(calculateExercises(hoursPerDay, target))
