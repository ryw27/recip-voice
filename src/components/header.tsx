import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { Router } from 'next/router';



export default function Header() {
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();

    useEffect (() => {
    });

    const handleLoginClick = () => {
        router.push("/login");
    }

    const handleDashboardClick = () => {
        router.push("/dashboard");
    }
    return (
        <div className="HEADER flex w-screen justify-between">
            <div className="text-lg font-bold">
              Logo
            </div>
            <button className="" onClick={loggedIn ? handleDashboardClick : handleLoginClick}>
                {loggedIn}
            </button>
        </div>
    );
}