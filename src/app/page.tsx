import Link from 'next/link';
import { Card, CardHeader, CardDescription, CardTitle } from '@/components/ui/card'
import { Mic, ChefHat, Wrench } from 'lucide-react';
import Header from '@/components/header';

export default function page() {
 
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto p-4 mt-14">
                <div className="mb-12 space-y-4">
                    <h1 className="text-center text-6xl font-bold">
                        Voice to Recipe
                    </h1>
                    <p className="text-center text-lg text-gray-600 mx-auto max-w-xl">
                        Transform cooking instructions into beautifully organized recipes with just your voice.
                    </p>
                    <div className="flex justify-center gap-4 pt-2">
                        <button className="bg-white text-black rounded-md shadow-md p-2 min-w-4 flex-grow max-w-[120px] hover:bg-slate-300">
                            <Link href="/signup">Get Started</Link>

                        </button>
                        <button className="bg-black text-white rounded-md shadow-md p-2 border-2
                                         border-neutral-500 flex-grow max-w-[120px] hover:bg-slate-500">
                            <Link href="/login">Sign in</Link>
                        </button> 
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mx-auto max-w-5xl">
                    <Card className="bg-card">
                        <CardHeader>
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 mb-4">
                                <Mic className="w-6 h-6 text-white"/>
                            </div>
                            <CardTitle className="text-white">Record</CardTitle>
                            <CardDescription>
                                Simply speak your recipe instructions naturally
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="bg-card">
                        <CardHeader>
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 mb-4">
                                <ChefHat className="w-6 h-6 text-white"/>
                            </div>
                            <CardTitle className="text-white">Convert</CardTitle>
                            <CardDescription>
                                We'll transform your voice into organized recipe steps
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="bg-card">
                        <CardHeader>
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 mb-4">
                                <Wrench className="w-6 h-6 text-white"/>
                            </div> 
                            <CardTitle className="text-white">Save</CardTitle>
                            <CardDescription>
                                Save and access your recipes anywhere, anytime
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </main> 
        </div> 
    );
}