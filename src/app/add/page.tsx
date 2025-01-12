import React from 'react';
import Input from '@/components/input';

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-around">
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