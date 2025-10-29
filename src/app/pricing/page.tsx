import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing | SwiftRoute Logistics',
  description: 'Find the perfect shipping plan with SwiftRoute Logistics. Transparent pricing for domestic, express, and international services.',
};

const pricingTiers = [
  {
    name: 'Standard',
    price: '$5.99+',
    description: 'Reliable and affordable for everyday shipments.',
    features: ['3-5 Business Days', 'Package Tracking', 'Up to 50 lbs', 'Email Support'],
    isPopular: false,
  },
  {
    name: 'Express',
    price: '$15.99+',
    description: 'For time-sensitive deliveries that can\'t wait.',
    features: ['1-2 Business Days', 'Real-time Tracking', 'Up to 70 lbs', 'Priority Support', 'Delivery Guarantee'],
    isPopular: true,
  },
  {
    name: 'International',
    price: '$29.99+',
    description: 'Connecting your business to the world.',
    features: ['5-10 Business Days', 'Global Tracking', 'Customs Assistance', '24/7 Global Support'],
    isPopular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="animate-fade-in-up">
       <section className="bg-secondary/20 pt-24 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-green-300 md:text-6xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Choose the right plan for your shipping needs. No hidden fees, just world-class service.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {pricingTiers.map((tier, index) => (
              <Card key={tier.name} className={cn(
                'shadow-lg hover:shadow-primary/10 transition-all duration-300 bg-secondary/30 rounded-xl border-border/50 hover:-translate-y-2', 
                tier.isPopular && 'border-primary ring-2 ring-primary'
              )} style={{ animationDelay: `${index * 0.1}s` }}>
                {tier.isPopular && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="font-headline text-3xl">{tier.name}</CardTitle>
                  <CardDescription className="pt-2">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-8 mt-4">
                    <span className="font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">{tier.price}</span>
                  </div>
                  <ul className="space-y-4 text-muted-foreground">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6">
                  <Button asChild className="w-full rounded-full" variant={tier.isPopular ? 'default' : 'outline'}>
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-16">*Prices are estimates and may vary based on package weight, dimensions, and destination.</p>
        </div>
      </section>
    </div>
  );
}
