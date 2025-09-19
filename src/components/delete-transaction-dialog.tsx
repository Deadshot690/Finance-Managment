'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { deleteTransaction } from "@/lib/firestore";
import type { Transaction } from "@/lib/types";
import { useAuth } from "@/context/auth-context";
import { useUserData } from "@/context/user-data-context";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface DeleteTransactionDialogProps {
  transaction: Transaction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteTransactionDialog({ transaction, open, onOpenChange }: DeleteTransactionDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { mutateTransactions, mutateBudgets } = useUserData();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!user) {
      toast({ title: "Error", description: "You must be logged in.", variant: "destructive" });
      return;
    }
    setIsDeleting(true);
    try {
      await deleteTransaction(user.uid, transaction.id);
      toast({ title: "Success", description: "Transaction deleted." });
      mutateTransactions();
      mutateBudgets();
      onOpenChange(false);
    } catch (error) {
      toast({ title: "Error", description: "Could not delete transaction.", variant: "destructive" });
    } finally {
        setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the transaction for
            <span className="font-semibold"> {transaction.description}</span> on 
            <span className="font-semibold"> {new Date(transaction.date).toLocaleDateString()}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
