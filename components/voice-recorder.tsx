'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Mic } from 'lucide-react'

declare global {
  interface Window {
    webkitSpeechRecognition:typeof SpeechRecognition;
    SpeechRecognition:typeof SpeechRecognition;
  }
}

interface VoiceRecProps {
    onStop: (transcript: string) => void;
}

export default function VoiceRecorder({onStop}:VoiceRecProps) {
    const [recording, setRecording] = useState<boolean>(false);
    const [recordingComplete, setRecordingComplete] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>("");

    const recognitionRef = useRef<SpeechRecognition>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = true;
                recognitionRef.current.interimResults = true;
            } else {
                alert("Web Speech API not supported in this browser");
            }
        } else {
            alert("Web Speech API not supported in this browser");
        }
    }, [])

    const startRecording = () => {
        if (!recognitionRef.current) {
            alert("Web Speech API not supported in this browser");
            return;
        }
        setRecording(true);
        setRecordingComplete(false);

        recognitionRef.current.onresult = (event:SpeechRecognitionEvent) => {
            let fulltranscript = "";
            for (let i = 0; i < event.results.length; i++) {
                fulltranscript += event.results[i][0].transcript;
            }
            setTranscript(fulltranscript);
        }

        recognitionRef.current.onerror = (event:SpeechRecognitionErrorEvent) => {
            alert(`Speech Recognition Error ${event.error}`);
        }

        recognitionRef.current.start();
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setRecording(false);
            setRecordingComplete(true);
            if (transcript) {
                onStop(transcript);
            } else {
                alert("No audio recognized");
            }
        }
    }

    return (
        <button onClick={recording ? stopRecording : startRecording}
                className={`rounded-full w-[50px] h-[50px] bg-red-400 flex items-center justify-center ${recording ? 'animate-pulse' : ''}`}>
            <Mic/>
        </button>
    )

}