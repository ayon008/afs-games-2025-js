import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Sponsor from '@/Shared/Sponsor';
import FaArrow from '@/icons/FaArrow';
import { antiHero, morgana } from '@/app/(Main)/layout';
import bannerImage from '../../public/Group (5).png';
import windfoil from "../../public/assets/Windfoil.jpg"
import parawing from "../../public/assets/Parawing.jpg"
import wingfoil from "../../public/assets/Wingfoil.jpg"
import downwind from "../../public/assets/Downwind.jpg"
import surffoil from "../../public/assets/Surffoil.jpg"
import dockstart from "../../public/assets/Dockstart.jpg"
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
            <div className='grid grid-cols-6 lg:gap-x-4 gap-x-2 w-fit mx-auto 2xl:mt-32 xl:mt-20 mt-10 px-6'>
                <div>
                    <Image
                        className='w-full aspect-[187/270] object-cover rounded-xl h-auto  2xl:mt-20 xl:mt-20 mt-10'
                        src={wingfoil}
                        alt=''
                    />
                    <p className='2xl:text-[28px] xl:text-xl lg:text-lg text-xs font-medium  text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Wingfoil</p>
                </div>
                <div>
                    <Image
                        className='w-full aspect-[187/270] object-cover rounded-xl h-auto'
                        src={surffoil}
                        alt=''
                    />
                    <p className='2xl:text-[28px] xl:text-xl lg:text-lg text-xs font-medium  text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Surf foil</p>
                </div>
                <div>
                    <Image
                        className='w-full aspect-[187/270] object-cover rounded-xl h-auto  2xl:mt-20 xl:mt-20 mt-10'
                        src={dockstart}
                        alt=''
                    />
                    <p className='2xl:text-[28px] xl:text-xl lg:text-lg text-xs font-medium  text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Dockstart</p>
                </div>
                <div>
                    <Image
                        className='w-full aspect-[187/270] object-cover rounded-xl h-auto'
                        src={windfoil}
                        alt=''
                    />
                    <p className='2xl:text-[28px] xl:text-xl lg:text-lg text-xs font-medium  text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Windfoil</p>
                </div>
                <div>
                    <Image
                        className='w-full aspect-[187/270] object-cover rounded-xl h-auto 2xl:mt-20 xl:mt-20 mt-10'
                        src={downwind}
                        alt=''
                    />
                    <p className='2xl:text-[28px] xl:text-xl lg:text-lg text-xs font-medium  text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Downwind</p>
                </div>
                <div>
                    <Image
                        className='w-full aspect-[187/270] object-cover rounded-xl h-auto'
                        src={parawing}
                        alt=''
                    />
                    <p className='2xl:text-[28px] xl:text-xl lg:text-lg text-xs font-medium  text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Parawing</p>
                </div>
            </div>
            <p className='2xl:text-3xl xl:text-lg font-semibold text-[#a9a9a4] 2xl:mt-24 xl:mt-16 text-center 2xl:w-3/4 xl:w-3/4 2xl:mx-auto xl:mx-auto px-6 mt-10 '>Regardless of your level or age, you can take part in this event, designed and created for our AFS customers. <span className='text-white'>
                Get equipped and start chaining sessions!</span></p>

            <h2 className={`${morgana.className} text-center text-white 2xl:text-6xl xl:text-4xl 2xl:mt-40 xl:mt-28 mt-16 text-2xl
            `}>registration is <span className='text-[#FFE500]'>Quick and quick!</span>
            </h2>

            <div className='2xl:mt-20 xl:mt-12 flex 2xl:flex-row xl:flex-row flex-col items-center justify-evenly mt-8 gap-6 2xl:gap-0 xl:gap-0 2xl:mb-48 xl:mb-32 mb-20'>
                <div className='2xl:w-[340px] xl:w-[320px] w-[280px] h-auto'>
                    <h4 className='text-white 2xl:text-[80px] xl:text-6xl font-medium text-5xl'>01</h4>
                    <p className='text-white font-medium 2xl:text-2xl xl:text-lg mt-4'><span className='text-[#a9a9a4]'>Click on the registration</span>  <br /> <Ici /></p>
                </div>
                <div className='2xl:w-[340px] xl:w-[320px] w-[280px] h-auto'>
                    <h4 className='text-white 2xl:text-[80px] xl:text-6xl font-medium text-5xl'>02</h4>
                    <p className='text-[#a9a9a4] font-medium 2xl:text-2xl xl:text-lg mt-4'>Fill in the form with your <br /> information.
                    </p>
                </div>
                <div className='2xl:w-[340px] xl:w-[320px] w-[280px] h-auto'>
                    <h4 className='text-white 2xl:text-[80px] xl:text-6xl font-medium text-5xl'>03</h4>
                    <p className='text-[#a9a9a4] font-medium 2xl:text-2xl xl:text-lg mt-4'>Validate your registration <br /> and receive your confirmation by email
                    </p>
                </div>
            </div>
            <div className='2xl:mb-48 xl:mb-32 mb-20'>
                <h1 className={`${morgana.className} text-center max-w-[1080px] mx-auto text-white 2xl:px-20 xl:px-16 px-10 2xl:text-[80px] xl:text-6xl text-3xl`}><span className=' text-[#FFE500] '>Your goal?</span> <br />
                    <span className='inline-block mt-6 gradient-text'>Chain sessions and add <br /> up the hours spent on <br /> the water!</span>
                </h1>
                {/* <p className='text-center text-white text-base mt-2'>At the end of the event, you will receive your results via email!</p> */}
            </div>
            <div className=''>
                <Join home={true} />
            </div>
        </div>
    )
}

export default Banner;
