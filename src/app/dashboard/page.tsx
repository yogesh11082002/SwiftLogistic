'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="animate-fade-in-up text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-green-300 md:text-5xl">
          Welcome to your Dashboard
        </h1>
        {user && (
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Hello, {user.email}!
            </p>
        )}
      </div>

      <div className="max-w-3xl mx-auto mt-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
        <Card className="shadow-2xl rounded-xl bg-secondary/30 border-border/50">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Quick Actions</CardTitle>
                <CardDescription>Get started with our most popular features.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
                <Button asChild size="lg" className="w-full justify-between rounded-lg">
                    <Link href="/track">
                        Track a Shipment
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
                <Button asChild size="lg" className="w-full justify-between rounded-lg" variant="outline">
                     <Link href="/optimize-route">
                        Optimize a Route
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
