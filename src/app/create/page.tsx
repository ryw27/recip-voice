"use client";
import React, { useEffect, useState } from 'react';
import Input from '@/components/input';

interface transcriptData {
  recipeName: string;
  Ingredients: string,
  Steps: string,
  Tips: string,
  EstimatedTime: string;
  recipeTags: string
}

export default function Home() {
  const [transcript,setTranscript] = useState<transcriptData>()
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  useEffect(() => {
    const fetchAndProcessTranscript = async () => {
      const userTranscript = localStorage.getItem("transcript");
      if (userTranscript) {
        const data = JSON.parse(userTranscript); 
        if (data.transcript) {
          const genAI = new GoogleGenerativeAI("AIzaSyAp6hXPk_ixdLqSlzru4g-b1KR2aRzAlHU");
          const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"});
          const prompt = `
              Take the recipe transcript: ${data.transcript}
              and return a valid JSON object with the following keys:
              - recipeName (string)
              - Ingredients (string)
              - Steps (string, numbered)
              - Tips (string)
              - EstimatedTime (string)
              - recipeTags (string).
            `;  
          try {
            const result = await model.generateContent(prompt);
            const generatedText = result.response.text();
            const cleanedText = generatedText
              .replace(/```json/g, "") 
              .replace(/```/g, "")     
              .trim();                 
            const parsedResult = JSON.parse(cleanedText);
            setTranscript(parsedResult);
            console.log(transcript?.Steps);
          } catch {
            console.error("Error generating content");
          }
        }
      }     
    }
    fetchAndProcessTranscript();
  }, [])

  return (
    // <main className="flex flex-col items-center justify-around border-black border-2">
    <main className="flex flex-col items-center justify-around w-full color-white">
      <Input 
        label="Recipe Name"
        inputText={transcript?.recipeName}
        widthScale={.5} 
      />
      <Input 
        label="Ingredients"
        inputText={transcript?.Ingredients}
        widthScale={.5}
      />
      <Input 
        label="Estimated Time"
        inputText={transcript?.EstimatedTime}
        widthScale={.5}
      />
      <Input 
        label="Steps"
        inputText={transcript?.Steps}
        widthScale={.5}
      />
      <Input 
        label="Tips"
        inputText={transcript?.Tips}
        widthScale={.5}
      />
      <Input
        label="Tags"
        inputText={transcript?.recipeTags}
        widthScale={.5}
      />
    </main>
  );
}