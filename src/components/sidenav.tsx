import Link from 'next/link';
import NavLinks from './navlinks';

export default async function SideNav() {
    return (
        <div className="flex flex-col grow p-4 justify-begin space-y-2">
            <NavLinks />
        </div>
    )
}