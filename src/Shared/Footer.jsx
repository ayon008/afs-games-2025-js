import Image from 'next/image';
import React from 'react';
import logo from '../../public/logo.png'

const Footer = () => {
    const links = [
        { text: 'Règles', underline: true },
        { text: 'Politique de confidentialité', underline: true },
        { text: 'Avis sur les cookies', underline: true },
        { text: 'Foil and Co., All rights are reserved. ©2023', underline: false }
    ];

    return (
        <footer className='2xl:mt-40 xl:mt-28 mt-10 2xl:px-[10px] px-1'>
            <div className='2xl:py-5 xl:py-3 py-2 flex justify-between items-center border-t-2 border-black'>
                <div className='bg-black p-2 rounded'>
                    <Image className='2xl:w-[60px] xl:w-[60px] w-[50px] h-auto' src={logo} alt='Foil and Co. Logo' />
                </div>
                {links?.map(({ text, underline }, index) => (
                    <p
                        key={index}
                        className={`2xl:text-base xl:text-[10px] text-[6px] font-medium font-alliance ${underline ? 'underline' : ''}`}
                    >
                        {text}
                    </p>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
