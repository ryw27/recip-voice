import React from 'react';
import VoiceRecorder from '@/components/VoiceRecorder';

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-around">
      <h1 className="text-2xl font-bold">Save your recipes</h1>
      <VoiceRecorder />
    </main>
  );
}