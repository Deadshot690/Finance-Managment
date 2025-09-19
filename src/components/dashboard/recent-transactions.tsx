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
import { Skeleton } from '../ui/skeleton';
import { useUserData } from '@/context/user-data-context';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { EditTransactionDialog } from '../edit-transaction-dialog';
import { DeleteTransactionDialog } from '../delete-transaction-dialog';
import { useState } from 'react';
import type { Transaction } from '@/lib/types';

export function RecentTransactions() {
  const { transactions, isLoading } = useUserData();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);

  return (
    <>
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
                          <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                      </TableHeader>
                      <TableBody>
                      {transactions?.map((transaction) => (
                          <TableRow key={transaction.id}>
                          <TableCell>
                              <div className="font-medium">{transaction.description}</div>
                              <div className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</div>
                          </TableCell>
                          <TableCell>
                              <Badge variant="outline">{transaction.category}</Badge>
                          </TableCell>
                          <TableCell className={cn("text-right font-medium", transaction.type === 'income' ? 'text-green-500' : 'text-red-500')}>
                              {transaction.type === 'income' ? '+' : '-'}
                              ₹{transaction.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onSelect={() => setEditingTransaction(transaction)}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Edit</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => setDeletingTransaction(transaction)} className="text-red-500 focus:text-red-500">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        <span>Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                          </TableRow>
                      ))}
                      </TableBody>
                  </Table>
              )}
          </ScrollArea>
        </CardContent>
      </Card>
      
      {editingTransaction && (
        <EditTransactionDialog 
          transaction={editingTransaction}
          open={!!editingTransaction}
          onOpenChange={(isOpen) => !isOpen && setEditingTransaction(null)}
        />
      )}

      {deletingTransaction && (
        <DeleteTransactionDialog
          transaction={deletingTransaction}
          open={!!deletingTransaction}
          onOpenChange={(isOpen) => !isOpen && setDeletingTransaction(null)}
        />
      )}
    </>
  );
}
