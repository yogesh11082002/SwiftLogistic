import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CtaSection() {
  return (
    <section className="bg-secondary/20 py-20 md:py-24">
      <div className="container mx-auto px-4 text-center animate-fade-in-up">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-green-300">
          Ready to Revolutionize Your Logistics?
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Join thousands of businesses who trust SwiftRoute with their most critical shipments. Get an instant quote or talk to our experts today.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/pricing">View Pricing</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
