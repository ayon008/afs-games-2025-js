import React from 'react';
import Join from '@/Shared/Join';
import { morgana } from '../layout';
import CountdownTimer from '@/ui/CountDown';
import Image from 'next/image';
import step1 from '../../../../public/Frame (5).svg';
import step2 from '../../../../public/Frame (4).svg';
import step3 from '../../../../public/Frame (6).svg';
import step4 from '../../../../public/Frame (7).svg';

const page = () => {
    return (
        <div className='2xl:pt-16 xl:pt-16'>
            <div className='max-h-[750px] min-h-[550px] flex flex-col'>
                <div className='m-auto'>
                    <h1 className={`${morgana.className} text-center 2xl:text-9xl xl:text-7xl text-white uppercase text-5xl`}>The Challenge</h1>
                    <p className={`text-[#FFE500] 2xl:text-6xl xl:text-4xl text-2xl ${morgana.className} text-center 2xl:mt-12 xl:mt-8`}>In October, chain your sessions!</p>
                </div>
            </div>
            <div className='w-fit mx-auto'>
                <CountdownTimer />
            </div>
            <p className='text-center text-white w-3/4 mx-auto 2xl:text-2xl xl:text-lg text-sm 2xl:mt-32 xl:mt-20 mt-10 font-medium'>
                The goal of the AFS GAMES is to motivate you to get on the water throughout October, to improve and push your limits in a friendly atmosphere. Accumulate hours of sailing and try to secure a spot on the podium, with prizes offered by our partners.
            </p>
            <p className='2xl:text-2xl xl:text-lg text-white text-center mt-10 font-medium'>
                To participate:
            </p>
            <div className='w-full 2xl:mt-20 xl:mt-12 grid 2xl:grid-cols-4 xl:grid-cols-4 mt-8 gap-y-10 2xl:gap-0 xl:gap-0'>
                <div className='w-full'>
                    <Image className='w-fit mx-auto' src={step1} alt='' />
                    <p className='text-white text-center font-semibold 2xl:text-3xl xl:text-2xl mt-[2px]'>Start a <br /> session at your <br /> favorite spot</p>
                </div>
                <div className='w-full'>
                    <Image className='w-fit mx-auto' src={step2} alt='' />
                    <p className='text-white text-center font-semibold 2xl:text-3xl xl:text-2xl mt-[2px]'>Once finished, <br /> export your <br /> GPX file</p>
                    <p className='2xl:mt-6 xl:mt-4 mt-2 text-white text-center font-semibold 2xl:text-xl xl:text-base'>(Too see tutorial
                        <br /> click <a target="_blank" href={"https://www.youtube.com/watch?si=qmSE-R7yfhAQ79Bh&v=jX7StWKJdt0&feature=youtu.be"} className={'text-[#FFE500] underline'}>here</a>).</p>
                </div>
                <div className='w-full'>
                    <Image className='w-fit mx-auto' src={step3} alt='' />
                    <p className='text-white text-center font-semibold 2xl:text-3xl xl:text-2xl mt-[2px]'>Log in to <br /> your profile and <br /> click on <br /> “import.”</p>
                </div>
                <div className='w-full'>
                    <Image className='w-fit mx-auto' src={step4} alt='' />
                    <p className='text-white text-center font-semibold 2xl:text-3xl xl:text-2xl mt-[2px]'>Upload your <br /> file and it’s <br /> validated!</p>
                </div>
            </div>
            <h3 className='2xl:text-3xl xl:text-2xl text-base px-6 text-center font-medium text-white 2xl:mt-11 xl:mt-11 mt-8 2xl:mb-48 xl:mb-32 mb-20'>You can then follow your progress in the ranking!</h3>
            <Join />
        </div>
    );
};

export default page;
