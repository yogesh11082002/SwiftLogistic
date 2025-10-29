import TrackingForm from '@/components/shared/tracking-form';
import Image from 'next/image';

export default function HeroSection() {
  const heroBgUrl = 'https://picsum.photos/seed/hero/1920/1080';
  const heroBgDescription = 'A modern warehouse with blurred motion of workers and forklifts, conveying activity and efficiency.';

  return (
    <section className="relative bg-background text-white pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <Image
        src={heroBgUrl}
        alt={heroBgDescription}
        data-ai-hint="warehouse logistics"
        fill
        className="object-cover opacity-40"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="animate-fade-in-up">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-green-300 sm:text-6xl md:text-7xl">
            Smarter Logistics, Seamless World
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground sm:text-xl">
            Experience the future of shipping with AI-powered optimization, real-time visibility, and a commitment to unparalleled speed and reliability.
          </p>
        </div>

        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <TrackingForm />
          <p className="mt-4 text-sm text-muted-foreground">
            Enter your tracking number for instant shipment status.
          </p>
        </div>
      </div>
    </section>
  );
}
