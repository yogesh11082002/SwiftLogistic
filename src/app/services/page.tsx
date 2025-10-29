import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SERVICES } from '@/lib/constants';
import ServiceCard from '@/components/shared/service-card';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services | SwiftRoute Logistics',
  description: 'Explore the wide range of logistics and courier services offered by SwiftRoute Logistics, including domestic and international shipping, warehousing, and e-commerce solutions.',
};

export default function ServicesPage() {
  return (
    <div className="animate-fade-in-up">
       <section className="bg-secondary/20 pt-24 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-green-300 md:text-6xl">
            Comprehensive Logistics Solutions
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            From local deliveries to global freight, we have a solution for every shipping need, powered by technology and expertise.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {SERVICES.map((service, index) => (
              <div key={service.title} style={{ animation: `fade-in-up 0.5s ${index * 0.1 + 0.1}s ease-out forwards`, opacity: 0 }}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
            <Card className="shadow-2xl border-0 bg-gradient-to-r from-primary to-green-600 text-primary-foreground rounded-xl">
                <div className="grid md:grid-cols-3 items-center">
                    <div className="md:col-span-2 p-8 md:p-12">
                        <h2 className="font-headline text-3xl font-bold">Need a Custom Solution?</h2>
                        <p className="mt-2 text-primary-foreground/80 max-w-lg">
                            Our logistics experts are ready to build a tailored shipping strategy for your unique business requirements.
                        </p>
                    </div>
                    <div className="p-8 md:p-12 text-left md:text-right">
                         <Button asChild variant="secondary" size="lg" className="rounded-full group">
                            <Link href="/contact">
                                Contact Sales <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
      </section>
    </div>
  );
}
