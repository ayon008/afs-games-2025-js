import React from 'react';

const Prize = ({ position, text, sup }) => {
    return (
        <div className='bg-black rounded-xl flex flex-col h-fit w-[90%] mx-auto'>
            <div className='flex items-center w-full h-full'>
                <div className='bg-[#FFE500] h-full py-[15px] pl-[23px] pr-[12px] rounded-custom'>
                    <h1 className='text-black 2xl:text-5xl xl:text-5xl text-3xl font-semibold'>{position}<sup className='2xl:text-base xl:text-sm text-xs uppercase font-medium align-super'>{sup}</sup></h1>
                </div>
                <div className='h-full flex-grow'>
                    <p className='text-white 2xl:text-2xl xl:text-2xl uppercase font-semibold text-center'>
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Prize;