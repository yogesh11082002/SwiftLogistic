import type { Metadata } from 'next';
import TrackingForm from '@/components/shared/tracking-form';
import ShipmentTracker from '@/components/shared/shipment-tracker';

export const metadata: Metadata = {
  title: 'Track Your Shipment | SwiftRoute Logistics',
  description: 'Enter your tracking number to get real-time updates on your shipment status.',
};

export default function TrackPage() {
  return (
    <div className="animate-fade-in-up">
       <section className="bg-secondary/20 pt-24 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-green-300 md:text-6xl">
            Track Your Shipment
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Enter your tracking number below for real-time updates on your package's journey.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <TrackingForm />
          </div>
        </div>
      </section>
      
      <section className="pb-20 md:pb-24">
        <div className="container mx-auto px-4">
            <div className="mt-16 max-w-4xl mx-auto">
                <h2 className="text-center font-headline text-2xl mb-8 text-foreground">
                Shipment Status for #SW123456789
                </h2>
                <ShipmentTracker status="In Transit" />
            </div>
        </div>
      </section>
    </div>
  );
}
