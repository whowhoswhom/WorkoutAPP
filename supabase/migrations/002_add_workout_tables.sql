-- Create workouts table
CREATE TABLE IF NOT EXISTS workouts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  duration INTEGER, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create exercises table
CREATE TABLE IF NOT EXISTS exercises (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sets INTEGER,
  reps INTEGER,
  weight DECIMAL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own workouts" ON workouts;
DROP POLICY IF EXISTS "Users can create own workouts" ON workouts;
DROP POLICY IF EXISTS "Users can update own workouts" ON workouts;
DROP POLICY IF EXISTS "Users can delete own workouts" ON workouts;
DROP POLICY IF EXISTS "Users can view own exercises" ON exercises;
DROP POLICY IF EXISTS "Users can create own exercises" ON exercises;
DROP POLICY IF EXISTS "Users can update own exercises" ON exercises;
DROP POLICY IF EXISTS "Users can delete own exercises" ON exercises;

-- Create policies for workouts
CREATE POLICY "Users can view own workouts" 
  ON workouts FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own workouts" 
  ON workouts FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workouts" 
  ON workouts FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own workouts" 
  ON workouts FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for exercises
CREATE POLICY "Users can view own exercises" 
  ON exercises FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM workouts 
    WHERE workouts.id = exercises.workout_id 
    AND workouts.user_id = auth.uid()
  ));

CREATE POLICY "Users can create own exercises" 
  ON exercises FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM workouts 
    WHERE workouts.id = exercises.workout_id 
    AND workouts.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own exercises" 
  ON exercises FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM workouts 
    WHERE workouts.id = exercises.workout_id 
    AND workouts.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own exercises" 
  ON exercises FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM workouts 
    WHERE workouts.id = exercises.workout_id 
    AND workouts.user_id = auth.uid()
  )); 