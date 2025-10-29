'use client';

import Link from 'next/link';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import Logo from './logo';
import { Button } from '../ui/button';
import { ArrowUp } from 'lucide-react';

export default function Footer() {

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="md:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-headline text-xl font-bold">SwiftRoute</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Pioneering the future of logistics with technology, speed, and unparalleled reliability across the globe.
            </p>
          </div>
          
          <div>
            <h3 className="font-headline font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-3">
              {NAV_LINKS.filter(l => ['Services', 'About', 'Pricing'].includes(l.name)).map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/track" className="text-sm text-muted-foreground hover:text-primary transition-colors">Track Shipment</Link></li>
              <li><Link href="/optimize-route" className="text-sm text-muted-foreground hover:text-primary transition-colors">AI Optimizer</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
            </ul>
          </div>
          <div className="flex flex-col items-start lg:items-end">
             <h3 className="font-headline font-semibold mb-4 text-foreground">Follow Us</h3>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-primary transition-colors">
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SwiftRoute Logistics. All Rights Reserved.
          </p>
          <Button variant="ghost" size="icon" onClick={handleScrollTop} className="rounded-full h-10 w-10">
            <ArrowUp className="h-5 w-5" />
            <span className="sr-only">Scroll to top</span>
          </Button>
        </div>
      </div>
    </footer>
  );
}
