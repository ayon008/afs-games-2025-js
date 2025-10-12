'use client'
import useAuth from '@/Hooks/useAuth';
import Link from 'next/link';
import React from 'react';

const Ici = () => {
    const { user } = useAuth();
    return (
        <Link className='' href={user ? `/profile?uid=${user?.uid}` : '/register'}>
            <span className='text-[#FFE500] underline cursor-pointer'>here.</span>
        </Link>
    );
};

export default Ici;