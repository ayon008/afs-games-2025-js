/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Image from 'next/image';
import image from "../../public/assets/Vector 1.png"
import { inter } from '@/fonts/inter';
import price1 from "../../public/Group 37165.png";
import price2 from "../../public/Group 37166.png";
import price3 from "../../public/Group 37167.png";
import price4 from "../../public/Group 37168.png";
import price5 from "../../public/Group 37170 1 2.png"
import price6 from "../../public/Group 37171 1 1.png";
import price7 from "../../public/Group 37172 1 1.png";
import price8 from "../../public/Group 37173 (2) 2.png"

const Award = () => {
    // const categories = ['Wingfoil', 'Windfoil', 'dockstart', 'surfFoil', 'dw', 'Parawing'];
    const categories = ['Wingfoil', 'Windfoil', 'Dockstart', 'Pron Foil', 'Downwind', 'Parawing'];
    const [tabIndex, setTabIndex] = useState(0);
    const text = <p className='2xl:text-6xl xl:text-5xl text-3xl text-white text-center mt-28'>Prizes to be announced soon</p>
    const headline = `${inter.className} font-inter font-black text-[25px] leading-[100%] tracking-[-0.01em] text-center text-white`;
    const textClass = `${inter.className} font-inter font-light text-[25px] leading-[100%] tracking-[-0.01em] text-center text-white flex flex-col justify-between`;
    return (
        <div className='mt-10 w-[90%] mx-auto'>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className={'2xl:mx-4 xl:mx-4 mx-0'}>
                <TabList className={'flex items-center 2xl:justify-center xl:justify-center justify-between 2xl:gap-10 xl:gap-10 gap-4 cursor-pointer w-full px-1 overflow-x-auto 2xl:mb-[76px] xl:mb-[56px] mb-[40px]'}>
                    {
                        categories?.map((category, i) => {
                            return (
                                <Tab key={i} className={`${tabIndex === i && '!text-[#FFE500] pb-1 border-b-2 border-[#FFE500]'} 2xl:text-lg xl:text-sm text-xs font-semibold uppercase pb-1 text-white`}>{category === 'surfFoil' ? 'prone foil' : category === 'dw' ? 'Downwind' : category}</Tab>
                            )
                        })
                    }
                </TabList>
                {/* Wingfoil */}
                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6'}>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-[27px] max-w-[1183px] mx-auto w-full items-start'>
                        <div className='z-10 relative'>
                            <div className='space-y-6 py-9 px-10 vertical-line bg-[#2020204D] relative z-10'>
                                <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                                <div>
                                    <p className={`${textClass} h-[195px] `}>
                                        <p className={headline}>AFS</p>
                                        <span className='inline-block'>
                                            Wing STREAM
                                        </span>
                                        <span className='inline-block'>
                                            Merchandising <br /> Collection
                                        </span>
                                        <span className='inline-block'>
                                            1:1 Tech Talk with the Expert of your choice
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[90px] ${textClass}`}>
                                        <p className={headline}>SOÖRUZ</p>
                                        <span className='inline-block'>
                                            1x Wetsuit
                                        </span>
                                        <span className='inline-block'>
                                            SPECIAL Collection
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[50px] ${textClass}`}>
                                        <p className={headline}>AP3D</p>
                                        <span className='inline-block'>
                                            1x Rake Shim
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[50px] ${textClass}`}>
                                        <p className={headline}>A3D</p>
                                        <span className='inline-block'>
                                            1x Artness Pro 2
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[50px] ${textClass}`}>
                                        <p className={headline}>FOILING MAG</p>
                                        <span className='inline-block'>
                                            1x Annual subscription
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <Image src={price1} alt='' className='max-w-[422px] max-h-[432px] lg:w-[422px] w-full aspect-[422/432] -mt-6 !z-20 relative ml-0 lg:-ml-[80px]' />
                        </div>
                        <div>
                            <div className='space-y-6 py-9 px-10 vertical-line bg-[#2020204D]'>
                                <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>2<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>nd</span></h4>
                                <div>
                                    <p className={`${textClass} h-[155px] `}>
                                        <p className={headline}>AFS</p>
                                        <span className='inline-block'>
                                            Merchandising <br /> Collection
                                        </span>
                                        <span className='inline-block'>
                                            1:1 Tech Talk with the Expert of your choice
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[65px] ${textClass}`}>
                                        <p className={headline}>DÉFI WING</p>
                                        <span className='inline-block'>
                                            1x Entry - 2025 edition
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[90px] ${textClass}`}>
                                        <p className={headline}>SOÖRUZ</p>
                                        <span className='inline-block'>
                                            1x Watervest STRATO OFFSHORE Collection
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[50px] ${textClass}`}>
                                        <p className={headline}>AP3D</p>
                                        <span className='inline-block'>
                                            1x Rake Shim
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[50px] ${textClass}`}>
                                        <p className={headline}>A3D</p>
                                        <span className='inline-block'>
                                            1x Wingshot
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[50px] ${textClass}`}>
                                        <p className={headline}>FOILING MAG</p>
                                        <span className='inline-block'>
                                            1x Annual subscription
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <Image src={price2} alt='' className='max-w-[422px] max-h-[432px] lg:w-[422px] w-full aspect-[422/432] -mt-10 !z-20 relative object-cover' />
                        </div>
                        <div>
                            <div className='space-y-6 py-9 px-10 vertical-line bg-[#2020204D]'>
                                <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>3<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>rd</span></h4>
                                <div>
                                    <p className={`${textClass} h-[155px] `}>
                                        <p className={headline}>AFS</p>
                                        <span className='inline-block'>
                                            Merchandising <br /> Collection
                                        </span>
                                        <span className='inline-block'>
                                            1:1 Tech Talk with the Expert of your choice
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[65px] ${textClass}`}>
                                        <p className={headline}>DÉFI WING</p>
                                        <span className='inline-block'>
                                            1x Entry - 2025 edition
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[90px] ${textClass}`}>
                                        <p className={headline}>SOÖRUZ</p>
                                        <span className='inline-block'>
                                            1x Watervest STRATO OFFSHORE Collection
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[50px] ${textClass}`}>
                                        <p className={headline}>AP3D</p>
                                        <span className='inline-block'>
                                            1x Rake Shim
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[50px] ${textClass}`}>
                                        <p className={headline}>A3D</p>
                                        <span className='inline-block'>
                                            1x Wingshot
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[50px] ${textClass}`}>
                                        <p className={headline}>FOILING MAG</p>
                                        <span className='inline-block'>
                                            1x Annual subscription
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <Image src={price3} alt='' className='max-w-[422px] max-h-[432px] lg:w-[422px] w-full aspect-[422/432] -mt-10 !z-20 relative object-cover' />
                        </div>
                    </div>
                </TabPanel>
                {/* Windfoil */}
                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6 w-[90%] mx-auto'}>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-[27px] max-w-[1183px] mx-auto w-full items-start'>
                        <div className='z-10 relative'>
                            <div className='space-y-6 py-9 px-10 vertical-line bg-[#2020204D] relative z-10'>
                                <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                                <div>
                                    <p className={`${textClass} h-[150px] `}>
                                        <p className={headline}>AFS</p>
                                        <span className='inline-block'>
                                            Merchandising Collection
                                        </span>
                                        <span className='inline-block'>
                                            30% off on afs-foiling.com
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[90px] ${textClass}`}>
                                        <p className={headline}>SOÖRUZ</p>
                                        <span className='inline-block'>
                                            1x Neck sun protection
                                        </span>
                                        <span className='inline-block'>
                                            OFFSHORE Collection
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[65px] ${textClass}`}>
                                        <p className={headline}>DÉFI WIND</p>
                                        <span className='inline-block'>
                                            1x Entry - 2025 edition
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[50px] ${textClass}`}>
                                        <p className={headline}>FOILING MAG</p>
                                        <span className='inline-block'>
                                            1x Annual subscription
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-2 col-span-1 h-full flex items-center justify-center'>
                            <Image src={price4} alt='' className='object-cover aspect-[422/432] !z-20 relative max-w-[522px] mx-auto' />
                        </div>
                    </div>
                </TabPanel>

                {/* DockStart */}
                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6 flex items-center justify-center mb-20 w-[90%] mx-auto'}>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-[27px] max-w-[1183px] mx-auto w-full items-start'>
                        <div className='z-10 relative'>
                            <div className='space-y-6 py-9 px-10 vertical-line bg-[#2020204D] relative z-10'>
                                <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                                <div>
                                    <p className={`${textClass} h-[190px] `}>
                                        <p className={headline}>AFS</p>
                                        <span className='inline-block'>
                                            1x Dock Star Board
                                        </span>
                                        <span className='inline-block'>
                                            Merchandising Collection
                                        </span>
                                        <span className='inline-block'>
                                            1:1 Tech Talk with the Expert of your choice
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[90px] ${textClass}`}>
                                        <p className={headline}>SOÖRUZ</p>
                                        <span className='inline-block'>
                                            1x Bucket hat “DYLAN”
                                        </span>
                                        <span className='inline-block'>
                                            OFFSHORE Collection
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-2 col-span-1 h-full flex items-end justify-start'>
                            <Image src={price5} alt='' className='object-cover aspect-[422/432] !z-20 relative max-w-[522px] mx-auto' />
                        </div>
                    </div>
                </TabPanel>

                {/* ProneFoil */}
                <TabPanel className={'flex items-center justify-center'}>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-[27px] max-w-[1183px] mx-auto w-full items-start mb-20'>
                        <div className='z-10 relative'>
                            <div className='space-y-6 py-9 px-10 vertical-line bg-[#2020204D] relative z-10'>
                                <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                                <div>
                                    <p className={`${textClass} h-[190px] `}>
                                        <p className={headline}>AFS</p>
                                        <span className='inline-block'>
                                            1x SILK 850 Modular
                                        </span>
                                        <span className='inline-block'>
                                            Merchandising Collection
                                        </span>
                                        <span className='inline-block'>
                                            1:1 Tech Talk with the Expert of your choice
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[65px] ${textClass}`}>
                                        <p className={headline}>SOÖRUZ</p>
                                        <span className='inline-block'>
                                            1x Poncho Storm Rider
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[50px] ${textClass}`}>
                                        <p className={headline}>AP3D</p>
                                        <span className='inline-block'>
                                            1x Rake Shim
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-2 col-span-1 h-full flex items-center justify-center'>
                            <Image src={price6} alt='' className='object-cover aspect-[422/432] !z-20 relative max-w-[522px] mx-auto' />
                        </div>
                    </div>
                </TabPanel>
                {/* Downwind */}
                <TabPanel className={'flex items-center justify-center'}>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-[27px] max-w-[1183px] mx-auto w-full items-start mb-20'>
                        <div className='z-10 relative'>
                            <div className='space-y-6 py-9 px-10 vertical-line bg-[#2020204D] relative z-10'>
                                <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                                <div>
                                    <p className={`${textClass} h-[190px] `}>
                                        <p className={headline}>AFS</p>
                                        <span className='inline-block'>
                                            1x BlackBird Board
                                        </span>
                                        <span className='inline-block'>
                                            Merchandising Collection
                                        </span>
                                        <span className='inline-block'>
                                            1:1 Tech Talk with the Expert of your choice
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[90px] ${textClass}`}>
                                        <p className={headline}>SOÖRUZ</p>
                                        <span className='inline-block'>
                                            1x WaterTee MANTA OFFSHORE Collection
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[50px] ${textClass}`}>
                                        <p className={headline}>AP3D</p>
                                        <span className='inline-block'>
                                            1x Rake Shim
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[50px] ${textClass}`}>
                                        <p className={headline}>A3D</p>
                                        <span className='inline-block'>
                                            1x TubeMount
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-2 col-span-1 h-full flex items-center justify-center'>
                            <Image src={price7} alt='' className='object-cover aspect-[422/432] !z-20 relative max-w-[522px] mx-auto' />
                        </div>
                    </div>
                </TabPanel>
                {/* Parawing */}
                <TabPanel className={'flex items-center justify-center'}>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-[27px] max-w-[1183px] mx-auto w-full items-start mb-20'>
                        <div className='z-10 relative'>
                            <div className='space-y-6 py-9 px-10 vertical-line bg-[#2020204D] relative z-10'>
                                <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                                <div>
                                    <p className={`${textClass} h-[130px] `}>
                                        <p className={headline}>AFS</p>
                                        <span className='inline-block text-[#FFE500]'>
                                            Special Winner's Prize
                                        </span>
                                        <span className='inline-block'>
                                            Merchandising Collection
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[90px] ${textClass}`}>
                                        <p className={headline}>SOÖRUZ</p>
                                        <span className='inline-block'>
                                            1x Sac à dos étanche GLIDE
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[50px] ${textClass}`}>
                                        <p className={headline}>AP3D</p>
                                        <span className='inline-block'>
                                            1x Kit lignes de harnais
                                        </span>
                                    </p>
                                    <Image src={image} alt='' className='w-full my-10' />
                                    <p className={`h-[50px] ${textClass}`}>
                                        <p className={headline}>FOILING MAG</p>
                                        <span className='inline-block'>
                                            1x Annual subscription
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-2 col-span-1 h-full flex items-center justify-center'>
                            <Image src={price8} alt='' className='object-cover aspect-[422/432] !z-20 relative max-w-[522px] mx-auto' />
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Award;