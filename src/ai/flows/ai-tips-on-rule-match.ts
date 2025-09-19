'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing AI saving tips based on user-defined rules and transaction history.
 *
 * - `getAiSavingTips` -  A function that takes transaction history and user-defined rules as input and returns saving tips.
 * - `AiSavingTipsInput` - The input type for the `getAiSavingTips` function.
 * - `AiSavingTipsOutput` - The return type for the `getAiSavingTips` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSavingTipsInputSchema = z.object({
  transactionHistory: z.string().describe('A string containing the user transaction history.'),
  rules: z.string().describe('A string containing the user-defined rules for saving tips.'),
});
export type AiSavingTipsInput = z.infer<typeof AiSavingTipsInputSchema>;

const AiSavingTipsOutputSchema = z.object({
  tips: z.string().describe('A string containing the AI-generated saving tips based on the rules and transaction history.'),
});
export type AiSavingTipsOutput = z.infer<typeof AiSavingTipsOutputSchema>;

export async function getAiSavingTips(input: AiSavingTipsInput): Promise<AiSavingTipsOutput> {
  return aiSavingTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSavingTipsPrompt',
  input: {schema: AiSavingTipsInputSchema},
  output: {schema: AiSavingTipsOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the user's transaction history and provide saving tips based on their defined rules.

Transaction History: {{{transactionHistory}}}

Rules: {{{rules}}}

Tips:`,
});

const aiSavingTipsFlow = ai.defineFlow(
  {
    name: 'aiSavingTipsFlow',
    inputSchema: AiSavingTipsInputSchema,
    outputSchema: AiSavingTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
