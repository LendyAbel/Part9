import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises, { HoursPerDay } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight) || !height || !weight) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const bmi = calculateBmi(height, weight);
  return res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  const dailyExercises = daily_exercises as HoursPerDay;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  if (!Array.isArray(daily_exercises) || isNaN(Number(target))){
    return res.status(400).json({ error: 'malformatted parameters' });
  }
    return res.json(calculateExercises(dailyExercises, Number(target)));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
