import { SpendingBreakdownChart } from "@/components/reports/spending-breakdown-chart";
import { IncomeExpenseChart } from "@/components/dashboard/income-expense-chart";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <div>
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export Data
            </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
                <IncomeExpenseChart />
            </div>
            <div className="lg:col-span-2">
                <SpendingBreakdownChart />
            </div>
        </div>
        <div className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>More Analytics Coming Soon</CardTitle>
                    <CardDescription>We're working on adding more detailed reports, such as savings growth over time and investment tracking.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground p-8">
                        Stay tuned for more updates!
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
