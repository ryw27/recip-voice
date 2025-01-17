"use client";
import React, { useEffect } from 'react';
import Input from '@/components/input';

export default function Home() {
  useEffect(() => {
    const userTranscript = localStorage.getItem("transcript");
    console.log(userTranscript);
  })
  return (
    // <main className="flex flex-col items-center justify-around border-black border-2">
    <main className="flex flex-col items-center justify-around w-full">
      <Input 
        label="Title"
        widthScale={.5} 
      />
      <Input 
        label="Ingredients"
        widthScale={.5}
      />
      <Input 
        label="Time"
        widthScale={.5}
      />
      <Input 
        label="Instructions"
        widthScale={.5}
      />
      <Input 
        label="Tips/Notes"
        widthScale={.5}
      />
      <Input
        label="Categories"
        widthScale={.5}
      />
    </main>
  );
}