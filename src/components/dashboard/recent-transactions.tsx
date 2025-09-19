'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { useAuth } from '@/context/auth-context';
import useSWR from 'swr';
import { getTransactions } from '@/lib/firestore';
import { Skeleton } from '../ui/skeleton';

const fetcher = ([, userId]: [string, string]) => getTransactions(userId);

export function RecentTransactions() {
    const { user } = useAuth();
    const { data: transactions, isLoading } = useSWR(user ? ['transactions', user.uid] : null, fetcher);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>A list of your most recent income and expenses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
            {isLoading ? (
                 <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                 </div>
            ) : (
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {transactions?.map((transaction) => (
                        <TableRow key={transaction.id}>
                        <TableCell>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-sm text-muted-foreground">{transaction.date}</div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{transaction.category}</Badge>
                        </TableCell>
                        <TableCell className={cn("text-right font-medium", transaction.type === 'income' ? 'text-green-500' : 'text-red-500')}>
                            {transaction.type === 'income' ? '+' : '-'}
                            ${transaction.amount.toFixed(2)}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
