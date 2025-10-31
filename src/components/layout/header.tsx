"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { LogOut, Menu, Zap, LayoutDashboard } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Logo from "./logo";

function MobileMenu({ links, onLogout, open, onOpenChange }: any) {
  const pathname = usePathname();
  const isLoggedIn = !!onLogout;

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-background/95 backdrop-blur-sm p-0 flex flex-col">
            <div className="border-b p-4">
                <Link href="/" className="flex items-center gap-2" onClick={() => onOpenChange(false)}>
                    <Logo className="h-8 w-8 text-primary" />
                    <span className="font-headline text-xl font-bold">SwiftRoute</span>
                </Link>
            </div>
          <nav className="flex flex-1 flex-col gap-4 p-4">
            {links.map((link: any) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                    'rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    pathname === link.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          {isLoggedIn ? (
            <div className="border-t p-4">
              <Button onClick={() => { if(onLogout) onLogout(); onOpenChange(false); }} className="w-full rounded-full">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
             <div className="border-t p-4 flex flex-col gap-2">
                <Button asChild className="w-full rounded-full" onClick={() => onOpenChange(false)}>
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full" onClick={() => onOpenChange(false)}>
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}


export default function Header() {
  const { session, supabase } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const protectedLinks = NAV_LINKS.filter(link =>
    ["Track", "Pricing", "Dashboard"].includes(link.name)
  );
  const publicLinks = NAV_LINKS.filter(
    link => !["Track", "Pricing", "Dashboard", "Login", "Sign Up", "Optimize Route"].includes(link.name)
  );
  
  const loggedInLinks = [...publicLinks, ...protectedLinks.filter(l => l.name !== 'Dashboard')];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Logo className="h-8 w-8 text-primary" />
          <span className="hidden font-headline text-2xl font-bold sm:inline-block">
            SwiftRoute
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            // ✅ Logged-in View
            <>
              <nav className="hidden md:flex items-center gap-8">
                {loggedInLinks.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <Button asChild variant="outline" className="rounded-full bg-primary/10">
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              </nav>
              <Button onClick={handleLogout} variant="outline" className="hidden md:inline-flex rounded-full">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            // ❌ Logged-out View
            <>
              <nav className="hidden md:flex items-center gap-8">
                {publicLinks.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="ghost" className="rounded-full">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="rounded-full">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </>
          )}
           <MobileMenu
              links={session ? [...loggedInLinks, {name: "Dashboard", href: "/dashboard"}] : publicLinks}
              onLogout={session ? handleLogout : undefined}
              open={isMobileMenuOpen}
              onOpenChange={setMobileMenuOpen}
            />
        </div>
      </div>
    </header>
  );
}
