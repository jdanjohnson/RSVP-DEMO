
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
      <Link href="/" className="font-headline text-2xl font-bold tracking-tighter flex items-center gap-2">
        <span className="text-primary italic">Show</span>
        <span className="text-secondary italic">Up</span>
      </Link>
      
      <div className="flex gap-4">
        <Link 
          href="/" 
          className={cn(
            "p-2 rounded-full transition-colors",
            pathname === "/" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Users size={20} />
        </Link>
        <Link 
          href="/host" 
          className={cn(
            "p-2 rounded-full transition-colors",
            pathname === "/host" ? "bg-secondary/20 text-secondary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <LayoutDashboard size={20} />
        </Link>
      </div>
    </nav>
  );
}
