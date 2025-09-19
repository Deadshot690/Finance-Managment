'use client';

import { useState, useTransition } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { getBudgetRecommendations } from '@/ai/flows/budget-recommendations';
import type { BudgetRecommendationsInput, BudgetRecommendationsOutput } from '@/ai/flows/budget-recommendations';
import type { TransactionHistoryItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Lightbulb, Loader2 } from 'lucide-react';
import { transactions } from '@/lib/placeholder-data';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';


const exampleInput: BudgetRecommendationsInput = {
    monthlyBudget: 3000,
    transactions: transactions.filter(t => t.type === 'expense').map(t => ({
        category: t.category,
        amount: t.amount,
        date: t.date
    })) as TransactionHistoryItem[],
    income: 5750,
    savingGoal: 1000,
};

export function BudgetRecommendations() {
  const [recommendations, setRecommendations] = useState<BudgetRecommendationsOutput | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGetRecommendations = () => {
    startTransition(async () => {
      const result = await getBudgetRecommendations(exampleInput);
      setRecommendations(result);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Budget Advisor</CardTitle>
        <CardDescription>Get personalized tips to improve your budget.</CardDescription>
      </CardHeader>
      <CardContent>
        {!recommendations && (
             <Button onClick={handleGetRecommendations} disabled={isPending} className="w-full">
             {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
             ) : (
                <Lightbulb className="mr-2 h-4 w-4" />
             )}
             Generate Recommendations
           </Button>
        )}

        {isPending && !recommendations && (
            <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground text-center">Our AI is analyzing your spending habits...</p>
            </div>
        )}

        {recommendations && (
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Here are your recommendations!</AlertTitle>
            <AlertDescription>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                {recommendations.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
