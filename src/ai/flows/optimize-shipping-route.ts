'use server';

/**
 * @fileOverview A shipping route optimization AI agent.
 *
 * - optimizeShippingRoute - A function that optimizes shipping routes based on real-time data.
 * - OptimizeShippingRouteInput - The input type for the optimizeShippingRoute function.
 * - OptimizeShippingRouteOutput - The return type for the optimizeShippingRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeShippingRouteInputSchema = z.object({
  origin: z.string().describe('The starting location for the shipping route.'),
  destination: z.string().describe('The final destination for the shipping route.'),
  waypoints: z.string().describe('An array of intermediate locations/waypoints (comma separated) for the shipping route.'),
  trafficConditions: z.string().describe('Real-time traffic conditions along the route.'),
  weatherConditions: z.string().describe('Real-time weather conditions along the route.'),
  roadConditions: z.string().describe('Real-time road conditions along the route.'),
  vehicleType: z.string().describe('The type of vehicle being used for shipping (e.g., truck, van, car).'),
  departureTime: z.string().describe('The desired departure time for the shipping route (ISO format).'),
});
export type OptimizeShippingRouteInput = z.infer<typeof OptimizeShippingRouteInputSchema>;

const OptimizeShippingRouteOutputSchema = z.object({
  optimizedRoute: z.string().describe('The optimized shipping route as a series of steps with estimated times.'),
  estimatedDeliveryTime: z.string().describe('The estimated delivery time for the optimized route (ISO format).'),
  estimatedCost: z.number().describe('The estimated cost for the optimized route, including fuel and tolls.'),
  routeSummary: z.string().describe('A summary of the optimized route, including distance and major roads used.'),
  warnings: z.string().describe('Any potential issues or delays anticipated along the route.'),
});
export type OptimizeShippingRouteOutput = z.infer<typeof OptimizeShippingRouteOutputSchema>;

export async function optimizeShippingRoute(input: OptimizeShippingRouteInput): Promise<OptimizeShippingRouteOutput> {
  return optimizeShippingRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeShippingRoutePrompt',
  input: {schema: OptimizeShippingRouteInputSchema},
  output: {schema: OptimizeShippingRouteOutputSchema},
  prompt: `You are an expert logistics route optimizer.

You will use real-time data to optimize shipping routes, to minimize delivery times and costs, and factor in real-time data to suggest routes.

Use the following information to optimize the route:

Origin: {{{origin}}}
Destination: {{{destination}}}
Waypoints: {{{waypoints}}}
Traffic Conditions: {{{trafficConditions}}}
Weather Conditions: {{{weatherConditions}}}
Road Conditions: {{{roadConditions}}}
Vehicle Type: {{{vehicleType}}}
Departure Time: {{{departureTime}}}

Based on this information, provide the optimized route, estimated delivery time, estimated cost, route summary, and any warnings.
`,
});

const optimizeShippingRouteFlow = ai.defineFlow(
  {
    name: 'optimizeShippingRouteFlow',
    inputSchema: OptimizeShippingRouteInputSchema,
    outputSchema: OptimizeShippingRouteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
