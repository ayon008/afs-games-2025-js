import React from 'react';
import GoogleSignUp from './GoogleSignUp';


const page = () => {
    return (
        <div className='xl:w-1/3 2xl:w-1/2 w-[90%] mx-auto'>
            <GoogleSignUp />
            <p className={`text-[#FFFFFF99] text-center Alliance 2xl:text-lg lg:text-base mt-2`}>
                By signing up, I confirm that I have read and accepted Foil&Co.’s
                <span className='text-[#FFE500]'> Terms & Conditions</span> and
                <span className='text-[#FFE500]'> Privacy Policy</span>.
            </p>
        </div>
    );
};

export default page;