/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Join from '@/Shared/Join';
import { morgana } from '../layout';
import getAllSponsors from '@/lib/getAllSponsors';
import Award from '@/ui/Award';
import Link from 'next/link';
import FaArrow from '@/icons/FaArrow';
import HeroBanner from "@/ui/Hero";

const page = async () => {
    const data = await getAllSponsors();
    const sponsors = data?.filter(d => d?.showInHome !== 'true' && d?.showInPrize !== "true");
    console.log(sponsors, 'sponsor');


    return (
        <div className=''>
            <HeroBanner text={'Award'} />
            <div className='px-4'>
                <h1 className={`${morgana.className} text-center text-white 2xl:text-[60px] xl:text-[54px] text-4xl`}>
                    Discover the event <span className='text-[#FFE500]'>partners</span>
                </h1>

                <div className='grid 2xl:grid-cols-2 xl:grid-cols-2 grid-cols-1 2xl:mt-[120px] xl:mt-[100px] mt-[80px] 2xl:gap-32 xl:gap-24 gap-y-20 2xl:justify-center xl:justify-center justify-normal'>
                    {
                        sponsors?.map((sponsor, i) => {
                            return (
                                <div key={i} className='2xl:space-y-[46px] xl:space-y-[40px] space-y-[36px]'>
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
                                                    <span className='uppercase font-light'>{i === 0 ? "defiwind" : i === 1 ? "SOORUZ" : i === 2 ? "FOILING MAGZINE" : i === 3 ? "A3D" : "AP3D"}</span>
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
                <h2 className={`${morgana.className} uppercase text-center 2xl:text-7xl xl:text-5xl text-2xl top-margin text-white`}>event <span className='text-[#FFE500]'>podiums</span></h2>
                <p className='text-white/60 2xl:text-4xl xl:text-3xl text-2xl font-semibold text-center 2xl:my-[76px] xl:my-[56px] my-[40px]'>Time spent on water in wingfoil, downwind, windfoil, dockstart, surf foil</p>
                <Award />
            </div>
            <div className='top-margin'>
                <Join />
            </div>
        </div>
    );
};

export default page;
