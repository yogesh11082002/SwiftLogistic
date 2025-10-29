import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { TESTIMONIALS } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-green-300">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Real stories from businesses that rely on SwiftRoute for their critical shipping needs.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <CarouselContent>
            {TESTIMONIALS.map((testimonial, index) => {
               const testimonialImage = PlaceHolderImages.find(img => img.id === testimonial.imageId);
               return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2 h-full">
                    <Card className="h-full flex flex-col justify-between rounded-xl bg-secondary/30 border-border/50 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/10">
                      <CardContent className="flex flex-col text-left p-6 md:p-8">
                        <div className="flex mb-4">
                            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                        </div>
                        <p className="text-muted-foreground italic mb-6 flex-grow">
                          "{testimonial.quote}"
                        </p>
                        <div className="flex items-center gap-4">
                           {testimonialImage && (
                             <Image
                              src={testimonialImage.imageUrl}
                              alt={testimonialImage.description}
                              data-ai-hint={testimonialImage.imageHint}
                              width={48}
                              height={48}
                              className="rounded-full border-2 border-primary/50"
                            />
                           )}
                           <div>
                            <div className="font-bold font-headline text-foreground">{testimonial.name}</div>
                            <div className="text-sm text-primary">{testimonial.company}</div>
                           </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="text-foreground -left-4 md:-left-12" />
          <CarouselNext className="text-foreground -right-4 md:-right-12" />
        </Carousel>
      </div>
    </section>
  );
}
