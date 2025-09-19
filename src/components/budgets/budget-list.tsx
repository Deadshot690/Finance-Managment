'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { useUserData } from "@/context/user-data-context";

export function BudgetList() {
    const { budgets, transactions, isLoading } = useUserData();

    const spendingByCategory = (transactions ?? [])
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            if (!acc[t.category]) {
                acc[t.category] = 0;
            }
            acc[t.category] += t.amount;
            return acc;
        }, {} as { [key: string]: number });

    const budgetsWithSpending = (budgets ?? []).map(budget => ({
        ...budget,
        spent: spendingByCategory[budget.category] || 0
    }));

  return (
    <Card>
        <CardHeader>
            <CardTitle>Monthly Budgets</CardTitle>
            <CardDescription>Your spending progress against your set budgets.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-6">
                {isLoading ? (
                    <div className="space-y-6">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : (
                    budgetsWithSpending?.map(budget => {
                        const progress = (budget.spent / budget.amount) * 100;
                        const overBudget = progress > 100;
                        return (
                            <div key={budget.id}>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium">{budget.category}</span>
                                    <span className={cn("text-sm", overBudget ? "text-red-500 font-bold" : "text-muted-foreground")}>
                                        ₹{budget.spent.toFixed(2)} / ₹{budget.amount.toFixed(2)}
                                    </span>
                                </div>
                                <Progress value={Math.min(progress, 100)} className={cn(overBudget && "[&>div]:bg-red-500")} />
                                {overBudget && <p className="text-xs text-red-500 mt-1">You've exceeded your budget for {budget.category}.</p>}
                            </div>
                        )
                    })
                )}
                 {!isLoading && budgetsWithSpending?.length === 0 && (
                    <p className="text-center text-muted-foreground">No budgets set yet.</p>
                 )}
            </div>
        </CardContent>
    </Card>
  );
}
