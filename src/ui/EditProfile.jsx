/* eslint-disable @next/next/no-img-element */
'use client';
import { antiHero } from '@/Components/Font';
import useAuth from '@/Hooks/useAuth';
import Link from 'next/link';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import profileImage from '@/../public/Profile_avatar_placeholder_large.png'
import Image from 'next/image';

const EditProfile = () => {
    const { user } = useAuth();

    return (
        <div className='flex items-start justify-between w-full'>
            <div className='flex 2xl:items-center xl:items-center items-start gap-y-2 2xl:gap-2 xl:gap-2 2xl:flex-row xl:flex-row flex-col-reverse 2xl:w-fit xl:w-fit w-[70%]'>
                <h1 className='text-white font-semibold 2xl:text-7xl xl:text-5xl text-3xl'>
                    <span className={`${antiHero.className} text-[#FAE500]`}>
                        Hello
                    </span>, <span className='2xl:ml-3 xl:ml-3 ml-1'>{user?.displayName}</span>
                </h1>
                {
                    user?.photoURL ?
                        <img src={user?.photoURL} className='xl:w-[50px] xl:h-[50px] 2xl:w-[70px] 2xl:h-[70px] w-[40px] h-[40px] rounded-[10px] object-cover' alt='profile photo' />
                        :
                        <Image src={profileImage} className='xl:w-[50px] xl:h-[50px] 2xl:w-[70px] 2xl:h-[70px] w-[40px] h-[40px] rounded-[10px] object-cover' alt='profile photo' />
                }
            </div>
            <Link href={`/profile/${user?.uid}`}>
                <div className='flex items-center gap-1'>
                    <p className='text-white 2xl:text-lg xl:text-lg text-xs'>Edit Information</p>
                    <FaPen color='white' />
                </div>
            </Link>
        </div>
    );
};

export default EditProfile;
