"use client";

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
  
  const recognitionRef = useRef<any>(null);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  useEffect(() => {
    return () => {
      if (typeof window == "undefined") {
        alert("Web Speech API not supported");
        return ;
      }
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert("Web Speech API not supported in this browser");
        return;
      }
      
      // if (recognitionRef.current) {
      //   console.log("stopped");
      //   recognitionRef.current.stop()
      // }
    }
  });

  const startRecording = () => {
    setIsRecording(true);
    setRecordingComplete(false);
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.start();
    console.log("started");
    recognitionRef.current.onstart = () => console.log("Recognition started");
    recognitionRef.current.onend = () => console.log("Recognition ended");
    recognitionRef.current.onerror = (event:any) => console.error("Recognition error:", event.error);
    recognitionRef.current.onnomatch = () => console.log("No match found");
    recognitionRef.current.onaudiostart = () => console.log("Audio capturing started");
    recognitionRef.current.onaudioend = () => console.log("Audio capturing ended");
    recognitionRef.current.onsoundstart = () => console.log("Sound detected");
    recognitionRef.current.onsoundend = () => console.log("Sound ended");
    recognitionRef.current.onspeechstart = () => console.log("Speech started");
    recognitionRef.current.onspeechend = () => console.log("Speech ended");


    recognitionRef.current.onresult = (event:any) => {
      let fullTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        fullTranscript += event.results[i][0].transcript; // Accumulate the transcript
      }
      setTranscript(fullTranscript);
    } 
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setRecordingComplete(true);
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