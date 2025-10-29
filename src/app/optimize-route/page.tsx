import type { Metadata } from "next";
import OptimizeForm from "@/components/optimize-route/optimize-form";

export const metadata: Metadata = {
  title: "AI Route Optimizer | SwiftRoute Logistics",
  description: "Optimize your shipping routes with our advanced AI tool for maximum efficiency.",
};

export default function OptimizeRoutePage() {
  return (
    <div className="animate-fade-in-up">
      <section className="bg-secondary/20 pt-24 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-green-300 md:text-6xl">
            AI-Powered Route Optimizer
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Leverage our cutting-edge AI to find the most efficient shipping routes. Minimize costs, save time, and navigate around potential delays with real-time data analysis.
          </p>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container mx-auto px-4">
            <OptimizeForm />
        </div>
      </section>
    </div>
  );
}
