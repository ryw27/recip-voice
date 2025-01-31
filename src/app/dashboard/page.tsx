import React from 'react';
import VoiceRecorder from '@/components/VoiceRecorder';
import { supabase } from '@/utils/supabase/client'
// import { createClient } from '@/utils/supabase/server'
// import { cookies } from 'next/headers'

export default async function Home() {
  const { data, error } = await supabase
    .from('users')
    .select('*');
  if (error) {
    console.error('Error fetching data: ', error);
  } else {
    console.log("WE DID IT: ", data);
    // data.forEach(username => console.log(username));
    const JSONdata = JSON.stringify(data);
    console.log("no? ", JSONdata);
  }
  return (
    // <main className="flex h-screen items-center w-screen">
      /* <div className="flex flex-col h-full">
        <SideNav />
      </div> */
      <div className="flex justify-around flex-col items-center h-full w-full">
        {/* <h1 className="text-2xl font-bold">Save</h1> */}
        <VoiceRecorder />

      </div>
    // </main>
  );
}