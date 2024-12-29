"use client";

import React, { useState, useRef } from 'react';

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingComplete, setRecordingComplete] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");

  const startRecording = () => {
    // Implement Web Speech API here
    setIsRecording(true);
    setTranscript("hiyo silver");
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Stop recording and process the audio

  };

  return (
    <div className="flex w-3/4 h-2/5 justify-center items-center rounded-lg flex-col"> 
      {(isRecording || transcript) &&
        <div className="w-1/2 bg-white flex flex-col rounded-lg p-12 mb-[24] text-center">
          <p className="font-bold">
            {isRecording ? "Recording" : "Recorded"}
          </p>
          <p>
            {isRecording ? "Start Speaking" : "Saved!"}
          </p>
        </div>
      }
      <button onClick={isRecording ? stopRecording : startRecording} 
              className={`rounded-full w-10 h-10 bg-red-400 ${isRecording ? 'animate-pulse' : ''}`}>
        
      </button>

      {transcript && (
        <div>
          <h3>Transcript:</h3>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
};

