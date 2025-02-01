'use client';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation'
import { useState } from 'react';



export default function Header() {
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();

    const handleLoginClick = () => {
        router.push("/login");
    }

    const handleDashboardClick = () => {
        router.push("/dashboard");
    }
    return (
        <header className="w-full">
            <div className="flex justify-between items-center py-4 px-4">
                <div className="text-lg font-bold cursor-pointer" onClick={() => router.push("/")}>
                Logo
                </div>
                <div className="flex items-center space-x-4">
                    <button className="bg-white rounded-md text-black px-4 py-2 cursor-pointer" 
                            onClick={loggedIn ? handleDashboardClick : handleLoginClick}>
                        {loggedIn? "Dashboard" : "Login"}
                    </button> 
                </div> 
            </div>
        </header>
    );
}