import React from 'react';
import Join from '@/Shared/Join';
import { morgana } from '../layout';
import CountdownTimer from '@/ui/CountDown';

const page = () => {
    return (
        <div className='2xl:pt-72 xl:pt-56 pt-28'>
            <div className='w-fit mx-auto'>
                <CountdownTimer />
            </div>
            <p className='text-center text-white/60 w-3/4 mx-auto 2xl:text-3xl xl:text-xl text-base 2xl:mt-32 xl:mt-20 mt-10 font-medium'>
                The goal of the AFS GAMES is to motivate you to get on the water throughout October, to improve and push your limits in a friendly atmosphere. Accumulate hours of sailing and try to secure a spot on the podium, with prizes offered by our partners.
            </p>
            <p className={`2xl:text-[60px] xl:text-5xl text-3xl text-white text-center mt-10 font-medium ${morgana.className} mb-10`}>
                To <span className='text-[#FFE500]'>participate</span>
            </p>
            <div className='2xl:my-20 xl:my-16 my-10 grid lg:grid-cols-4 grid-cols-1 justify-center lg:items-start px-4 max-w-[1150px] w-full mx-auto gap-10 items-center'>
                <div className='2xl:w-[340px] xl:w-[320px] w-full h-auto'>
                    <h4 className='text-white 2xl:text-[80px] xl:text-6xl font-medium text-5xl gradient-text lg:text-left text-center'>01</h4>
                    <p className='text-white/60 lg:text-left text-center font-light 2xl:text-2xl xl:text-xl text-base mt-4'>
                        Start a session at <br /> your favorite spot
                    </p>
                </div>
                <div className='2xl:w-[340px] xl:w-[320px] w-full h-auto'>
                    <h4 className='text-white 2xl:text-[80px] xl:text-6xl font-medium text-5xl gradient-text lg:text-left text-center'>02</h4>
                    <p className='text-white/60 lg:text-left text-center font-light 2xl:text-2xl xl:text-xl text-base mt-4'>
                        Once finished, <br /> export your GPX file <br /> (tutorials will be <br />available soon)
                    </p>
                </div>
                <div className='2xl:w-[340px] xl:w-[320px] w-full h-auto'>
                    <h4 className='text-white 2xl:text-[80px] xl:text-6xl font-medium text-5xl gradient-text lg:text-left text-center'>03</h4>
                    <p className='text-white/60 lg:text-left text-center font-light 2xl:text-2xl xl:text-xl text-base mt-4'>
                        Log in to your profile <br /> and click on <br /> "import."
                    </p>
                </div>
                <div className='2xl:w-[340px] xl:w-[320px] w-full h-auto'>
                    <h4 className='text-white 2xl:text-[80px] xl:text-6xl font-medium text-5xl gradient-text lg:text-left text-center'>04</h4>
                    <p className='text-white/60 lg:text-left text-center font-light 2xl:text-2xl xl:text-xl text-base mt-4'>
                        Upload your file and <br /> it's validated!
                    </p>
                </div>
            </div>
            <div>
                <h5 className={`text-white ${morgana.className} 2xl:text-[110px] xl:text-[90px] font-normal text-6xl text-center xl:pb-16 2xl:pb-20 pb-10`}> You can then follow <br /> your progress in the <br /> <span className='text-[#FFE500]'>ranking!</span></h5>
            </div>
            <Join />
        </div>
    );
};

export default page;
