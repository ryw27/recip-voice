// 'use client';
// import React, {useEffect, useState} from 'react';
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
// import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js';
import { InfoIcon } from "lucide-react";
import Wrapper from "./components/wrapper";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // const [transcript, setTranscript] = useState<string>("");
  // const [user, setUser] = useState<User>();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // useEffect(() => {
  //   const getUser = async () => {
  //     const { data, error } = await supabase.auth.getSession();

  //     if (error) {
  //       return redirect("/sign-in");
  //     }

  //     setUser(data?.session?.user);
  //   };
  //   getUser();
  // }, []) 


  return (
    <>
      <div className="flex justify-around flex-col items-center h-full w-full">
        <Wrapper />
        {/* <VoiceRecorder /> */}
      </div>
      {/* {transcript && (
        <div className="text-center">
          <h3 className="font-bold">Transcript:</h3>
          <p>{transcript}</p>
        </div> */}
      {/* )}   */}
      <div className="flex-1 w-full flex flex-col gap-12">
        <div className="w-full">
          <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
            <InfoIcon size="16" strokeWidth={2} />
            This is a protected page that you can only see as an authenticated
            user
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-bold text-2xl mb-4">Your user details</h2>
          <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
        <div>
          <h2 className="font-bold text-2xl mb-4">Next steps</h2>
          <FetchDataSteps />
        </div>
      </div>
    </>
  );
}
