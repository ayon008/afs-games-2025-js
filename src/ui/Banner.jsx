import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Sponsor from '@/Shared/Sponsor';
import FaArrow from '@/icons/FaArrow';
import { antiHero, morgana } from '@/app/(Main)/layout';
import bannerImage from '../../public/Group (5).png';
import image1 from '../../public/Rectangle 1.png';
import image2 from '../../public/Rectangle 2.png';
import image3 from '../../public/Rectangle 3.png';
import image4 from '../../public/Rectangle 4.png';
import image5 from '../../public/Rectangle 5.png';
import step1 from '../../public/Frame (1).png';
import step2 from '../../public/Frame 109.png';
import step3 from '../../public/Frame (2).png';
import Join from '@/Shared/Join';
import RegisBtn from '@/Components/RegisBtn';
import Ici from '@/Components/Ici';

const Banner = () => {

    return (
        <div className='z-30 pt-10'>
            <Image src={bannerImage} className='2xl:w-[527px] 2xl:h-[575px] mx-auto pt-24 xl:w-[450px] xl:h-[490px] w-[250px] h-auto' alt='' />
            <div className='2xl:px-32 xl:px-24 mt-10 mb-20 px-6'>
                <p className='text-white 2xl:text-3xl xl:text-xl font-semibold text-center text-xs max-w-[1184px] mx-auto'>
                    From September 30 to November 3, navigate to your favorite spots equipped with your GPS, upload your session to your account, and accumulate session hours to top the leaderboard!
                </p>
                <RegisBtn />
                <p className='text-center text-white 2xl:text-2xl xl:text-base font-medium 2xl:mt-32 xl:mt-24 text-sm mt-10 max-w-[1184px] mx-auto'>
                    The AFS GAMES is an exclusive event, <span className='text-[#FFE500]'>reserved only for customers equipped with AFS foils*</span>. This unique event highlights several foil disciplines, offering an unprecedented and immersive experience for participants. The particularity of the AFS GAMES is that they take place online!
                </p>
                <p className='2xl:text-base xl:text-[10px] text-[#FFE500] text-[8px] text-center mt-6'>*The AFS customer is designated by a practitioner owning at least one AFS foil and using it as part of the challenges. The choice of board and wing is free.</p>
                <div>
                    <h1 className={`${morgana.className} text-center text-white 2xl:mt-28 xl:mt-16 mt-10 2xl:text-6xl xl:text-4xl uppercase text-2xl`}>
                        Many prizes to win <br /> with <span className='text-[#FFE500]'>our partners</span>!
                    </h1>
                </div>
            </div>
            <Sponsor />

            <div className='w-fit mx-auto 2xl:mt-0 xl:mt-0 mt-10'>
                <Link href={'/award'}>
                    <button className='btn bg-[#FFE500] border-none'>
                        <span>DISCOVER THE PARTNERS</span>
                        <FaArrow className={'2xl:w-[14px] 2xl:h-[14px] w-[8px] h-[8px] xl:w-[10px] xl:h-[10px] 2xl:mt-1'} color={'black'} />
                    </button>
                </Link>
            </div>

            <div>
                <h1 className={`${morgana.className} text-center text-white 2xl:mt-28 xl:mt-16 2xl:text-6xl xl:text-4xl uppercase mt-10 text-2xl`}>
                    <span className='text-[#FFE500]'>several disciplines</span>
                    <br /> to choose
                </h1>
            </div>
            <div className='grid grid-cols-5 w-fit mx-auto 2xl:mt-32 xl:mt-20 2xl:gap-x-10 xl:gap-x-8 gap-x-4 mt-10 px-6'>
                <div>
                    <Image
                        className='w-full 2xl:h-[275px] xl:h-[250px] h-auto  2xl:mt-20 xl:mt-20 mt-10'
                        src={image1}
                        alt=''
                    />
                    <p className='2xl:text-[28px] xl:text-xl lg:text-lg text-xs font-semibold  text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Wingfoil</p>
                </div>
                <div>
                    <Image
                        className='w-full 2xl:h-[275px] xl:h-[250px] h-auto'
                        src={image2}
                        alt=''
                    />
                    <p className='2xl:text-[28px] xl:text-xl lg:text-lg text-xs font-semibold  text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Surf foil</p>
                </div>
                <div>
                    <Image
                        className='w-full 2xl:h-[275px] xl:h-[250px] h-auto  2xl:mt-20 xl:mt-20 mt-10'
                        src={image3}
                        alt=''
                    />
                    <p className='2xl:text-[28px] xl:text-xl lg:text-lg text-xs font-semibold  text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Dockstart</p>
                </div>
                <div>
                    <Image
                        className='w-full 2xl:h-[275px] xl:h-[250px] h-auto'
                        src={image4}
                        alt=''
                    />
                    <p className='2xl:text-[28px] xl:text-xl lg:text-lg text-xs font-semibold  text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Windfoil</p>
                </div>
                <div>
                    <Image
                        className='w-full 2xl:h-[275px] xl:h-[250px] h-auto 2xl:mt-20 xl:mt-20 mt-10'
                        src={image5}
                        alt=''
                    />
                    <p className='2xl:text-[28px] xl:text-xl lg:text-lg text-xs font-semibold  text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Downwind</p>
                </div>
            </div>
            <p className='2xl:text-3xl xl:text-lg font-semibold text-white 2xl:mt-24 xl:mt-16 text-center 2xl:w-3/4 xl:w-3/4 2xl:mx-auto xl:mx-auto px-6 mt-10'>Regardless of your level or age, you can take part in this event, designed and created for our AFS customers. <span className='text-[#FFE500]'>
                Get equipped and start chaining sessions!</span></p>

            <h2 className={`${morgana.className} text-center text-white 2xl:text-6xl xl:text-4xl 2xl:mt-40 xl:mt-28 mt-16 text-2xl
            `}>registration is <br /> <span className='text-[#FFE500]'>simple and quick!</span>
            </h2>

            <div className='2xl:mt-20 xl:mt-12 flex 2xl:flex-row xl:flex-row flex-col items-center justify-evenly mt-8 gap-6 2xl:gap-0 xl:gap-0 2xl:mb-48 xl:mb-32 mb-20'>
                <div className='2xl:w-[340px] xl:w-[320px] w-[280px] h-auto'>
                    <Image src={step1} alt='' />
                    <p className='text-white text-center font-semibold 2xl:text-2xl xl:text-lg mt-4'>Click on the <br /> registration link <Ici /></p>
                </div>
                <div className='2xl:w-[340px] xl:w-[320px] w-[280px] h-auto'>
                    <Image src={step2} alt='' />
                    <p className='text-white text-center font-semibold 2xl:text-2xl xl:text-lg mt-4'>Fill in the form <br /> with your information.
                    </p>
                </div>
                <div className='2xl:w-[340px] xl:w-[320px] w-[280px] h-auto'>
                    <Image src={step3} alt='' />
                    <p className='text-white text-center font-semibold 2xl:text-2xl xl:text-lg mt-4'>Validate your registration <br /> and receive your confirmation by email
                    </p>
                </div>
            </div>
            <div className='2xl:mb-48 xl:mb-32 mb-20'>
                <h1 className={`${antiHero.className} text-center max-w-[1080px] mx-auto text-[#FFE500] 2xl:px-20 xl:px-16 px-10 2xl:text-7xl xl:text-5xl text-2xl`}><span className='text-white '>Your goal?</span> <br />Chain sessions and add up the hours spent on the water!</h1>
                {/* <p className='text-center text-white text-base mt-2'>At the end of the event, you will receive your results via email!</p> */}
            </div>
            <div className=''>
                <Join home={true} />
            </div>
        </div>
    )
}

export default Banner;
