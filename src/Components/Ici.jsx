'use client'
import useAuth from '@/Hooks/useAuth';
import Link from 'next/link';
import React from 'react';

const Ici = () => {
    const { user } = useAuth();
    return (
        <Link className='' href={user ? `/profile?uid=${user?.uid}` : '/register'}>
            <span className='text-white underline cursor-pointer'>link here.</span>
        </Link>
    );
};

export default Ici;