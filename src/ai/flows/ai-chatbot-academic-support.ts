'use server';
/**
 * @fileOverview An AI chatbot for providing academic support.
 *
 * - academicSupportChatbot - A function that handles the chatbot interactions.
 * - AcademicSupportChatbotInput - The input type for the academicSupportChatbot function.
 * - AcademicSupportChatbotOutput - The return type for the academicSupportChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AcademicSupportChatbotInputSchema = z.object({
  query: z.string().describe('The user query for academic support.'),
  collegeData: z.string().optional().describe('College data to be used.'),
});
export type AcademicSupportChatbotInput = z.infer<typeof AcademicSupportChatbotInputSchema>;

const AcademicSupportChatbotOutputSchema = z.object({
  response: z.string().describe('The response from the AI chatbot.'),
});
export type AcademicSupportChatbotOutput = z.infer<typeof AcademicSupportChatbotOutputSchema>;

export async function academicSupportChatbot(input: AcademicSupportChatbotInput): Promise<AcademicSupportChatbotOutput> {
  return academicSupportChatbotFlow(input);
}

const academicSupportPrompt = ai.definePrompt({
  name: 'academicSupportPrompt',
  input: {schema: AcademicSupportChatbotInputSchema},
  output: {schema: AcademicSupportChatbotOutputSchema},
  prompt: `You are an AI chatbot designed to provide academic support to students.
  You can provide explanations, summaries, and answer questions related to course material.
  Utilize the college data if provided to provide help with college related questions like exams, events, or attendance.

  User Query: {{{query}}}

  College Data: {{{collegeData}}}

  Response: `,
});

const academicSupportChatbotFlow = ai.defineFlow(
  {
    name: 'academicSupportChatbotFlow',
    inputSchema: AcademicSupportChatbotInputSchema,
    outputSchema: AcademicSupportChatbotOutputSchema,
  },
  async input => {
    const {output} = await academicSupportPrompt(input);
    return output!;
  }
);
