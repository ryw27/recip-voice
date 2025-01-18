"use client";
import React, { useEffect, useState } from 'react';
import Input from '@/components/input';
import { resourceLimits } from 'worker_threads';

interface transcriptData {
  recipeName: string;
  categories: {
    Ingredients: string[],
    Steps: string[],
    Tips: string[],
    EstimatedTime: string;
    recipeTags: string[]
  }
}

export default function Home() {
  const [transcript,setTranscript] = useState<transcriptData>()
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  useEffect(() => {
    const fetchAndProcessTranscript = async () => {
      const userTranscript = localStorage.getItem("transcript");
      if (userTranscript) {
        const data = JSON.parse(userTranscript);
        // setTranscript(data.transcript ?? "")
        const genAI = new GoogleGenerativeAI("AIzaSyAp6hXPk_ixdLqSlzru4g-b1KR2aRzAlHU");
        const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"});
        const prompt = `Take the following recipe transcript ${data.transcript} and convert it into a readable recipe
                          in JSON format with categories Ingredients, Steps, Tips, Estimated Time, and recipe tags`;
        try {
          const result = await model.generateContent(prompt);
          console.log("Results: ", result.response.text());
          setTranscript(result.response.text() ?? "")
        } catch {
          console.error("Error generating content");
        }
    }
    }  
    fetchAndProcessTranscript();
  }, [])
  return (
    // <main className="flex flex-col items-center justify-around border-black border-2">
    <main className="flex flex-col items-center justify-around w-full color-white">
      <Input 
        label={transcript?.recipeName || "Recipe Name"}
        widthScale={.5} 
      />
      <Input 
        label={transcript?.categories.Ingredients || "Ingredients"}
        widthScale={.5}
      />
      <Input 
        label={transcript?.categories.EstimatedTime || "Time"}
        widthScale={.5}
      />
      <Input 
        label={transcript?.categories.Steps|| "Steps"}
        widthScale={.5}
      />
      <Input 
        label={transcript?.categories.Tips|| "Tips"}
        widthScale={.5}
      />
      <Input
        label={transcript?.categories.recipeTags || "Tags"}
        widthScale={.5}
      />
    </main>
  );
}