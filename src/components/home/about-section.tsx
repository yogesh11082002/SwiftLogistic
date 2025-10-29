import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Truck, Users } from 'lucide-react';
import StatsSection from './stats-section';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-green-300">
              The Engine of Modern Commerce
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              At SwiftRoute Logistics, we are more than a shipping company. We are your strategic partner, leveraging cutting-edge technology and a global network to solve complex logistics challenges. Our commitment is to ensure your business moves forward, faster.
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Global Reach, Local Expertise</h3>
                  <p className="text-muted-foreground">Spanning 220+ countries with on-the-ground experts.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Unwavering Reliability</h3>
                  <p className="text-muted-foreground">99.8% on-time delivery track record.</p>
                </div>
              </div>
            </div>
            <Button asChild size="lg" className="mt-10 rounded-full group">
              <Link href="/about">
                Learn More About Us <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             <StatsSection />
          </div>
        </div>
      </div>
    </section>
  );
}
