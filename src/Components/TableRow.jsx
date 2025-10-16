/* eslint-disable @next/next/no-img-element */
import React from 'react';
import CountryFlagList from '@/js/GetFlags';
import profileImage from '@/../public/Profile_avatar_placeholder_large.png'
import Image from 'next/image';

const TableRow = ({ data, position, uid, onClick, displayMode = 'name', isOpen = false }) => {
    const { Wingfoil, Windfoil, dockstart, surfFoil, dw, WatermanCrown, displayName, photoURL, total, Parawing, team } = data;
    const isCurrent = uid && data?.uid && String(data.uid) === String(uid);
    // If a row is open (clicked), white background and black text should take precedence
    const activeBgClass = isOpen ? 'bg-white text-black' : (isCurrent ? 'bg-[#FFE500] text-black' : '');

    return (
        <tr id={uid} onClick={onClick} className={`${position === 1 ? 'first' : ''}
        ${position === 2 ? 'second' : ''} 
        ${position === 3 ? 'third' : ''} ${onClick ? 'cursor-pointer' : ''} hover:bg-[#FFE500] rounded-[10px] !hover:text-black transition-all duration-300 ease-in text-white`}>
            <th className={`${activeBgClass ? activeBgClass + ' rounded-l-xl px-2' : 'text-white'}`}>{position < 10 ? `0${position}` : position}</th>
            <td className={`${activeBgClass ? activeBgClass : ''}`}>
                <div className='flex items-center gap-2'>
                    <CountryFlagList countries={[data?.pays]} />
                    {
                        photoURL ?
                            <img alt='profile-image' className='2xl:w-[40px] 2xl:h-[40px] xl:w-[25px] xl:h-[25px] w-[15px] h-[15px] rounded-[50%] hidden lg:block' src={photoURL} />
                            :
                            <Image alt='profile-image' className='2xl:w-[40px] 2xl:h-[40px] xl:w-[25px] xl:h-[25px] w-[15px] h-[15px] rounded-[50%] hidden lg:block' src={profileImage} />
                    }
                    <h3 className={`2xl:text-lg xl:text-base text-sm font-medium ${activeBgClass ? 'text-black' : 'text-white'}`}>
                        {displayMode === 'team' ? (team || displayName) : displayName}
                    </h3>
                </div>
            </td>
            <td className={`2xl:text-lg xl:text-base text-sm font-medium ${activeBgClass ? activeBgClass : 'text-white'}`}>
                {Wingfoil ? Wingfoil?.toFixed(2) + ' ' + 'hours' : '0 hours'}
            </td>
            <td className={`2xl:text-lg xl:text-base text-sm font-medium ${activeBgClass ? activeBgClass : 'text-white'}`}>
                {Windfoil ? Windfoil?.toFixed(2) + ' ' + 'hours' : '0 hours'}
            </td>
            <td className={` 2xl:text-lg xl:text-base text-sm font-medium ${activeBgClass ? activeBgClass : 'text-white'}`}>
                {dockstart ? dockstart?.toFixed(2) + ' ' + 'hours' : '0 hours'}
            </td>
            <td className={` 2xl:text-lg xl:text-base text-sm font-medium ${activeBgClass ? activeBgClass : 'text-white'}`}>
                {surfFoil ? surfFoil?.toFixed(2) + ' ' + 'hours' : '0 hours'}
            </td>
            <td className={` 2xl:text-lg xl:text-base text-sm font-medium ${activeBgClass ? activeBgClass : 'text-white'}`}>
                {dw ? dw?.toFixed(2) + ' ' + 'hours' : '0 hours'}
            </td>
            <td className={` 2xl:text-lg xl:text-base text-sm font-medium ${activeBgClass ? activeBgClass : 'text-white'}`}>
                {Parawing ? Parawing?.toFixed(2) + ' ' + 'hours' : '0 hours'}
            </td>
            <td className={`2xl:text-lg xl:text-base text-sm font-medium text-right ${activeBgClass ? activeBgClass + ' rounded-r-xl' : 'text-white'}`}>
                {total?.toFixed(2) + ' ' + 'hours' || '0 hours'}
            </td>
        </tr>
    );
};


export default TableRow;