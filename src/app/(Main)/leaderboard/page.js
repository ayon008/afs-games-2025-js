import React from 'react';
import getUserLeaderBoard from '@/lib/getUserLeaderBoard';
import Join from '@/Shared/Join';
import dynamic from 'next/dynamic';
import HeroBanner from "@/ui/Hero";
import AllMap from '@/Components/AllMap';
import { morgana } from '../layout';
const SelectTab = dynamic(() => import('@/Components/SelectTab'), {
    ssr: false, // This ensures it will only be rendered on the client side
});

const page = async () => {
    const pointTable = await getUserLeaderBoard();
    // Extract unique city names (preserve first-seen casing)
    const citiesList = (pointTable || []).map(p => p.city?.trim()).filter(Boolean);
    const uniqueCities = [...new Map(citiesList.map(c => [c.toLowerCase(), c])).values()];
    // Set the target date as November 1, 2024, 8 AM in France time (CET/CEST)
    const targetDate = new Date('2024-11-01T08:00:00+01:00'); // France time (CET)
    const currentDate = new Date();
    const afterTargetDate = new Date('2024-11-02T08:00:00+01:00')

    return (
        <div className="">
            <HeroBanner text={"Leaderboard"} />
            <div className='2xl:p-20 xl:p-20 py-12'>
                <SelectTab pointTable={pointTable} />
            </div>
            <div className='bg-black'>
                <div className='2xl:p-20 xl:p-20 py-12 px-4'>
                    <h1 className={`${morgana.className} 2xl:mb-20 xl:mb-20 mb-12 text-center text-white 2xl:text-[60px] xl:text-[54px] text-4xl`}>
                        <span className='text-[#FFE500]'>The Afs Games across the globe</span>
                    </h1>
                    {/* <AllMap cities={uniqueCities} pointTable={pointTable} /> */}
                </div>
            </div>
            <Join />
        </div>
    );
};

export default page;
