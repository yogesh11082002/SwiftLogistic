"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { LogOut, Menu, LayoutDashboard } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { handleSignOut } from "@/app/auth/actions";

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
                  "rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === link.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {isLoggedIn ? (
            <div className="border-t p-4">
                 <form action={handleSignOut}>
                    <Button
                        type="submit"
                        className="w-full rounded-full"
                        onClick={() => onOpenChange(false)}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </form>
            </div>
          ) : (
            <div className="border-t p-4 flex flex-col gap-2">
              <Button asChild className="w-full rounded-full" onClick={() => onOpenChange(false)}>
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full"
                onClick={() => onOpenChange(false)}
              >
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
  const { session, isLoading } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const loggedInLinks = NAV_LINKS.filter(
    link => !['Login', 'Sign Up'].includes(link.name)
  );
  
  const loggedOutLinks = NAV_LINKS.filter(
      link => !['Dashboard', 'Track', 'Pricing', 'Optimize Route'].includes(link.name)
  );

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
            <div className="h-6 w-24 rounded-md animate-pulse bg-muted"></div>
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

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <nav className="hidden md:flex items-center gap-8">
                {loggedInLinks.map(link => (
                    link.name !== 'Dashboard' && (
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
                    )
                ))}
                 <Button asChild variant="outline" className="rounded-full bg-primary/10">
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              </nav>

              <form action={handleSignOut} className="hidden md:flex">
                <Button
                    type="submit"
                    variant="outline"
                    className="rounded-full"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
              </form>
            </>
          ) : (
            <>
              <nav className="hidden md:flex items-center gap-8">
                {loggedOutLinks.map(link => (
                  (link.name !== 'Login' && link.name !== 'Sign Up') &&
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
            links={session ? loggedInLinks : loggedOutLinks}
            onLogout={session ? handleSignOut : undefined}
            open={isMobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
          />
        </div>
      </div>
    </header>
  );
}
