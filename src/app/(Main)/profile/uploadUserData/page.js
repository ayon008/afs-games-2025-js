import UploadGPX from '@/ui/UploadGPX';
import React from 'react';
import { antiHero } from '../../layout';

const page = async () => {    
    return (
        <div className='2xl:px-36 2xl:pt-32 xl:px-20 xl:pt-32 px-6 pt-28'>
            <h1 className={`${antiHero.className} font-semibold 2xl:text-7xl xl:text-5xl text-3xl text-center text-white`}>Upload Your Results</h1>
            <p className='2xl:text-lg xl:text-sm text-base 2xl:mt-5 xl:mt-3 font-medium text-gray-400 text-center'>Select and upload the files of your choice</p>
            <UploadGPX />
        </div>
    );
};

export default page;
