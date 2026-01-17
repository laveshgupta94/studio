'use server';

/**
 * @fileOverview This file defines a Genkit flow for automatically creating a study timetable based on user courses and exam dates.
 *
 * - createStudyTimetable - A function that creates a study timetable.
 * - CreateStudyTimetableInput - The input type for the createStudyTimetable function.
 * - CreateStudyTimetableOutput - The return type for the createStudyTimetable function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateStudyTimetableInputSchema = z.object({
  courses: z
    .array(z.string())
    .describe('A list of courses the student is taking.'),
  examDates: z
    .record(z.string(), z.string())
    .describe(
      'A mapping of course names to exam dates in ISO 8601 format (YYYY-MM-DD).'
    ),
  studentPreferences: z
    .string()
    .optional()
    .describe(
      'Any student preferences to take into account when creating a timetable, such as time of day they prefer to study, or specific days they are busy.'
    ),
});
export type CreateStudyTimetableInput = z.infer<typeof CreateStudyTimetableInputSchema>;

const CreateStudyTimetableOutputSchema = z.object({
  timetable: z.string().describe('The generated study timetable.'),
});
export type CreateStudyTimetableOutput = z.infer<typeof CreateStudyTimetableOutputSchema>;

export async function createStudyTimetable(
  input: CreateStudyTimetableInput
): Promise<CreateStudyTimetableOutput> {
  return createStudyTimetableFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createStudyTimetablePrompt',
  input: {schema: CreateStudyTimetableInputSchema},
  output: {schema: CreateStudyTimetableOutputSchema},
  prompt: `You are an AI assistant that generates study timetables for college students.

  Create a study timetable based on the following information:

  Courses: {{courses}}
  Exam Dates: {{examDates}}
  Student Preferences: {{studentPreferences}}

  The study timetable should be realistic and easy to follow. Take into account the time needed to study for each exam and provide a schedule that helps the student prepare effectively.
`,
});

const createStudyTimetableFlow = ai.defineFlow(
  {
    name: 'createStudyTimetableFlow',
    inputSchema: CreateStudyTimetableInputSchema,
    outputSchema: CreateStudyTimetableOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
