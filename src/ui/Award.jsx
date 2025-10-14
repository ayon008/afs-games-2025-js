/* eslint-disable @next/next/no-img-element */
'use client'
import GetAwardsByCategory from '@/lib/getAwardByCategory';
import GetAwards from '@/lib/getAwards';
import Prize from '@/Shared/Prize';
import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Image from 'next/image';
import img1 from '../../public/assets/Frame 127 (1).svg'
import img2 from '../../public/assets/Frame 129.svg';
import img3 from '../../public/assets/Frame 128.svg';
import img4 from '../../public/assets/Frame 130.svg';
import img5 from '../../public/assets/Frame 131.svg';
import img6 from '../../public/assets/Frame 132.svg';
import img7 from '../../public/assets/Frame.svg';
import img8 from '../../public/assets/Frame 132 (1).svg';
import img9 from '../../public/assets/Frame 126.svg';
import img10 from '../../public/assets/Frame 133 (1).svg';
import image from "../../public/assets/Vector 1.png"

const Award = () => {
    const categories = ['Wingfoil', 'Windfoil', 'dockstart', 'surfFoil', 'dw', 'Parawing'];
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <div className='mt-10'>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className={'2xl:mx-4 xl:mx-4 mx-0'}>
                <TabList className={'flex items-center 2xl:justify-center xl:justify-center justify-between 2xl:gap-10 xl:gap-10 gap-4 cursor-pointer w-full px-1 overflow-x-auto mb-10'}>
                    {
                        categories?.map((category, i) => {
                            return (
                                <Tab key={i} className={`${tabIndex === i && '!text-[#FFE500] pb-1 border-b-2 border-[#FFE500]'} 2xl:text-lg xl:text-sm text-xs font-semibold uppercase pb-1 text-white`}>{category === 'surfFoil' ? 'prone foil' : category === 'dw' ? 'Downwind' : category}</Tab>
                            )
                        })
                    }
                </TabList>
                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6'}>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-6 items-start'>
                        <div className='space-y-6 p-6 vertical-line bg-[#2020204D]'>
                            <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AP3D Shim</p>
                            <Image src={image} alt='' className='w-full' />
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>Foiling Mag annual <br /> subscription</p>
                        </div>
                        <div className='space-y-6 p-6 vertical-line bg-[#2020204D]'>
                            <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>2<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>nd</span></h4>
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>Défi Wing <br /> Registration</p>
                            <Image src={image} alt='' className='w-full' />
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>Artness Pro A3D</p>
                            <Image src={image} alt='' className='w-full' />
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AP3D Shim</p>
                        </div>
                        <div className='space-y-6 p-6 vertical-line bg-[#2020204D]'>
                            <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>3<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>rd</span></h4>
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>Textile pack</p>
                            <Image src={image} alt='' className='w-full' />
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>Artness Pro A3D</p>
                            <Image src={image} alt='' className='w-full' />
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AP3D Shim</p>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6'}>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-6 items-start'>
                        <div className='space-y-6 p-6 vertical-line bg-[#2020204D]'>
                            <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>Foiling Mag annual <br /> subscription</p>
                        </div>
                        <div className='space-y-6 p-6 vertical-line bg-[#2020204D]'>
                            <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>2<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>nd</span></h4>
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>Défi Wing <br /> Registration</p>
                        </div>
                        <div className='space-y-6 p-6 vertical-line bg-[#2020204D]'>
                            <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>3<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>rd</span></h4>
                            <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>Textile Pack</p>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6 flex items-center justify-center'}>
                    <div className='space-y-6 p-6 vertical-line bg-[#2020204D] max-w-[343px] w-full'>
                        <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                        <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AP3D Shim</p>
                        <Image src={image} alt='' className='w-full' />
                        <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AFS SK8</p>
                    </div>
                </TabPanel>
                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6 flex items-center justify-center'}>
                    <div className='space-y-6 p-6 vertical-line bg-[#2020204D] max-w-[343px] w-full'>
                        <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                        <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AP3D Shim</p>
                        <Image src={image} alt='' className='w-full' />
                        <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AFS Silk</p>
                    </div>
                </TabPanel>
                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6 flex items-center justify-center'}>
                    <div className='space-y-6 p-6 vertical-line bg-[#2020204D] max-w-[343px] w-full'>
                        <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                        <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AP3D Shim</p>
                    </div>
                </TabPanel>

                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6 flex items-center justify-center'}>
                    <div className='space-y-6 p-6 vertical-line bg-[#2020204D] max-w-[343px] w-full'>
                        <h4 className='text-white font-bold 2xl:text-[100px] xl:text-[80px] text-6xl'>1<span className='2xl:text-[50px] xl:text-[40px] text-[30px] uppercase'>st</span></h4>
                        <p className='text-white font-medium 2xl:text-[25px] xl:text-[20px] text-base text-center'>AP3D Shim</p>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Award;