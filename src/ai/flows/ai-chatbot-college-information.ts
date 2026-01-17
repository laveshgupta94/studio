'use server';

/**
 * @fileOverview An AI chatbot flow for answering questions about college events and deadlines.
 *
 * - collegeInformationChatbot - A function that handles the chatbot interactions.
 * - CollegeInformationChatbotInput - The input type for the collegeInformationChatbot function.
 * - CollegeInformationChatbotOutput - The return type for the collegeInformationChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CollegeInformationChatbotInputSchema = z.object({
  query: z.string().describe('The user query about college events or deadlines.'),
});
export type CollegeInformationChatbotInput = z.infer<typeof CollegeInformationChatbotInputSchema>;

const CollegeInformationChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type CollegeInformationChatbotOutput = z.infer<typeof CollegeInformationChatbotOutputSchema>;

export async function collegeInformationChatbot(input: CollegeInformationChatbotInput): Promise<CollegeInformationChatbotOutput> {
  return collegeInformationChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'collegeInformationChatbotPrompt',
  input: {schema: CollegeInformationChatbotInputSchema},
  output: {schema: CollegeInformationChatbotOutputSchema},
  prompt: `You are a helpful AI chatbot providing information about college events and deadlines.

  Respond to the following user query:
  {{query}}
  `,
});

const collegeInformationChatbotFlow = ai.defineFlow(
  {
    name: 'collegeInformationChatbotFlow',
    inputSchema: CollegeInformationChatbotInputSchema,
    outputSchema: CollegeInformationChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
