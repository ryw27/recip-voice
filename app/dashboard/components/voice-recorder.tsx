'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Mic } from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'

declare global {
  interface Window {
    webkitSpeechRecognition:typeof SpeechRecognition;
    SpeechRecognition:typeof SpeechRecognition;
  }
}

interface VoiceRecProps {
    onStop: (transcript: string) => void;
}

export default function VoiceRecorder({onStop} : VoiceRecProps) {
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
        setTranscript("");
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

    const stopRecording = async () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setRecording(false);
            setRecordingComplete(true);
            if (transcript) {
                onStop(transcript);
            } 
        }
    }

    return (
        <Card className="bg-card p-6 w-3/4 shadow-lg rounded-xl">
            <CardHeader>
                <CardTitle className="font-semibold text-2xl text-gray-200">Record</CardTitle> 
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center gap-4">
                <button onClick={recording ? stopRecording : startRecording}
                        className={`flex py-3 px-6 gap-3 rounded-lg transition-all bg-red-400 
                        ${recording ? 'bg-red-500 animate-pulse shadow-lg' : 'bg-red-400 hover:bg-red-500 active:scale-95 shadow-md'}`}>
                    <Mic className="w-5 h-5"/> 
                    {recording ? "Recording..." : "Start Recording"}
                </button>
                <div className="w-full h-[1px] bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 opacity-40 my-4"></div>
                {/* <div className="w-full h-[1px] bg-gray-700 opacity-50 my-4"></div> */}
                {transcript && 
                    <div className="text-center bg-gray-800 p-4 rounded-lg border border-gray-700 w-full max-w-md">
                        <h3 className="font-bold text-gray-300">Transcript:</h3>
                        <p className="text-gray-400">{transcript}</p>
                    </div>
                }
            </CardContent>
        </Card>
    )

}