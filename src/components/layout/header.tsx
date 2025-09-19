'use client';

import Link from 'next/link';
import { CircleUser, Menu, Sparkles, Wallet, BarChart3, LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '../logo';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/budgets', icon: Wallet, label: 'Budgets' },
  { href: '/reports', icon: BarChart3, label: 'Reports' },
  { href: '/ai-tips', icon: Sparkles, label: 'AI Tips' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const pageTitle = navItems.find(item => item.href === pathname)?.label || 'Dashboard';
  
  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <div className="mb-4">
              <Logo />
            </div>
            {navItems.map(item => (
               <Link
               key={item.href}
               href={item.href}
               className={cn(
                 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                 pathname === item.href && 'bg-muted text-primary'
               )}
             >
               <item.icon className="h-5 w-5" />
               {item.label}
             </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
        <h1 className="text-lg font-semibold">{pageTitle}</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user?.displayName || user?.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
