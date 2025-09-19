import { BudgetList } from "@/components/budgets/budget-list";
import { BudgetRecommendations } from "@/components/budgets/budget-recommendations";
import { Button } from "@/components/ui/button";
import { SetBudgetDialog } from "@/components/budgets/set-budget-dialog";
import { PlusCircle } from "lucide-react";

export default function BudgetsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
        <SetBudgetDialog>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Set New Budget
          </Button>
        </SetBudgetDialog>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <BudgetList />
        </div>
        <div>
            <BudgetRecommendations />
        </div>
      </div>
    </div>
  );
}
