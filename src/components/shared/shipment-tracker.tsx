"use client";

import { cn } from "@/lib/utils";

const steps = ["Order Confirmed", "Processing", "In Transit", "Out for Delivery", "Delivered"];

type ShipmentTrackerProps = {
  status: "Order Confirmed" | "Processing" | "In Transit" | "Out for Delivery" | "Delivered";
};

export default function ShipmentTracker({ status }: ShipmentTrackerProps) {
  const currentStepIndex = steps.indexOf(status);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-secondary -translate-y-1/2"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-500 ease-out" 
          style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, index) => {
          const isActive = index <= currentStepIndex;
          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300",
                  isActive ? "bg-primary" : "bg-secondary border-2 border-border"
                )}
              >
                {isActive && <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>}
              </div>
              <p
                className={cn(
                  "text-xs sm:text-sm mt-2 text-center",
                  isActive ? "font-semibold text-primary" : "text-muted-foreground"
                )}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
