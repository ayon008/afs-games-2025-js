'use client'
import useAuth from '@/Hooks/useAuth';
import FaArrow from '@/icons/FaArrow';
import Link from 'next/link';
import React from 'react';

const RegisBtn = () => {
    const { user } = useAuth();
    return (
        <div className=''>
            <Link href={user ? `/profile?uid=${user?.uid}` : '/register'}>
                <button className="btn bg-[#FFE500] hover:bg-black hover:text-[#FFE500] border-2 border-white transition-all duration-200 ease-in border-none px-[25px] flex items-center group">
                    <span className="2xl:text-[25px] xl:text-[22px] text-lg font-normal inline-block">
                        SIGN UP
                    </span>
                    <FaArrow
                        className="2xl:w-[18px] xl:w-[16px] w-[14px] ml-2 transition-all duration-200"
                        color="black"
                    />
                </button>
            </Link>
        </div>
    );
};

export default RegisBtn;