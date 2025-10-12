import React from 'react';

const TopAchiver = () => {
    return (
        <div className='flex 2xl:flex-row xl:flex-row flex-col justify-between items-start 2xl:gap-0 xl:gap-0 gap-2 border-black border-b-2 2xl:mt-[18px] xl:mt-3 mt-2'>
            <h5 className='2xl:text-lg xl:text-sm font-semibold text-[10px]'>Wingfoil</h5>
            <div className='2xl:mb-[18px] xl:mb-3 mb-2'>
                <h3 className='2xl:text-lg xl:text-sm text-[10px] font-semibold first 2xl:py-2 2xl:px-[10px] xl:py-[5px] xl:px-2 px-1 py-[2px]'>#1. Garmin Fenix 7 Smartwatch</h3>
                <h3 className='2xl:text-lg xl:text-sm font-semibold second 2xl:py-2 2xl:px-[10px] xl:py-[5px] xl:px-2 my-1 px-1 py-[2px] text-[10px]'>#2. Exclusive Tour to Red Bull Air Race (including flights and accommodation)</h3>
                <h3 className='2xl:text-lg xl:text-sm font-semibold third 2xl:py-2 2xl:px-[10px] xl:py-[5px] xl:px-2 px-1 py-[2px] text-[10px]'>#3. Complete Neoprene Set (wetsuit, boots, gloves)</h3>
            </div>
        </div>
    );
};

export default TopAchiver;