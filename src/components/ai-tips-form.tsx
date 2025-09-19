'use client';

import { useState, useTransition } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { getAiSavingTips } from '@/ai/flows/ai-tips-on-rule-match';
import type { AiSavingTipsInput, AiSavingTipsOutput } from '@/ai/flows/ai-tips-on-rule-match';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const defaultTransactionHistory = `
- Category: Food, Amount: 15.00, Date: 2024-07-28
- Category: Coffee, Amount: 5.50, Date: 2024-07-28
- Category: Food, Amount: 22.75, Date: 2024-07-27
- Category: Transport, Amount: 10.00, Date: 2024-07-27
- Category: Shopping, Amount: 89.99, Date: 2024-07-26
- Category: Coffee, Amount: 4.75, Date: 2024-07-26
`.trim();

const defaultRules = `
- If I spend more than $50 on "Shopping" in a single transaction, suggest finding a discount code next time.
- If I buy coffee more than 3 times a week, suggest making coffee at home.
`.trim();


export function AiTipsForm() {
  const [tips, setTips] = useState<AiSavingTipsOutput | null>(null);
  const [transactionHistory, setTransactionHistory] = useState(defaultTransactionHistory);
  const [rules, setRules] = useState(defaultRules);
  const [isPending, startTransition] = useTransition();

  const handleGetTips = () => {
    const input: AiSavingTipsInput = { transactionHistory, rules };
    startTransition(async () => {
      const result = await getAiSavingTips(input);
      setTips(result);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saving Tip Generator</CardTitle>
        <CardDescription>
          Adjust the rules and transaction history below to generate custom tips.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
            <Label htmlFor="rules">Your Rules</Label>
            <Textarea 
                id="rules" 
                value={rules}
                onChange={(e) => setRules(e.target.value)}
                rows={4}
                className="font-mono text-sm"
            />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="transactions">Transaction History</Label>
            <Textarea 
                id="transactions"
                value={transactionHistory}
                onChange={(e) => setTransactionHistory(e.target.value)}
                rows={8}
                className="font-mono text-sm"
            />
        </div>
        {tips && (
            <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>AI Saving Tip</AlertTitle>
                <AlertDescription>
                    {tips.tips}
                </AlertDescription>
            </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGetTips} disabled={isPending}>
            {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Lightbulb className="mr-2 h-4 w-4" />
            )}
            Generate Tips
        </Button>
      </CardFooter>
    </Card>
  );
}
