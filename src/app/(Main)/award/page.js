/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Join from '@/Shared/Join';
import { morgana } from '../layout';
import getAllSponsors from '@/lib/getAllSponsors';
import Award from '@/ui/Award';
import Link from 'next/link';
import FaArrow from '@/icons/FaArrow';

const page = async () => {
    const data = await getAllSponsors();
    const sponsors = data?.filter(d => d?.showInHome !== 'true' && d?.showInPrize !== "true");
    return (
        <div className=''>
            <div className='max-h-[750px] min-h-[550px] flex flex-col'>
                <div className='m-auto'>
                    <h1 className={`${morgana.className} text-center lg:text-8xl text-5xl text-[#FFE500] uppercase`}>Award</h1>
                </div>
            </div>
            <div className='p-16'>
                <h2 className={`${morgana.className} uppercase text-center 2xl:text-7xl xl:text-5xl text-2xl text-white`}>Discover the event <span className='text-[#FFE500]'>partners</span></h2>

                <div className='grid 2xl:grid-cols-2 xl:grid-cols-2 grid-cols-1 2xl:mt-20 xl:mt-16 mt-10 2xl:gap-32 xl:gap-24 gap-y-10 2xl:justify-center xl:justify-center justify-normal'>
                    {
                        sponsors?.map((sponsor, i) => {
                            return (
                                <div key={i} className='2xl:space-y-6 xl:space-y-5 space-y-3 '>
                                    <div className='w-fit mx-auto'>
                                        <img src={sponsor.sponsorPicture} className='2xl:w-full 2xl:h-auto xl:w-full xl:h-auto w-[80px] h-auto' alt='sponsor' />
                                    </div>
                                    <p className='text-white/60 text-center 2xl:text-[25px] xl:text-xl text-lg font-medium'>
                                        {sponsor.sponsorDetails}
                                    </p>
                                    <div>
                                        {/* <a className='text-[#000] 2xl:text-2xl xl:text-lg text-sm font-semibold underline' href={sponsor.sponsorName}>{sponsor.sponsorName}</a> */}
                                        <div className='w-fit mx-auto 2xl:mt-10 xl:mt-8 mt-6'>
                                            <Link href={`${sponsor.sponsorName}`}>
                                                <button className='btn bg-[#FFE500] border-none'>
                                                    <span>{sponsor.sponsorName}</span>
                                                    <FaArrow className={'2xl:w-[14px] 2xl:h-[14px] w-[8px] h-[8px] xl:w-[10px] xl:h-[10px] 2xl:mt-1'} color={'black'} />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <h2 className={`${morgana.className} uppercase text-center 2xl:text-7xl xl:text-5xl text-2xl 2xl:mt-24 xl:mt-16 mt-10`}>The event podiums</h2>
                <p className='text-[#0000007f] 2xl:text-2xl xl:text-lg text-sm font-semibold text-center 2xl:my-12 xl:my-6 my-4'>Time spent on water in wingfoil, downwind, windfoil, dockstart, surf foil</p>
                <Award />
            </div>
            <Join />
        </div>
    );
};

export default page;
