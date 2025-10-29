import AboutSection from '@/components/home/about-section';
import CtaSection from '@/components/home/cta-section';
import HeroSection from '@/components/home/hero-section';
import ServicesSection from '@/components/home/services-section';
import TestimonialsSection from '@/components/home/testimonials-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
