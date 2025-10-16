import FaArrow from '@/icons/FaArrow';
import React from 'react';

const Button = ({ text }) => {
    return (
        <button className='btn bg-[#FFE500] !border-[0.5px] !border-[#FFE500] hover:bg-black hover:text-[#FFE500] transition-all duration-150 ease-in px-[25px] flex items-stretch]'>
            <span className='2xl:text-[25px] xl:text-[22px] text-lg font-normal inline-block uppercase'>{text}</span>
            <FaArrow className={'2xl:w-[18px] xl:w-[16px] w-[14px] h-full'} color={'black'} />
        </button>
    );
};

export default Button;