'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Session } from '@supabase/supabase-js';

import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from './logo';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // We redirect to login and refresh to ensure all state is cleared.
    router.push('/login');
    router.refresh();
  };

  const mainNavLinks = NAV_LINKS.filter(link => ['Track', 'Services', 'Pricing', 'About', 'Contact'].includes(link.name));
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Logo className="h-8 w-8 text-primary" />
          <span className="hidden font-headline text-2xl font-bold sm:inline-block">
            SwiftRoute
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {session && (
            <>
              {mainNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {session ? (
             <Button onClick={handleLogout} variant="outline" className="hidden md:inline-flex rounded-full">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
          ) : (
            <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="ghost" className="rounded-full">
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="rounded-full">
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
          )}
          
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background/95 backdrop-blur-sm p-0 flex flex-col">
                <div className="border-b p-4">
                     <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                        <Logo className="h-8 w-8 text-primary" />
                        <span className="font-headline text-xl font-bold">SwiftRoute</span>
                    </Link>
                </div>
                <nav className="flex flex-1 flex-col gap-4 p-4">
                  {session ? (
                      mainNavLinks.map((link) => (
                          <Link
                              key={link.name}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                              'rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                              pathname === link.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                              )}
                          >
                              {link.name}
                          </Link>
                      ))
                  ) : (
                      <>
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)} className={cn('rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground', pathname === '/login' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground')}>Login</Link>
                        <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className={cn('rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground', pathname === '/signup' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground')}>Sign Up</Link>
                      </>
                  )}
                </nav>
                <div className="border-t p-4">
                  {session ? (
                      <Button onClick={handleLogout} className="w-full rounded-full">
                         <LogOut className="mr-2 h-4 w-4" />
                         Logout
                      </Button>
                  ) : (
                       <Button asChild className="w-full rounded-full">
                          <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                              Sign Up
                          </Link>
                      </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
