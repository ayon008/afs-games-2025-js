import { morgana } from '@/app/(Main)/layout';
import React from 'react';

const HeroBanner = ({ text }) => {
    return (
        <div className='lg:max-h-[718px] lg:min-h-[550px] min-h-[300px] 2xl:pt-[80px] xl:pt-[80px] pt-[80px] flex flex-col'>
            <div className='m-auto'>
                <h1 className={`${morgana.className} text-center lg:text-8xl text-5xl text-[#FFE500] uppercase`}>{text}</h1>
            </div>
        </div>
    );
};

export default HeroBanner;