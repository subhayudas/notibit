/*
  # Initial Schema Setup for Notibit

  1. New Tables
    - `notes`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `file_url` (text)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `notes` table
    - Add policies for:
      - Users can read all notes
      - Users can only create/update/delete their own notes
*/

CREATE TABLE notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Allow users to read all notes
CREATE POLICY "Anyone can read notes"
  ON notes
  FOR SELECT
  USING (true);

-- Allow authenticated users to create notes
CREATE POLICY "Authenticated users can create notes"
  ON notes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own notes
CREATE POLICY "Users can update their own notes"
  ON notes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own notes
CREATE POLICY "Users can delete their own notes"
  ON notes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);