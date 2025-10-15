import React from 'react';
import { morgana } from '../layout';
import getUserLeaderBoard from '@/lib/getUserLeaderBoard';
import Join from '@/Shared/Join';
import dynamic from 'next/dynamic';
const SelectTab = dynamic(() => import('@/Components/SelectTab'), {
    ssr: false, // This ensures it will only be rendered on the client side
});

export const pointTable = await getUserLeaderBoard();

const page = async () => {
    const pointTable = await getUserLeaderBoard();
    // Set the target date as November 1, 2024, 8 AM in France time (CET/CEST)
    const targetDate = new Date('2024-11-01T08:00:00+01:00'); // France time (CET)
    const currentDate = new Date();
    const afterTargetDate = new Date('2024-11-02T08:00:00+01:00')

    return (
        <div className="">
            <div className="max-h-[718px] min-h-[500px] 2xl:pt-[140px] xl:pt-[120px]  flex flex-col">
                <div className='m-auto'>
                    <h1 className={`${morgana.className} text-center lg:text-8xl text-5xl text-[#FFE500] uppercase`}>Leaderboard</h1>
                </div>
            </div>
            <div className='2xl:p-20 xl:p-20 py-12'>
                <SelectTab pointTable={pointTable} />
            </div>
            <Join />
        </div>
    );
};

export default page;
