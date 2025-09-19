import { Wallet } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2 group">
      <div className="p-2 bg-primary rounded-lg group-hover:bg-primary/90 transition-colors">
        <Wallet className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="text-2xl font-bold text-primary group-hover:text-primary/90 transition-colors">FinFlow</span>
    </Link>
  );
}
