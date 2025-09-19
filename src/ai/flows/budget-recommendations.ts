'use server';

/**
 * @fileOverview Provides budget recommendations based on user spending habits.
 *
 * - getBudgetRecommendations - A function that provides budget recommendations.
 * - BudgetRecommendationsInput - The input type for the getBudgetRecommendations function.
 * - BudgetRecommendationsOutput - The return type for the getBudgetRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransactionSchema = z.object({
  category: z.string().describe('The category of the transaction (e.g., Food, Travel, Bills).'),
  amount: z.number().describe('The amount of the transaction.'),
  date: z.string().describe('The date of the transaction.'),
});

const BudgetRecommendationsInputSchema = z.object({
  monthlyBudget: z.number().describe('The user\'s total monthly budget.'),
  transactions: z.array(TransactionSchema).describe('The user\'s transaction history.'),
  savingGoal: z.number().optional().describe('The users saving goal amount'),
  income: z.number().describe('The users income'),
});
export type BudgetRecommendationsInput = z.infer<typeof BudgetRecommendationsInputSchema>;

const BudgetRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.string().describe('A specific recommendation for adjusting the budget or saving more money.')
  ).describe('A list of personalized budget recommendations.'),
});
export type BudgetRecommendationsOutput = z.infer<typeof BudgetRecommendationsOutputSchema>;

export async function getBudgetRecommendations(input: BudgetRecommendationsInput): Promise<BudgetRecommendationsOutput> {
  return budgetRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'budgetRecommendationsPrompt',
  input: {schema: BudgetRecommendationsInputSchema},
  output: {schema: BudgetRecommendationsOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the user's spending habits and provide personalized recommendations for adjusting their budget and saving more money.

  Here's the user's monthly budget: {{{monthlyBudget}}}
  Here's the user's income: {{{income}}}
  Here's the user's saving goal: {{{savingGoal}}}
  Here's the user's transaction history:
  {{#each transactions}}
  - Category: {{{category}}}, Amount: {{{amount}}}, Date: {{{date}}}
  {{/each}}

  Provide specific and actionable recommendations to help the user save more money and achieve their financial goals. Consider suggesting cuts to specific categories or alternative saving strategies.
  Limit your suggestions to maximum of 5. Each recommendation should be less than 20 words.
  `,
});

const budgetRecommendationsFlow = ai.defineFlow(
  {
    name: 'budgetRecommendationsFlow',
    inputSchema: BudgetRecommendationsInputSchema,
    outputSchema: BudgetRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
