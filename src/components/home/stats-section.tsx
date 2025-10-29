import { Card, CardContent } from "@/components/ui/card";
import AnimatedCounter from "@/components/shared/animated-counter";
import { Briefcase, Globe, PackageCheck } from "lucide-react";

const stats = [
    {
      icon: <PackageCheck className="h-8 w-8 text-primary" />,
      value: 150,
      label: "Million Packages Delivered",
      suffix: "M+",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      value: 5000,
      label: "Corporate Partners",
      suffix: "K+",
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      value: 220,
      label: "Countries & Territories",
      suffix: "+",
    },
];

export default function StatsSection() {
    return (
        <div className="grid sm:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-secondary/30 border-border/50 rounded-xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <div className="text-4xl font-bold font-headline text-primary">
                    <AnimatedCounter to={stat.value === 5000 ? 5 : stat.value} />
                    {stat.suffix}
                  </div>
                  <p className="text-muted-foreground mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
        </div>
    );
}
