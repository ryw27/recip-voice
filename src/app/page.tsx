import React from 'react';
import VoiceRecorder from '@/components/VoiceRecorder';
import SideNav from '@/components/sidenav';

export default function Home() {
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