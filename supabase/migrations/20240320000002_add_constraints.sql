-- Add constraints for data integrity
ALTER TABLE workout_logs
  ADD CONSTRAINT check_sets CHECK (sets > 0),
  ADD CONSTRAINT check_reps CHECK (reps > 0),
  ADD CONSTRAINT check_weight CHECK (weight >= 0);

ALTER TABLE workout_plans
  ADD CONSTRAINT check_duration_weeks CHECK (duration_weeks > 0);

ALTER TABLE exercises
  ADD CONSTRAINT check_difficulty_level CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  ADD CONSTRAINT check_muscle_group CHECK (muscle_group IN (
    'chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms',
    'core', 'legs', 'glutes', 'calves', 'full_body', 'cardio'
  )); 