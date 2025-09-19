import { OverviewCards } from "@/components/dashboard/overview-cards";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { IncomeExpenseChart } from "@/components/dashboard/income-expense-chart";
import { Button } from "@/components/ui/button";
import { AddTransactionDialog } from "@/components/add-transaction-dialog";
import { PlusCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <AddTransactionDialog>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
            </Button>
          </AddTransactionDialog>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
        <OverviewCards />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <IncomeExpenseChart />
        <RecentTransactions />
      </div>
    </div>
  );
}
