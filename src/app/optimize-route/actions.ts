"use server";

import { z } from "zod";
import { optimizeShippingRoute } from "@/ai/flows/optimize-shipping-route";

const OptimizeShippingRouteSchema = z.object({
  origin: z.string().min(1, "Origin is required."),
  destination: z.string().min(1, "Destination is required."),
  waypoints: z.string().optional(),
  trafficConditions: z.string().min(1, "Traffic conditions are required."),
  weatherConditions: z.string().min(1, "Weather conditions are required."),
  roadConditions: z.string().min(1, "Road conditions are required."),
  vehicleType: z.string().min(1, "Vehicle type is required."),
  departureTime: z.string().min(1, "Departure time is required."),
});

export type FormState = {
  message: string;
  data?: {
    optimizedRoute: string;
    estimatedDeliveryTime: string;
    estimatedCost: number;
    routeSummary: string;
    warnings: string;
  };
  errors?: {
    origin?: string[];
    destination?: string[];
    waypoints?: string[];
    trafficConditions?: string[];
    weatherConditions?: string[];
    roadConditions?: string[];
    vehicleType?: string[];
    departureTime?: string[];
  };
};

export async function generateOptimizedRoute(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const departureTime = new Date(formData.get("departureTime") as string).toISOString();

  const validatedFields = OptimizeShippingRouteSchema.safeParse({
    origin: formData.get("origin"),
    destination: formData.get("destination"),
    waypoints: formData.get("waypoints") || "",
    trafficConditions: formData.get("trafficConditions"),
    weatherConditions: formData.get("weatherConditions"),
    roadConditions: formData.get("roadConditions"),
    vehicleType: formData.get("vehicleType"),
    departureTime: departureTime,
  });

  if (!validatedFields.success) {
    return {
      message: "Please check the form for errors.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await optimizeShippingRoute(validatedFields.data);
    return {
      message: "Route optimized successfully.",
      data: result,
    };
  } catch (error) {
    return {
      message: "An error occurred while optimizing the route. Please try again.",
    };
  }
}
