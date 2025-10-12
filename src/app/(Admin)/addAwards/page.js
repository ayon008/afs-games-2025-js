/* eslint-disable @next/next/no-img-element */
import getAllSponsors from '@/lib/getAllSponsors';
import AddAwards from '@/ui/AddAwards';
import React from 'react';

const page = async () => {
    
    const sponsors = await getAllSponsors();
    return (
        <div className='p-10'>
            <div className=''>
                <h3 className='text-2xl font-semibold text-center'>Add awards</h3>
                <p className='text-xs text-center font-semibold mt-2'>Manage awards by category</p>
            </div>
            <AddAwards sponsors={sponsors} />
        </div>
    );
};

export default page;