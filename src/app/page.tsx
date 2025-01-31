import Link from 'next/link';
import { Card, CardHeader, CardDescription, CardTitle } from '@/components/ui/card'
import { Mic } from 'lucide-react';

export default function page() {
 
    return (
        <div className="flex flex-col justify-evenly">
            <div className="text-center text-4xl font-bold">
                Voice to Recipe
            </div>
            <p className="text-center text-gray-600">
                Transform cooking instructions into beautifully organized recipes with just your voice.
            </p>
            <div className="flex justify-center gap-4">
                <button className="bg-white text-black rounded-md shadow-md p-2">
                    <Link href="/signup">Get Started</Link>

                </button>
                <button className="bg-black text-white rounded-md shadow-md p-2">
                    <Link href="/login">Sign in</Link>
                </button> 
            </div>
            <div className="grid grid-cols-3 gap-4">
                <Card className="bg-card">
                    <CardHeader>
                        <Mic className="w-6 h-6 text-white"/>
                        <CardTitle>Record</CardTitle>
                        <CardDescription>
                            Simply speak your recipe instructions naturally
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className="bg-card">
                    <CardHeader>
                        <Mic className="w-6 h-6"/>
                        <CardTitle>Convert</CardTitle>
                        <CardDescription>
                            We'll transform your voice into organized recipe steps
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className="bg-card">
                    <CardHeader>
                        <Mic className="w-6 h-6"/>
                        <CardTitle>Save</CardTitle>
                        <CardDescription>
                            Save and access your recipes anywhere, anytime
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div> 
    );
}