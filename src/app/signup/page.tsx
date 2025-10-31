'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { handleSignUp } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create an account'}
      </Button>
    );
}

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(handleSignUp, undefined);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account.</CardDescription>
        </CardHeader>
        <CardContent>
            {state?.success ? (
                <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Check your email!</AlertTitle>
                    <AlertDescription>
                        We&apos;ve sent a confirmation link to your email address. Please check your inbox to complete the sign-up process.
                    </AlertDescription>
                </Alert>
            ) : (
              <form action={formAction} className="space-y-4">
                {state?.error && (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{state.error}</AlertDescription>
                    </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                <SubmitButton />
              </form>
            )}
        </CardContent>
        <CardFooter className="text-sm">
          Already have an account?&nbsp;
          <Link href="/login" className="underline">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
