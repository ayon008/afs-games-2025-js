/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link';
import React from 'react';
import useAuth from '@/Hooks/useAuth';
import { FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import profileImage from '../../public/Profile_avatar_placeholder_large.png'

const User = () => {
    const userInfo = useAuth();
    const { user, logOut } = userInfo;
    const uid = user?.uid;

    return (
        uid ?
            <li className='bg-[#000] 2xl:flex xl:flex lg:flex items-center rounded-[10px] 2xl:py-[6px] 2xl:px-[8px] xl:py-[2.5px] xl:px-[6px] hidden backdrop-blur-[10px]'>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="m-1 flex items-center gap-2">
                        {
                            user?.photoURL ?
                                <img src={user?.photoURL} alt='profile-picture' className='h-[20px] w-[20px] rounded-[50%]' />
                                :
                                <Image src={profileImage} alt='profile-picture' className='h-[20px] w-[20px] rounded-[50%]' />
                        }
                        <div className='flex items-center gap-1'>
                            <p className='uppercase 2xl:text-base lg:text-xs font-semibold'>{user?.displayName}</p>
                            <FaChevronDown className='mt-1' color='red' size={'0.8rem'} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow mt-5 bg-[#111]">
                        <li>
                            <Link href={`/profile?uid=${user?.uid}`} className='uppercase 2xl:text-base lg:text-xs font-semibold'>Profile</Link>
                        </li>
                        <li>
                            <p onClick={() => logOut()} className='uppercase 2xl:text-base lg:text-xs font-semibold'>log out</p>
                        </li>
                    </ul>
                </div>
            </li>
            :
            <>
                <li className='uppercase 2xl:text-base lg:text-xs font-semibold font-alliance bg-[#000] 2xl:flex xl:flex lg:flex items-center rounded-[10px] 2xl:px-[15px] 2xl:py-[10px] xl:px-[12px] xl:py-[8px] hidden backdrop-blur-[10px]'>
                    <Link href={'/login'} className='text-[#FFF] opacity-50'>
                        Login
                    </Link>
                    <div className='w-[7px] h-[7px] rounded-[50%] bg-[#FFE500] mx-4'>

                    </div>
                    <Link href={'/register'}>
                        Registration
                    </Link>
                </li>
            </>
    );
};

export default User;