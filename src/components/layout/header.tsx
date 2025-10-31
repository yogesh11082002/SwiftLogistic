
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Session } from '@supabase/supabase-js';
import Logo from './logo';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, Loader2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";


export default function Header() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const supabase = createClientComponentClient();
  const pathname = usePathname();

  useEffect(() => {
    let active = true;

    async function fetchSession() {
      try {
        // Use client-side getSession to ensure we have the latest auth state
        const { data } = await supabase.auth.getSession();
        if (active) {
          setSession(data.session ?? null);
        }
      } catch (err) {
        console.error("Error fetching session:", err);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) {
        setSession(session ?? null);
      }
    });

    return () => {
      active = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // A hard refresh is the most reliable way to reset state after logout
    window.location.href = '/'; 
  };
  
  const protectedLinks = NAV_LINKS.filter(link => ['Track', 'Pricing', 'Optimize Route'].includes(link.name));
  const publicLinks = NAV_LINKS.filter(link => !['Track', 'Pricing', 'Optimize Route', 'Login', 'Sign Up'].includes(link.name));
  const mobileNavLinks = [...publicLinks, ...protectedLinks];
  const desktopNavLinks = [...publicLinks, ...protectedLinks.filter(l => l.name !== 'Optimize Route')];


  // This is the crucial part: render a loading state or a minimal header until the session is confirmed client-side
  if (isLoading) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto flex h-20 items-center justify-between px-4">
                 <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <Logo className="h-8 w-8 text-primary" />
                    <span className="hidden font-headline text-2xl font-bold sm:inline-block">
                        SwiftRoute
                    </span>
                </Link>
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Logo className="h-8 w-8 text-primary" />
          <span className="hidden font-headline text-2xl font-bold sm:inline-block">
            SwiftRoute
          </span>
        </Link>
        
        <div className="flex items-center gap-2">
            {session ? (
                // ✅ Logged In View
                <>
                <nav className="hidden items-center gap-8 md:flex">
                {desktopNavLinks.map((link) => (
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
                 <Link
                    key="optimize-route"
                    href="/optimize-route"
                    className='text-sm font-medium transition-colors hover:text-primary text-muted-foreground'
                    >
                    AI Optimizer
                    </Link>
                </nav>
                <div className="flex items-center gap-2">
                    <Button onClick={handleLogout} variant="outline" className="hidden md:inline-flex rounded-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
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
                            {mobileNavLinks.map((link) => (
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
                               <Link
                                    key="optimize-route"
                                    href="/optimize-route"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                    'rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                                    pathname === "/optimize-route" ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                                    )}
                                >
                                    AI Optimizer
                                </Link>
                            </nav>
                            <div className="border-t p-4">
                                <Button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full rounded-full">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Button>
                            </div>
                        </SheetContent>
                        </Sheet>
                    </div>
                </div>
                </>
            ) : (
                // ❌ Logged Out View
                <>
                    <nav className="hidden items-center gap-8 md:flex">
                        {publicLinks.map((link) => (
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
                    </nav>
                    <div className="flex items-center gap-2">
                         <div className="hidden md:flex items-center gap-2">
                            <Button asChild variant="ghost" className="rounded-full">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild className="rounded-full">
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    </div>
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
                            <nav className="flex-1 p-4">
                                {publicLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                        'block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                                        pathname === link.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                            <div className="border-t p-4 flex flex-col gap-2">
                                <Button asChild className="w-full rounded-full" variant="outline">
                                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                        Login
                                    </Link>
                                </Button>
                                <Button asChild className="w-full rounded-full">
                                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                        Sign Up
                                    </Link>
                                </Button>
                            </div>
                        </SheetContent>
                        </Sheet>
                    </div>
                </>
            )}
        </div>
      </div>
    </header>
  )
}

    