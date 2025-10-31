import type { Metadata } from 'next';
import Image from 'next/image';
import { Users, Globe, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatsSection from '@/components/home/stats-section';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata: Metadata = {
  title: 'About Us | SwiftRoute Logistics',
  description: 'Learn about SwiftRoute Logistics, our mission, vision, and the team driving our success.',
};

const teamMembers = [
  { name: 'Jane Doe', role: 'CEO & Founder', imageId: 'avatar-2' },
  { name: 'John Smith', role: 'Chief Operations Officer', imageId: 'avatar-1' },
  { name: 'Emily White', role: 'Head of Global Strategy', imageId: 'avatar-3' },
];

export default function AboutPage() {
  const aboutMapImageUrl = "https://picsum.photos/seed/about-map/800/600";
  return (
    <div className="animate-fade-in-up">
      <section className="bg-secondary/20 pt-24 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-green-300 md:text-6xl">
            Powering Global Commerce
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We are revolutionizing logistics through technology, dedication, and a global network built for the future of commerce.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <h2 className="font-headline text-3xl font-bold text-primary flex items-center gap-3"><Zap className="h-8 w-8" /> Our Mission</h2>
              <p className="mt-4 text-muted-foreground text-lg border-l-2 border-primary pl-6">
                To provide seamless, intelligent, and sustainable logistics solutions that empower businesses and connect communities worldwide. We strive for excellence in every delivery, ensuring your shipments arrive on time, every time.
              </p>
              <h2 className="font-headline text-3xl font-bold text-primary mt-12 flex items-center gap-3"><Globe className="h-8 w-8" /> Our Vision</h2>
              <p className="mt-4 text-muted-foreground text-lg border-l-2 border-primary pl-6">
                To be the world's most trusted and innovative logistics partner, creating a future where shipping is effortless, transparent, and environmentally responsible.
              </p>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl shadow-primary/10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
               <Image
                  src={aboutMapImageUrl}
                  alt="A glowing, holographic world map projection with a green hue."
                  data-ai-hint="world map"
                  fill
                  className="object-cover"
                />
            </div>
          </div>
        </div>
      </section>

      <div className="py-20 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 animate-fade-in-up">
          <StatsSection />
        </div>
      </div>

      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-headline text-3xl font-bold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-green-300">Meet Our Leadership</h2>
            <p className="mt-2 text-lg text-muted-foreground">The architects of our global network.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => {
              const memberImage = PlaceHolderImages.find(img => img.id === member.imageId);
              return (
                <Card key={member.name} className="text-center bg-secondary/30 border-0 shadow-lg hover:shadow-primary/10 transition-all duration-300 rounded-xl animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-8">
                    {memberImage && (
                        <Image
                        src={memberImage.imageUrl}
                        alt={memberImage.description}
                        data-ai-hint={memberImage.imageHint}
                        width={120}
                        height={120}
                        className="rounded-full mx-auto mb-6 border-4 border-primary/20"
                      />
                    )}
                    <h3 className="font-headline text-xl font-bold">{member.name}</h3>
                    <p className="text-primary">{member.role}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
