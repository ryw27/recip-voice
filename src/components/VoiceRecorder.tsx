"use client";
import { useRouter } from "next/navigation";


import React, { useState, useRef, useEffect } from 'react';
declare global {
  interface Window {
    webkitSpeechRecognition:any;
    SpeechRecognition:any;
  }
}
export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingComplete, setRecordingComplete] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");

  const router = useRouter()

  const recognitionRef = useRef<any>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
      } else {
        alert("Web Speech API is not supported in this browser.");
      }
    }
  }, []);

  const startRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition is not initialized");
      return;
    }

    setIsRecording(true);
    setRecordingComplete(false);
    
    // recognitionRef.current.onstart = () => console.log("Recognition started");
    // recognitionRef.current.onend = () => console.log("Recognition ended");
    // recognitionRef.current.onerror = (event:any) => console.error("Recognition error:", event.error);
    // recognitionRef.current.onnomatch = () => console.log("No match found");
    // recognitionRef.current.onaudiostart = () => console.log("Audio capturing started");
    // recognitionRef.current.onaudioend = () => console.log("Audio capturing ended");
    // recognitionRef.current.onsoundstart = () => console.log("Sound detected");
    // recognitionRef.current.onsoundend = () => console.log("Sound ended");
    // recognitionRef.current.onspeechstart = () => console.log("Speech started");
    // recognitionRef.current.onspeechend = () => console.log("Speech ended");


    recognitionRef.current.onresult = (event:any) => {
      let fullTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        fullTranscript += event.results[i][0].transcript; // Accumulate the transcript
      }
      
      setTranscript(fullTranscript);

    } 

    recognitionRef.current.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setRecordingComplete(true);
      // const textStream = generateText({
      //   model: openai('gpt-4o'),
      //   system: 'You are a great writer transcribing recipes as true as possible',
      //   prompt: `Transform this transcript: ${transcript} 
      //             into a coherent recipe with a title, ingredients, estimated time, and instructions`,
      // });
      // console.log(textStream);

      router.push("add")
    }
  }

  return (
    <div className="flex w-3/4 h-2/5 justify-center items-center rounded-lg flex-col"> 
      {(isRecording || transcript) &&
        <div className="w-1/2 bg-white flex flex-col rounded-lg p-12 mb-[24] text-center">
          <p className="font-bold">
            {recordingComplete ? "Recorded" : "Recording"}
          </p>
          <p>
            {recordingComplete ? "Saved" : "Start Speaking"}
          </p>
        </div>
      }
      <button onClick={isRecording ? stopRecording : startRecording} 
              className={`rounded-full w-10 h-10 bg-red-400 flex items-center justify-center ${isRecording ? 'animate-pulse' : ''}`}>
        <svg className="w-8 h-8" data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>

      {true && (
        <div className="text-center">
          <h3 className="font-bold">Transcript:</h3>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
};