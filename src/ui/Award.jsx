/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Image from 'next/image';
import image from "../../public/assets/Vector 1.png"

const Award = () => {
    // const categories = ['Wingfoil', 'Windfoil', 'dockstart', 'surfFoil', 'dw', 'Parawing'];
    const categories = ['Wingfoil', 'Downwind', 'Windfoil', 'Dockstart', 'Surf Foil', 'Parawing'];
    const [tabIndex, setTabIndex] = useState(0);
    const text = <p className='2xl:text-6xl xl:text-5xl text-3xl text-white text-center mt-28'>Prizes to be announced soon</p>
    return (
        <div className='mt-10'>
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
                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6'}>
                    {text}
                    {/* <div className='grid lg:grid-cols-3 grid-cols-1 gap-[27px] max-w-[1183px] mx-auto w-full items-start'>
                        <div className='space-y-6 py-9 px-10 vertical-line bg-[#2020204D]'>
                            <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AP3D Shim</p>
                            <Image src={image} alt='' className='w-full' />
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>Foiling Mag annual <br /> subscription</p>
                        </div>
                        <div className='space-y-6 py-9 px-10 vertical-line bg-[#2020204D]'>
                            <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>2<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>nd</span></h4>
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>Défi Wing <br /> Registration</p>
                            <Image src={image} alt='' className='w-full' />
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>Artness Pro A3D</p>
                            <Image src={image} alt='' className='w-full' />
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AP3D Shim</p>
                        </div>
                        <div className='space-y-6 py-9 px-10 vertical-line bg-[#2020204D]'>
                            <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>3<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>rd</span></h4>
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>Textile pack</p>
                            <Image src={image} alt='' className='w-full' />
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>Artness Pro A3D</p>
                            <Image src={image} alt='' className='w-full' />
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AP3D Shim</p>
                        </div>
                    </div> */}
                </TabPanel>
                {/* Windfoil */}
                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6'}>
                    {text}
                    {/* <div className='grid lg:grid-cols-3 grid-cols-1 gap-[27px] max-w-[1183px] mx-auto w-full items-start'>
                        <div className='space-y-6 py-9 px-10 vertical-line bg-[#2020204D]'>
                            <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>Foiling Mag annual <br /> subscription</p>
                        </div>
                        <div className='space-y-6 py-9 px-10 vertical-line bg-[#2020204D]'>
                            <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>2<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>nd</span></h4>
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>Défi Wing <br /> Registration</p>
                        </div>
                        <div className='space-y-6 py-9 px-10 vertical-line bg-[#2020204D]'>
                            <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>3<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>rd</span></h4>
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>Textile Pack</p>
                        </div>
                    </div> */}
                </TabPanel>

                {/* DockStart */}
                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6 flex items-center justify-center'}>
                    {text}
                    {/* <div className='space-y-6 py-9 px-10 vertical-line bg-[#2020204D] max-w-[343px] w-full'>
                        <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                        <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AP3D Shim</p>
                        <Image src={image} alt='' className='w-full' />
                        <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AFS SK8</p>
                    </div> */}
                </TabPanel>
                {/* ProneFoil */}
                <TabPanel className={'flex items-center justify-center'}>
                    {text}
                    {/* <div className='space-y-6 py-9 px-10 vertical-line bg-[#2020204D] max-w-[343px] w-full'>
                        <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                        <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AP3D Shim</p>
                        <Image src={image} alt='' className='w-full' />
                        <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AFS Silk</p>
                    </div> */}
                </TabPanel>
                {/* Downwind */}
                <TabPanel className={'flex items-center justify-center'}>
                    {text}
                    {/* <div className='space-y-6 px-10 py-9 vertical-line bg-[#2020204D] max-w-[343px] w-full'>
                        <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                        <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AP3D Shim</p>
                    </div> */}
                </TabPanel>
                {/* Parawing */}
                <TabPanel className={'flex items-center justify-center'}>
                    {text}
                    {/* <div className='space-y-6 px-10 py-9 vertical-line bg-[#2020204D] max-w-[343px] w-full'>
                        <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                        <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AP3D Shim</p>
                    </div> */}
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Award;