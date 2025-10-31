'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, LogOut } from 'lucide-react';
import { useState } from 'react';

import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from './logo';
import { useAuth } from '@/hooks/use-auth';
import { handleSignOut } from '@/app/auth/actions';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const handleLogout = async () => {
    await handleSignOut();
  };

  const mainNavLinks = NAV_LINKS.filter(link => ['Track', 'Services', 'Pricing', 'About', 'Contact'].includes(link.name));
  const authNavLinks = NAV_LINKS.filter(link => ['Login', 'Sign Up'].includes(link.name));

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
          {user ? (
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
          ) : (
            <div/>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
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
                  {user ? (
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
                          {authNavLinks.map((link) => (
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
                          ))}
                      </>
                  )}
                </nav>
                <div className="border-t p-4">
                  {user ? (
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
