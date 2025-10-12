import getUserLeaderBoard from '@/lib/getUserLeaderBoard';
import dynamic from 'next/dynamic';
import React from 'react';
const SelectTab = dynamic(() => import('@/Components/SelectTab'), {
    ssr: false, // This ensures it will only be rendered on the client side
});

const page = async () => {
    const pointTable = await getUserLeaderBoard();
    return (
        <div className='p-10'>
            <div className='mb-10'>
                <h3 className='text-2xl font-semibold text-center'>Leaderboard</h3>
                <p className='text-xs text-center font-semibold mt-2'>Watch your rank</p>
            </div>
            <SelectTab pointTable={pointTable} />
        </div>
    );
};

export default page;