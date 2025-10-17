import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Sponsor from '@/Shared/Sponsor';
import FaArrow from '@/icons/FaArrow';
import { antiHero, morgana } from '@/app/(Main)/layout';
import bannerImage from '../../public/assets/banner-image.png';
import windfoil from "../../public/assets/Windfoil.jpg"
import parawing from "../../public/assets/Parawing.jpg"
import wingfoil from "../../public/assets/Wingfoil.jpg"
import downwind from "../../public/assets/Downwind.jpg"
import surffoil from "../../public/assets/Surffoil.jpg"
import dockstart from "../../public/assets/Dockstart.jpg"
import Join from '@/Shared/Join';
import RegisBtn from '@/Components/RegisBtn';
import Ici from '@/Components/Ici';
import Button from '@/Components/Button';

const Banner = () => {

    return (
        <div className='z-30 2xl:pt-[158px] xl:pt-[138px] pt-[118px]'>
            <Image src={bannerImage} className='aspect-[704/566] mx-auto 2xl:w-[704px] xl:w-[604px] w-[70%] object-contain' alt='' />
            <div className='2xl:mt-[85px] xl:mt-[65px] mt-[45px] px-4'>
                <p className='text-white 2xl:text-4xl xl:text-3xl text-xl font-semibold text-center max-w-[1183px] w-full mx-auto'>
                    From October 20 to December 8, navigate to your favorite spots equipped with your GPS, upload your session to your account, and accumulate session hours to top the leaderboard!
                </p>
                <div className='flex items-center justify-center 2xl:mt-[85px] xl:mt-[65px] mt-[45px] 2xl:mb-[182px] xl:mb-[162px] mb-[132px]'>
                    <RegisBtn />
                </div>
                <p className='px-4 max-w-[1183px] 2xl:text-[25px] xl:text-[22px] text-lg font-light text-center text-white'>
                    The AFS GAMES is an exclusive event, <span className='text-[#FFE500]'>reserved only for customers equipped with AFS foils*</span>. This unique event highlights several foil disciplines, offering an unprecedented and immersive experience for participants. The particularity of the AFS GAMES is that they take place online!
                </p>
                <p className='2xl:mt-[30px] xl:mt-[28px] mt-[26px] 2xl:text-lg xl:text-base text-sm text-center text-[#FFE500]'>*The AFS customer is designated by a practitioner owning at least one AFS foil and using it as part of the challenges. The choice of board and wing is free.</p>
                <div className='2xl:mt-[182px] xl:mt-[162px] mt-[132px]'>
                    <h1 className={`${morgana.className} text-center text-white 2xl:text-[60px] xl:text-[54px] text-4xl`}>
                        Many prizes to win <br /> with <span className='text-[#FFE500]'>our partners</span>!
                    </h1>
                </div>
            </div>
            <div className='2xl:mt-[85px] xl:mt-[65px] mt-[45px]'>
                <Sponsor />
            </div>

            <div className='flex items-center justify-center
            2xl:mt-[85px] xl:mt-[65px] mt-[45px]'>
                <Link href={'/award'}>
                    <Button text={"Discover the partners"} />
                </Link>
            </div>

            <div className='2xl:mt-[182px] xl:mt-[162px] mt-[132PX] 2xl:mb-[118px] xl:mb-[98px] mb-[78px]'>
                <h1 className={`${morgana.className} text-center text-white 2xl:text-[60px] xl:text-[54px] text-4xl`}>
                    several disciplines
                    <span className='text-[#FFE500]'> to choose</span>
                </h1>
            </div>
            <div className='grid lg:grid-cols-6 grid-cols-3 lg:gap-x-4 gap-4 w-fit mx-auto px-5'>
                <div>
                    <Image
                        className='w-full aspect-[187/270] object-cover rounded-xl h-auto  2xl:mt-20 xl:mt-20 mt-10'
                        src={wingfoil}
                        alt=''
                    />
                    <p className='2xl:text-[25px] xl:text-[22px] text-lg font-medium lg:text-left text-center text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Wingfoil</p>
                </div>
                <div>
                    <Image
                        className='w-full aspect-[187/270] object-cover rounded-xl h-auto'
                        src={surffoil}
                        alt=''
                    />
                    <p className='2xl:text-[25px] xl:text-[22px] text-lg font-medium lg:text-left text-center text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Prone Foil</p>
                </div>
                <div>
                    <Image
                        className='w-full aspect-[187/270] object-cover rounded-xl h-auto  2xl:mt-20 xl:mt-20 mt-10'
                        src={dockstart}
                        alt=''
                    />
                    <p className='2xl:text-[25px] xl:text-[22px] text-lg font-medium lg:text-left text-center text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Dockstart</p>
                </div>
                <div>
                    <Image
                        className='w-full aspect-[187/270] object-cover rounded-xl h-auto'
                        src={windfoil}
                        alt=''
                    />
                    <p className='2xl:text-[25px] xl:text-[22px] text-lg font-medium lg:text-left text-center text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Windfoil</p>
                </div>
                <div>
                    <Image
                        className='w-full aspect-[187/270] object-cover rounded-xl h-auto 2xl:mt-20 xl:mt-20 mt-10'
                        src={downwind}
                        alt=''
                    />
                    <p className='2xl:text-[25px] xl:text-[22px] text-lg font-medium lg:text-left text-center text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Downwind</p>
                </div>
                <div>
                    <Image
                        className='w-full aspect-[187/270] object-cover rounded-xl h-auto'
                        src={parawing}
                        alt=''
                    />
                    <p className='2xl:text-[25px] xl:text-[22px] text-lg font-medium lg:text-left text-center text-white 2xl:mt-[18px] xl:mt-3 lg:mt-2 mt-1'>Parawing</p>
                </div>
            </div>
            <p className='2xl:text-[35px] xl:text-[28px] text-[22px] font-semibold text-center 2xl:mt-[160px] xl:mt-[140px] px-5 mt-[120px] max-w-[1183px] mx-auto text-white/40'>Regardless of your level or age, you can take part in this event, designed and created for our AFS customers. <span className='text-white'>
                Get equipped and start chaining sessions!</span></p>

            <h1 className={`${morgana.className} text-center text-white 2xl:text-[60px] xl:text-[54px] text-4xl uppercase 2xl:mt-[182px] xl:mt-[162px] mt-[132px] bottom-margin`}>
                registration is <span className='text-[#FFE500]'>Quick and easy!</span>
            </h1>

            <div className='flex 2xl:flex-row xl:flex-row flex-col items-center justify-evenly gap-10 2xl:gap-0 xl:gap-0 max-w-[1024px] mx-auto w-full'>
                <div className='2xl:w-[340px] xl:w-[320px] w-[280px] h-auto'>
                    <h4 className='text-white 2xl:text-[80px] xl:text-6xl font-semibold text-5xl lg:text-left text-center'>01</h4>
                    <p className='text-white font-light 2xl:text-2xl xl:text-xl text-lg mt-4 lg:text-left text-center'><span className='text-[#a9a9a4]'>Click on the registration</span>  <br /> <Ici /></p>
                </div>
                <div className='2xl:w-[340px] xl:w-[320px] w-[280px] h-auto'>
                    <h4 className='text-white 2xl:text-[80px] xl:text-6xl font-semibold text-5xl lg:text-left text-center'>02</h4>
                    <p className='text-white font-light 2xl:text-2xl xl:text-xl text-lg mt-4 lg:text-left text-center'>Fill in the form with your <br /> information.
                    </p>
                </div>
                <div className='2xl:w-[340px] xl:w-[320px] w-[280px] h-auto'>
                    <h4 className='text-white 2xl:text-[80px] xl:text-6xl font-semibold text-5xl lg:text-left text-center'>03</h4>
                    <p className='text-white font-light 2xl:text-2xl xl:text-xl text-lg mt-4 lg:text-left text-center'>Validate your registration <br /> and receive your confirmation by email
                    </p>
                </div>
            </div>
            <div className='top-margin'>
                <h1 className={`${morgana.className} text-center max-w-[1080px] mx-auto text-white 2xl:text-[110px] xl:text-[90px] text-[70px] leading-[90%]`}><span className=' text-[#FFE500] '>Your goal?</span> <br />
                    <span className='inline-block mt-6 gradient-text'>Chain sessions and add <br /> up the hours spent on <br /> the water!</span>
                </h1>
            </div>
            <div className='top-margin'>
                <Join home={true} />
            </div>
        </div>
    )
}

export default Banner;
