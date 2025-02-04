'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  if (!data.email || !data.password) {
    console.error("no email/password");
    redirect('/');
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log("error ", error.message);
    redirect('/error')
  }

  // revalidatePath('/', 'layout')
  redirect('/')
}

export async function register(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log("Error: ", error);
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

