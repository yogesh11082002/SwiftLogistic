import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: 'Contact Us | SwiftRoute Logistics',
  description: 'Get in touch with SwiftRoute Logistics for support, inquiries, or feedback.',
};

export default function ContactPage() {
  return (
    <div className="animate-fade-in-up">
      <section className="bg-secondary/20 pt-24 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-green-300 md:text-6xl">
            Get In Touch
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We're here to help. Reach out with your questions, support needs, or feedback, and our team will get back to you promptly.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card className="shadow-2xl rounded-xl bg-secondary/30 border-border/50">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-foreground">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form action="#" className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input placeholder="Your Name" className="h-12 rounded-lg" />
                      <Input type="email" placeholder="Your Email" className="h-12 rounded-lg" />
                    </div>
                    <Input placeholder="Subject" className="h-12 rounded-lg" />
                    <Textarea placeholder="Your Message" rows={6} className="rounded-lg" />
                    <Button type="submit" size="lg" className="w-full sm:w-auto rounded-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-8">
              <Card className="shadow-2xl rounded-xl bg-secondary/30 border-border/50">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-foreground">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg flex-shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <a href="mailto:support@swiftroute.com" className="text-muted-foreground hover:text-primary transition-colors">support@swiftroute.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="bg-primary/10 text-primary p-3 rounded-lg flex-shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">+1 (234) 567-890</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="bg-primary/10 text-primary p-3 rounded-lg flex-shrink-0">
                        <MapPin className="h-6 w-6" />
                     </div>
                    <div>
                      <h4 className="font-semibold">Headquarters</h4>
                      <p className="text-muted-foreground">123 Logistics Lane, Metropolis, 12345</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-green-300">Frequently Asked Questions</h2>
            <p className="mt-2 text-lg text-muted-foreground">Quick answers to common questions.</p>
          </div>
          <div className="max-w-3xl mx-auto bg-secondary/30 p-2 rounded-xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-border/50">
                <AccordionTrigger className="hover:no-underline text-left">How do I track my shipment?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  You can track your shipment using the tracking number provided on our Home or Track page. Simply enter the number in the tracking box and click "Track Now" for real-time updates.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-border/50">
                <AccordionTrigger className="hover:no-underline text-left">What are your shipping hours?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our shipping and delivery services operate 24/7, 365 days a year. Customer support is available from 8 AM to 8 PM on weekdays, and 9 AM to 5 PM on weekends.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-0">
                <AccordionTrigger className="hover:no-underline text-left">Do you offer international shipping?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, we offer comprehensive international shipping to over 220 countries and territories. Please see our Services page for more details on international shipping options.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
