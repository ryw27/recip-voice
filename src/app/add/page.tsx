import React from 'react';
import Input from '@/components/input';

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-around">
      <Input 
        label="hello"
        widthScale={.5} 
      />
    </main>
  );
}