"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { generateOptimizedRoute, FormState } from "@/app/optimize-route/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, AlertTriangle, Map, Clock, DollarSign, Info, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialState: FormState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full rounded-full h-12 text-base">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Optimizing...
        </>
      ) : (
        <>
          <Zap className="mr-2 h-4 w-4" /> Optimize Route
        </>
      )}
    </Button>
  );
}

export default function OptimizeForm() {
  const [state, formAction] = useActionState(generateOptimizedRoute, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.data) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <Card className="shadow-2xl rounded-xl bg-secondary/30 border-border/50">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Route Details</CardTitle>
          <CardDescription>Enter the details for the shipment route you want to optimize.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="origin">Origin</Label>
                <Input id="origin" name="origin" placeholder="e.g., New York, NY" required className="h-12 rounded-lg" />
                {state.errors?.origin && <p className="text-sm text-destructive mt-1">{state.errors.origin[0]}</p>}
              </div>
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" name="destination" placeholder="e.g., Los Angeles, CA" required className="h-12 rounded-lg" />
                {state.errors?.destination && <p className="text-sm text-destructive mt-1">{state.errors.destination[0]}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="waypoints">Waypoints (comma-separated)</Label>
              <Input id="waypoints" name="waypoints" placeholder="e.g., Chicago, IL, Denver, CO" className="h-12 rounded-lg" />
            </div>
            <div>
              <Label htmlFor="departureTime">Departure Time</Label>
              <Input id="departureTime" name="departureTime" type="datetime-local" required defaultValue={new Date().toISOString().slice(0, 16)} className="h-12 rounded-lg" />
              {state.errors?.departureTime && <p className="text-sm text-destructive mt-1">{state.errors.departureTime[0]}</p>}
            </div>
            <div>
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Input id="vehicleType" name="vehicleType" placeholder="e.g., Cargo Van" required className="h-12 rounded-lg" />
              {state.errors?.vehicleType && <p className="text-sm text-destructive mt-1">{state.errors.vehicleType[0]}</p>}
            </div>
             <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="trafficConditions">Traffic</Label>
                <Input id="trafficConditions" name="trafficConditions" placeholder="e.g., Heavy" required className="h-12 rounded-lg" />
                {state.errors?.trafficConditions && <p className="text-sm text-destructive mt-1">{state.errors.trafficConditions[0]}</p>}
              </div>
              <div>
                <Label htmlFor="weatherConditions">Weather</Label>
                <Input id="weatherConditions" name="weatherConditions" placeholder="e.g., Clear" required className="h-12 rounded-lg" />
                {state.errors?.weatherConditions && <p className="text-sm text-destructive mt-1">{state.errors.weatherConditions[0]}</p>}
              </div>
               <div>
                <Label htmlFor="roadConditions">Roads</Label>
                <Input id="roadConditions" name="roadConditions" placeholder="e.g., Good" required className="h-12 rounded-lg" />
                {state.errors?.roadConditions && <p className="text-sm text-destructive mt-1">{state.errors.roadConditions[0]}</p>}
              </div>
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card className="shadow-2xl rounded-xl bg-secondary/30 border-border/50 sticky top-24">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Optimized Result</CardTitle>
            <CardDescription>The AI-generated optimal route will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            {state.data ? (
              <div className="space-y-6">
                <Alert variant="default" className="bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-400 rounded-lg">
                    <CheckCircle className="h-4 w-4 !text-green-500" />
                    <AlertTitle className="font-semibold">Route Optimized Successfully!</AlertTitle>
                </Alert>

                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <Map className="h-5 w-5 text-primary mt-1 flex-shrink-0"/>
                        <div>
                            <h4 className="font-semibold">Route Summary</h4>
                            <p className="text-sm text-muted-foreground">{state.data.routeSummary}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0"/>
                        <div>
                            <h4 className="font-semibold">Estimated Delivery Time</h4>
                            <p className="text-sm text-muted-foreground">{new Date(state.data.estimatedDeliveryTime).toLocaleString()}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <DollarSign className="h-5 w-5 text-primary mt-1 flex-shrink-0"/>
                        <div>
                            <h4 className="font-semibold">Estimated Cost</h4>
                            <p className="text-sm text-muted-foreground">${state.data.estimatedCost.toFixed(2)}</p>
                        </div>
                    </div>
                    {state.data.warnings && (
                        <Alert variant="destructive" className="rounded-lg">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Warnings</AlertTitle>
                            <AlertDescription>{state.data.warnings}</AlertDescription>
                        </Alert>
                    )}
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Optimized Route Steps</h4>
                    <div className="prose prose-sm text-muted-foreground max-w-none border border-border/50 rounded-lg p-4 bg-background/50">
                        <p>{state.data.optimizedRoute}</p>
                    </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-10">
                <Info className="mx-auto h-12 w-12 text-muted-foreground/30" />
                <p className="mt-4 text-muted-foreground">Results will be shown here once generated.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
