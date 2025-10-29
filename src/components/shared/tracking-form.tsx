import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TrackingForm() {
  return (
    <form className="group relative w-full max-w-lg mx-auto">
      <Input
        type="text"
        placeholder="Enter your tracking number"
        className="h-14 w-full rounded-full border-2 border-border/60 bg-secondary/40 pl-6 pr-36 text-base text-foreground backdrop-blur-sm transition-all focus:border-primary focus:ring-4 focus:ring-primary/20"
      />
      <Button type="submit" size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full">
        Track Now
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </form>
  );
}
