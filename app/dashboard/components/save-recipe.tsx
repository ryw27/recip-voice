// 'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
// import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface transcriptData {
  recipeName: string;
  Ingredients: string,
  Steps: string,
  Tips: string,
  EstimatedTime: string;
  recipeTags: string
  images: File[] 
}

interface Props {
    transcript : transcriptData;
    setTranscript : React.Dispatch<React.SetStateAction<transcriptData>>;
    onSubmit: (recipe:FormData) => void;
}
export default function RecipeSaver({transcript, setTranscript, onSubmit}: Props) {
    return (
    <Card className="flex-1 flex flex-col w-full">
        <CardHeader>
            <CardTitle>
                <div className="flex justify-between items-center">
                    Create Recipe 
                    <Button variant="outline" size="icon" className="ml-auto" 
                        onClick={() => setTranscript({...transcript, recipeName: "", Ingredients: "", Steps: "", Tips: "", EstimatedTime: "", recipeTags: "", images: []})}>
                        <X />
                    </Button>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <form className="flex-1 flex flex-col w-full"> 
                <div className="flex flex-col gap-2">
                    <label className="text-gray-300">Recipe Name</label>
                    <Input 
                        type="text"
                        value={transcript?.recipeName || ""}
                        onChange={(e) => setTranscript({ ...transcript, recipeName: e.target.value })}
                        className="bg-gray-800 text-white border border-gray-700"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-300">Ingredients</label>
                    <Input 
                        type="text"
                        value={transcript?.Ingredients || ""}
                        onChange={(e) => setTranscript({ ...transcript, Ingredients: e.target.value })}
                        className="bg-gray-800 text-white border border-gray-700"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-300">Steps</label>
                    <textarea
                        value={transcript?.Steps || ""}
                        onChange={(e) => setTranscript({ ...transcript, Steps: e.target.value })}
                        className="bg-gray-800 text-white border border-gray-700 w-full p-2 rounded-md resize-y"
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                        }}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-300">Tips</label>
                    <Input 
                        type="text"
                        value={transcript?.Tips || ""}
                        onChange={(e) => setTranscript({ ...transcript, Tips: e.target.value })}
                        className="bg-gray-800 text-white border border-gray-700"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-300">Estimated Time</label>
                    <Input 
                        type="text"
                        value={transcript?.EstimatedTime || ""}
                        onChange={(e) => setTranscript({ ...transcript, EstimatedTime: e.target.value })}
                        className="bg-gray-800 text-white border border-gray-700"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-300">Recipe Tags</label>
                    <Input 
                        type="text"
                        value={transcript?.recipeTags || ""}
                        onChange={(e) => setTranscript({ ...transcript, recipeTags: e.target.value })}
                        className="bg-gray-800 text-white border border-gray-700"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-300">Images</label>
                    <Input 
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files) {
                                setTranscript({ 
                                    ...transcript, 
                                    images: Array.from(e.target.files)
                                })
                            }
                        }}
                        className="bg-gray-800 text-white border border-gray-700"
                    />
                </div>
                <SubmitButton pendingText="Submitting" formAction={onSubmit} className="mt-4">
                    Submit
                </SubmitButton>
        </form>
        </CardContent>
    </Card>
  );
}