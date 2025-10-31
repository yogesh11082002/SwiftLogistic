
'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const emailSchema = z.string().email({ message: "Invalid email address" });
const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters long" });

export async function handleSignIn(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const emailValidation = emailSchema.safeParse(email);
  if (!emailValidation.success) {
    return { error: emailValidation.error.issues[0].message };
  }

  const passwordValidation = passwordSchema.safeParse(password);
  if (!passwordValidation.success) {
    return { error: passwordValidation.error.issues[0].message };
  }

  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Instead of redirecting here, we'll return a success state
  // to be handled by the client component. This gives the client
  // time to process the auth state change.
  return { success: true };
}

export async function handleSignUp(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const emailValidation = emailSchema.safeParse(email);
  if (!emailValidation.success) {
    return { error: emailValidation.error.issues[0].message };
  }

  const passwordValidation = passwordSchema.safeParse(password);
  if (!passwordValidation.success) {
    return { error: passwordValidation.error.issues[0].message };
  }

  const supabase = createServerActionClient({ cookies });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }
  
  if (data.user && data.user.identities && data.user.identities.length === 0) {
     return { error: "User already exists. Please login." };
  }


  return { success: true };
}

export async function handleSignOut() {
  const supabase = createServerActionClient({ cookies });
  await supabase.auth.signOut();
  redirect('/login');
}
