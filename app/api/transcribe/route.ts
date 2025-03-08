import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
    const { transcript } = await request.json();

    if (!transcript) {
        return NextResponse.json({error: "No transcript provided"}, {status: 400});
    }
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"});
        const prompt = `
            Take the recipe transcript: ${transcript}
            and return a valid JSON object with the following keys:
            - recipeName (string)
            - Ingredients (string)
            - Steps (string, numbered)
            - Tips (string)
            - EstimatedTime (string)
            - recipeTags (string).
            `;  
        const result = await model.generateContent(prompt);
        const generatedText = result.response.text();
        const cleanedText = generatedText
            .replace(/```json/g, "") 
            .replace(/```/g, "")     
            .trim();                 
        const parsedResult = JSON.parse(cleanedText);
        return NextResponse.json({data: parsedResult});
    } catch (apiError) {
        return NextResponse.json({error: apiError}, {status: 500});
    }
}
