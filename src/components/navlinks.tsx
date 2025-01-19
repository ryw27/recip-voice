"use client";
import {
   PlusIcon,
   HomeIcon,
   MicrophoneIcon
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


const links = [
    {name: 'Record Recipe', href: '/', icon:MicrophoneIcon},
    {name: 'Add Recipe', href: '/create', icon:PlusIcon},
    {name: 'Recipes', href:'/recipes'}
]

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
            return (
                <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                        'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-md font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                        {
                        'bg-sky-100 text-blue-600': pathname === link.href,
                        }
                    )}
                >
                    
                    <p className='hidden md:block'>{link.name}</p>
                </Link>
            );
            })}
        </>
    );  
}
