import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type ServiceCardProps = {
  service: Service;
};

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="h-full flex flex-col group bg-secondary/30 border-border/50 rounded-xl hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/10 hover:-translate-y-2">
      <CardHeader>
        <div className="mb-4 bg-primary/10 text-primary w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <service.icon className="h-7 w-7" />
        </div>
        <CardTitle className="font-headline text-xl text-foreground">{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter>
        <Link href="/services" className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
          Learn More <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
