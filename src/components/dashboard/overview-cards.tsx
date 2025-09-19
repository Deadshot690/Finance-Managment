'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, DollarSign, Wallet } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useUserData } from "@/context/user-data-context";
import { SetSavingsGoalDialog } from "./set-savings-goal-dialog";

export function OverviewCards() {
  const { transactions, savingsGoal, isLoading } = useUserData();

  if (isLoading || !transactions) {
    return (
        <>
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
        </>
    )
  }

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpenses;
  const savingsProgress = savingsGoal > 0 ? (balance / savingsGoal) * 100 : 0;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <ArrowDownLeft className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{totalExpenses.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Balance</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
          <p className="text-xs text-muted-foreground">Your current balance</p>
        </CardContent>
      </Card>
       <SetSavingsGoalDialog>
        <Card className="hover:bg-muted/50 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
                ₹{balance > 0 ? balance.toLocaleString('en-IN') : 0} / ₹{savingsGoal.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-muted-foreground">
                {savingsProgress.toFixed(1)}% progress
            </p>
          </CardContent>
        </Card>
      </SetSavingsGoalDialog>
    </>
  );
}
