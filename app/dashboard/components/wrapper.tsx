'use client';
import React, { useState } from 'react';
import VoiceRecorder from './voice-recorder'
import RecipeSaver from './save-recipe'

interface TranscriptData {
  recipeName: string;
  Ingredients: string,
  Steps: string,
  Tips: string,
  EstimatedTime: string;
  recipeTags: string
  images: File[] 
}

export default function Wrapper() {
    const [transcript, setTranscript] = useState<TranscriptData>({
        recipeName: "",
        Ingredients: "",
        Steps: "",
        Tips: "",
        EstimatedTime: "",
        recipeTags: "",
        images: [],
    });

    const [editing, setEditing] = useState<boolean>(false);

    const transcribe = async (voiceTranscript: string) => {
        const response = await fetch('/api/transcribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({transcript: voiceTranscript})
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            setTranscript({
                ...result.data,
                images: [],
            });
            setEditing(true);
        } else {
            alert("Failed to transcribe audio");
        }
    }

    const saveRecipe = async () => {
        const response = await fetch('/api/transcribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({transcript})
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            setTranscript(result.data);
            setEditing(true);
        } else {
            alert("Failed to transcribe audio");
        }
    }
    return (
        <>
            {editing && (
                <div className="w-full max-w-4xl mx-auto p-6 transition-all duration-300 ease-in-out">
                    <RecipeSaver transcript={transcript} setTranscript={setTranscript} onSubmit={saveRecipe}/>
                </div>
            )}
            <div className="flex justify-around flex-col items-center h-full w-full">
                <VoiceRecorder onStop={transcribe}/>
            </div>
        </>
         
    )
}