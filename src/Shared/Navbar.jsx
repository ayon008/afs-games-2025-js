import Image from 'next/image';
import React from 'react';
import logo from '@/../public/logo afs games (3).svg';
import Link from 'next/link';
import User from '@/ui/User';
import NavMobile from '@/Components/navMobile';

const Navbar = () => {

    const navItems = [
        'Award', 'Challenge', 'Leaderboard', 'Faq', 'Contacts'
    ]

    return (
        <nav className='flex items-center justify-between text-white 2xl:p-10 xl:p-8 p-3 fixed top-0 right-0 left-0 z-50 max-w-[1920px] mx-auto'>
            <Link href={'/'}>
                <Image src={logo} className='2xl:w-[92px] lg:w-[72px] w-[62px] h-auto' alt='logo' />
            </Link>
            <div className='flex items-center gap-1'>
                <ul className='bg-[#000] 2xl:flex xl:flex lg:flex items-center rounded-[10px] 2xl:px-[15px] 2xl:py-[10px] xl:px-[12px] xl:py-[8px] hidden backdrop-blur-[10px]'>

                    {
                        navItems?.map((item, index) => {
                            return (
                                <li key={index} className='flex items-center'>
                                    <Link href={`/${item.toLowerCase()}`} passHref>
                                        <p className='uppercase 2xl:text-base lg:text-xs font-semibold'>{item === 'Faq' ? 'GUIDES ⏐ FAQ' : item}</p>
                                    </Link>
                                    <div className='w-[7px] h-[7px] rounded-[50%] bg-[#FFE500] mx-4'>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <ul className=''>
                    <User />
                </ul>
            </div>
            <NavMobile />
        </nav>
    );
};

export default Navbar;