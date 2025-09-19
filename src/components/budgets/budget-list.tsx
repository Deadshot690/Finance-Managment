import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { budgets } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";

export function BudgetList() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Monthly Budgets</CardTitle>
            <CardDescription>Your spending progress against your set budgets.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-6">
                {budgets.map(budget => {
                    const progress = (budget.spent / budget.amount) * 100;
                    const overBudget = progress > 100;
                    return (
                        <div key={budget.id}>
                            <div className="flex justify-between mb-1">
                                <span className="font-medium">{budget.category}</span>
                                <span className={cn("text-sm", overBudget ? "text-red-500 font-bold" : "text-muted-foreground")}>
                                    ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                                </span>
                            </div>
                            <Progress value={Math.min(progress, 100)} className={cn(overBudget && "[&>div]:bg-red-500")} />
                            {overBudget && <p className="text-xs text-red-500 mt-1">You've exceeded your budget for {budget.category}.</p>}
                        </div>
                    )
                })}
            </div>
        </CardContent>
    </Card>
  );
}
