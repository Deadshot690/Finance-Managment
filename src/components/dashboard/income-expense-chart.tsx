'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { useUserData } from '@/context/user-data-context';
import { format, subMonths, startOfMonth } from 'date-fns';

export function IncomeExpenseChart() {
  const { transactions } = useUserData();

  const processChartData = () => {
    const months = Array.from({ length: 6 }, (_, i) => subMonths(new Date(), i));
    const monthlyData = months.map(month => ({
      name: format(month, 'MMM'),
      income: 0,
      expenses: 0,
    }));

    transactions?.forEach(t => {
      const transactionDate = new Date(t.date);
      const monthIndex = months.findIndex(m => 
        transactionDate >= startOfMonth(m) && transactionDate < startOfMonth(subMonths(m, -1))
      );
      
      if (monthIndex !== -1) {
        if (t.type === 'income') {
          monthlyData[monthIndex].income += t.amount;
        } else {
          monthlyData[monthIndex].expenses += t.amount;
        }
      }
    });

    return monthlyData.reverse();
  };

  const data = processChartData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs. Expenses</CardTitle>
        <CardDescription>A look at your cash flow over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)'
              }}
            />
            <Legend />
            <Bar dataKey="income" fill="hsl(var(--chart-1))" name="Income" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill="hsl(var(--chart-2))" name="Expenses" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
