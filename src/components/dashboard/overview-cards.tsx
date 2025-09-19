import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, DollarSign, Wallet } from "lucide-react";

export function OverviewCards() {
  const totalIncome = 5750.00;
  const totalExpenses = 482.25;
  const balance = totalIncome - totalExpenses;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <p className="text-xs text-muted-foreground">+10.2% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <ArrowDownLeft className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <p className="text-xs text-muted-foreground">+5.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Balance</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <p className="text-xs text-muted-foreground">Your current balance</p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$1,250 / $10,000</div>
          <p className="text-xs text-muted-foreground">12.5% progress</p>
        </CardContent>
      </Card>
    </>
  );
}
