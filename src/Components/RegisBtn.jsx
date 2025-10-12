'use client'
import useAuth from '@/Hooks/useAuth';
import FaArrow from '@/icons/FaArrow';
import Link from 'next/link';
import React from 'react';

const RegisBtn = () => {
    const { user } = useAuth();
    return (
        <div className='w-fit mx-auto 2xl:mt-10 xl:mt-8 mt-6'>
            <Link href={user ? `/profile?uid=${user?.uid}` : '/register'}>
                <button className='btn bg-[#FFE500] border-none'>
                    <span>SIGN UP</span>
                    <FaArrow className={'2xl:w-[14px] 2xl:h-[14px] w-[8px] h-[8px] xl:w-[10px] xl:h-[10px] 2xl:mt-1'} color={'black'} />
                </button>
            </Link>
        </div>
    );
};

export default RegisBtn;