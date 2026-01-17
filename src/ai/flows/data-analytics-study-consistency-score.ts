'use server';
/**
 * @fileOverview Calculates a study consistency score based on user activity.
 *
 * - calculateStudyConsistencyScore - A function that calculates the study consistency score.
 * - CalculateStudyConsistencyScoreInput - The input type for the calculateStudyConsistencyScore function.
 * - CalculateStudyConsistencyScoreOutput - The return type for the calculateStudyConsistencyScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateStudyConsistencyScoreInputSchema = z.object({
  activityHistory: z
    .array(z.object({
      date: z.string().describe('The date of the activity in ISO format.'),
      durationMinutes: z.number().describe('The duration of the activity in minutes.'),
      type: z.string().describe('The type of activity (e.g., studying, practice exams, etc.).'),
    }))
    .describe('An array of study activity history.'),
  expectedStudyHoursPerWeek: z.number().describe('The expected number of study hours per week.'),
});

export type CalculateStudyConsistencyScoreInput = z.infer<typeof CalculateStudyConsistencyScoreInputSchema>;

const CalculateStudyConsistencyScoreOutputSchema = z.object({
  consistencyScore: z
    .number()
    .describe('A score between 0 and 1 representing study consistency, where 1 is perfectly consistent.'),
  summary: z.string().describe('A short summary of the study consistency.'),
});

export type CalculateStudyConsistencyScoreOutput = z.infer<typeof CalculateStudyConsistencyScoreOutputSchema>;

export async function calculateStudyConsistencyScore(
  input: CalculateStudyConsistencyScoreInput
): Promise<CalculateStudyConsistencyScoreOutput> {
  return calculateStudyConsistencyScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'calculateStudyConsistencyScorePrompt',
  input: {schema: CalculateStudyConsistencyScoreInputSchema},
  output: {schema: CalculateStudyConsistencyScoreOutputSchema},
  prompt: `You are an AI assistant that analyzes a student's study activity and calculates a consistency score.

Given the following study activity history and expected study hours, calculate a consistency score between 0 and 1.
A score of 1 indicates perfect consistency, meaning the student consistently meets their expected study hours.
A score of 0 indicates no consistency.

Activity History:
{{#each activityHistory}}
- Date: {{date}}, Duration: {{durationMinutes}} minutes, Type: {{type}}
{{/each}}

Expected Study Hours Per Week: {{expectedStudyHoursPerWeek}}

Consider the following factors when calculating the score:
- Regularity of study sessions
- Deviation from expected study hours
- Consistency across different activity types

Provide a short summary of the student's study consistency.

Output format: { "consistencyScore": number, "summary": string }
Ensure that the consistencyScore is a number between 0 and 1, and summary explains the basis of the consistency score.
`,
});

const calculateStudyConsistencyScoreFlow = ai.defineFlow(
  {
    name: 'calculateStudyConsistencyScoreFlow',
    inputSchema: CalculateStudyConsistencyScoreInputSchema,
    outputSchema: CalculateStudyConsistencyScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
