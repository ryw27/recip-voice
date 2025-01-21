import React from 'react';
import VoiceRecorder from '@/components/VoiceRecorder';
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from('todos').select()
  return (
    // <main className="flex h-screen items-center w-screen">
      /* <div className="flex flex-col h-full">
        <SideNav />
      </div> */
      <div className="flex justify-around flex-col items-center h-full w-full">
        {/* <h1 className="text-2xl font-bold">Save</h1> */}
        <VoiceRecorder />
        <ul>
          {todos?.map((todo:any) => (
          <li>{todo}</li>
          ))}
        </ul>
      </div>
    // </main>
  );
}