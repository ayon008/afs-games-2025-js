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

const Award = () => {
    const categories = ['Wingfoil', 'Windfoil', 'dockstart', 'surfFoil', 'dw', 'waterman crown'];
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <div className='mt-4'>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className={'2xl:mx-4 xl:mx-4 mx-0'}>
                <TabList className={'flex items-center 2xl:justify-center xl:justify-center justify-between 2xl:gap-10 xl:gap-10 gap-4 cursor-pointer w-full px-1 overflow-x-auto'}>
                    {
                        categories?.map((category, i) => {
                            return (
                                <Tab key={i} className={`${tabIndex === i && 'text-blue-500 pb-1 border-b-2 border-blue-500'} 2xl:text-lg xl:text-sm text-xs font-semibold uppercase pb-1`}>{category === 'surfFoil' ? 'prone foil' : category === 'dw' ? 'Downwind' : category}</Tab>
                            )
                        })
                    }
                </TabList>
                {/* {
                    categories?.map((category, i) => {
                        const { isLoading, isError, error, awardsCategory, refetch } = GetAwardsByCategory(category);
                        console.log(awardsCategory);


                        return (
                            <TabPanel key={i}>
                                <div className='2xl:mt-14 xl:mt-8 mt-6 grid 2xl:grid-cols-3 xl:grid-cols-3 grid-cols-1 items-end justify-center 2xl:gap-6 xl:gap-5 gap-3'>
                                    {
                                        awardsCategory?.map((a, i) => {
                                            if (a.position === '1st') {
                                                return (
                                                    // <div key={i} className='2xl:p-10 xl:p-6 p-6 award 2xl:min-h-[550px] xl:min-h-[440px] h-auto flex flex-col justify-between'>
                                                    //     <h1 className='2xl:text-8xl xl:text-6xl text-4xl font-semibold text-white'>
                                                    //         1<sup className='2xl:text-3xl xl:text-xl text-lg font-medium align-super'>ST</sup>
                                                    //     </h1>
                                                    //     <ul className='text-[#FFFFFF80] list-disc 2xl:pl-5 xl:pl-5 pl-2 2xl:my-0 xl:my-0 my-3'>
                                                    //         <li className='2xl:text-2xl xl:text-lg text-base'>{a.prize1}</li>
                                                    //         {a.prize2 && <li className='2xl:text-2xl xl:text-lg text-base'>{a.prize2}</li>}
                                                    //         {a.prize3 && <li className='2xl:text-2xl xl:text-lg text-base'>{a.prize3}</li>}
                                                    //     </ul>
                                                    //     <div className='flex flex-row flex-wrap 2xl:gap-5 xl:gap-5 gap-4 w-full overflow-hidden items-center'>
                                                    //         <img src={a.sponsors1} className='w-auto h-auto' alt='' />
                                                    //         {a.sponsors2 && <img src={a.sponsors2} className='w-auto h-auto' alt='' />}
                                                    //         {a.sponsors3 && <img src={a.sponsors3} className='w-auto h-auto' alt='' />}
                                                    //         {a.sponsors4 && <img src={a.sponsors4} className='w-auto h-auto' alt='' />}
                                                    //         {a.sponsors5 && <img src={a.sponsors5} className='w-auto h-auto' alt='' />}
                                                    //     </div>
                                                    // </div>
                                                    <div key={i}>
                                                        <div className='mb-8'>
                                                            <Image className='w-full min-h-[200px]' src={img1} alt='' />
                                                        </div>
                                                        <Prize position={'1'} text={'Gold'} />
                                                    </div>
                                                )
                                            }
                                            if (a.position === '2nd') {
                                                return (
                                                    // <div key={i} className='2xl:p-10 xl:p-6 p-6 award 2xl:min-h-[490px] xl:min-h-[380px] h-auto flex flex-col justify-between'>
                                                    //     <h1 className='2xl:text-8xl xl:text-6xl text-4xl font-semibold text-white'>
                                                    //         2<sup className='2xl:text-3xl xl:text-xl text-lg font-medium align-super'>2ND</sup>
                                                    //     </h1>
                                                    //     <ul className='text-[#FFFFFF80] list-disc 2xl:pl-5 xl:pl-5 pl-2 2xl:my-0 xl:my-0 my-3'>
                                                    //         <li className='2xl:text-2xl xl:text-lg text-base'>{a.prize1}</li>
                                                    //         {a.prize2 && <li className='2xl:text-2xl xl:text-lg text-base'>{a.prize2}</li>}
                                                    //         {a.prize3 && <li className='2xl:text-2xl xl:text-lg text-base'>{a.prize3}</li>}
                                                    //     </ul>
                                                    //     <div className='flex flex-row flex-wrap 2xl:gap-5 xl:gap-5 gap-4 w-full overflow-hidden items-center'>
                                                    //         <img src={a.sponsors1} className='w-auto h-auto' alt='' />
                                                    //         {a.sponsors2 && <img src={a.sponsors2} className='w-auto h-auto' alt='' />}
                                                    //         {a.sponsors3 && <img src={a.sponsors3} className='w-auto h-auto' alt='' />}
                                                    //         {a.sponsors4 && <img src={a.sponsors4} className='w-auto h-auto' alt='' />}
                                                    //         {a.sponsors5 && <img src={a.sponsors5} className='w-auto h-auto' alt='' />}
                                                    //     </div>
                                                    // </div>
                                                    <div key={i}>
                                                        <div className='mb-8'>
                                                            <Image className='w-full min-h-[200px]' src={img1} alt='' />
                                                        </div>
                                                        <Prize position={'1'} text={'Gold'} />
                                                    </div>
                                                )
                                            }
                                            if (a.position === '3rd') {
                                                return (
                                                    <div key={i} className='2xl:p-10 xl:p-6 p-6 award 2xl:min-h-[430px] xl:min-h-[320px] h-auto flex flex-col justify-between'>
                                                        <h1 className='2xl:text-8xl xl:text-6xl text-4xl font-semibold text-white'>
                                                            3<sup className='2xl:text-3xl xl:text-xl text-lg font-medium align-super'>RD</sup>
                                                        </h1>
                                                        <ul className='text-[#FFFFFF80] list-disc 2xl:pl-5 xl:pl-5 pl-2 2xl:my-0 xl:my-0 my-3'>
                                                            <li className='2xl:text-2xl xl:text-lg text-base'>{a.prize1}</li>
                                                            {a.prize2 && <li className='2xl:text-2xl xl:text-lg text-base'>{a.prize2}</li>}
                                                            {a.prize3 && <li className='2xl:text-2xl xl:text-lg text-base'>{a.prize3}</li>}
                                                        </ul>
                                                        <div className='flex flex-row flex-wrap 2xl:gap-5 xl:gap-5 gap-4 w-full overflow-hidden items-center'>
                                                            <img src={a.sponsors1} className='w-auto h-auto' alt='' />
                                                            {a.sponsors2 && <img src={a.sponsors2} className='w-auto h-auto' alt='' />}
                                                            {a.sponsors3 && <img src={a.sponsors3} className='w-auto h-auto' alt='' />}
                                                            {a.sponsors4 && <img src={a.sponsors4} className='w-auto h-auto' alt='' />}
                                                            {a.sponsors5 && <img src={a.sponsors5} className='w-auto h-auto' alt='' />}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </TabPanel>
                        )
                    })
                } */}
                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6'}>
                    <div className=''>
                        <div className='flex 2xl:flex-row xl:flex-row flex-col items-center justify-between 2xl:gap-6 xl:gap-5 gap-20 mt-10'>
                            <div className='flex-1 2xl:order-1 xl:order-1 order-2 2xl:min-h-[700px] xl:min-h-[700px]'>
                                <div className='2xl:mt-40 xl:mt-40'>
                                    <div className='mb-8'>
                                        <Image className='w-full min-h-[200px]' src={img3} alt='' />
                                    </div>
                                    <Prize position={'2'} sup={'nd'} text={'Silver'} />
                                </div>
                            </div>
                            <div className='flex-1 2xl:order-2 xl:order-2 order-1 2xl:min-h-[700px] xl:min-h-[700px]'>
                                <div>
                                    <div className='mb-8'>
                                        <Image className='w-full min-h-[200px]' src={img1} alt='' />
                                    </div>
                                    <Prize position={'1'} sup={'st'} text={'Gold'} />
                                </div>
                            </div>
                            <div className='flex-1 order-3 2xl:min-h-[700px] xl:min-h-[700px]'>
                                <div className='2xl:mt-[340px] xl:mt-[340px]'>
                                    <div className='mb-8'>
                                        <Image className='w-full min-h-[200px]' src={img2} alt='' />
                                    </div>
                                    <Prize position={'3'} sup={'rd'} text={'Bronze'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6'}>
                    <div className=''>
                        <div className='flex 2xl:flex-row xl:flex-row flex-col items-center justify-between 2xl:gap-6 xl:gap-5 gap-20 mt-10'>
                            <div className='flex-1 2xl:order-1 xl:order-1 order-2 2xl:min-h-[700px] xl:min-h-[700px]'>
                                <div className='2xl:mt-40 xl:mt-40'>
                                    <div className='mb-8'>
                                        <Image className='w-full min-h-[200px]' src={img4} alt='' />
                                    </div>
                                    <Prize position={'2'} sup={'nd'} text={'Silver'} />
                                </div>
                            </div>
                            <div className='flex-1 2xl:order-2 xl:order-2 order-1 2xl:min-h-[700px] xl:min-h-[700px]'>
                                <div>
                                    <div className='mb-8'>
                                        <Image className='w-full min-h-[200px]' src={img5} alt='' />
                                    </div>
                                    <Prize position={'1'} sup={'st'} text={'Gold'} />
                                </div>
                            </div>
                            <div className='flex-1 order-3 2xl:min-h-[700px] xl:min-h-[700px]'>
                                <div className='2xl:mt-[340px] xl:mt-[340px]'>
                                    <div className='mb-8'>
                                        <Image className='w-full max-w-[372px] mx-auto min-h-[200px]' src={img6} alt='' />
                                    </div>
                                    <Prize position={'3'} sup={'rd'} text={'Bronze'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                
                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6'}>
                    <div className=''>
                        <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 grid-cols-1 items-center justify-between 2xl:gap-6 xl:gap-5 gap-3 mt-10'>
                            <div className='2xl:block xl:block hidden'></div>
                            <div className='flex-1'>
                                <div>
                                    <div className='mb-8'>
                                        <Image className='w-full min-h-[200px]' src={img7} alt='' />
                                    </div>
                                    <Prize position={'1'} sup={'st'} text={'Gold'} />
                                </div>
                            </div>
                            <div className='2xl:block xl:block hidden'></div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6'}>
                    <div className=''>
                        <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 grid-cols-1 items-center justify-between 2xl:gap-6 xl:gap-5 gap-3 mt-10'>
                            <div className='2xl:block xl:block hidden'></div>
                            <div className='flex-1'>
                                <div>
                                    <div className='mb-8'>
                                        <Image className='w-full min-h-[200px]' src={img8} alt='' />
                                    </div>
                                    <Prize position={'1'} sup={'st'} text={'Gold'} />
                                </div>
                            </div>
                            <div className='2xl:block xl:block hidden'></div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6'}>
                    <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 grid-cols-1 items-center justify-between 2xl:gap-6 xl:gap-5 gap-3 mt-10'>
                        <div className='2xl:block xl:block hidden'></div>
                        <div className='flex-1'>
                            <div>
                                <div className='mb-8'>
                                    <Image className='w-full min-h-[200px]' src={img9} alt='' />
                                </div>
                                <Prize position={'1'} sup={'st'} text={'Gold'} />
                            </div>
                        </div>
                        <div className='2xl:block xl:block hidden'></div>
                    </div>
                </TabPanel>
                <TabPanel className={'2xl:mt-14 xl:mt-8 mt-6'}>
                    <div className=''>
                        <div className='flex 2xl:flex-row xl:flex-row flex-col-reverse items-center justify-between 2xl:gap-6 xl:gap-5 gap-10 mt-10'>
                            <Prize position={'1'} sup={'st'} text={'Gold'} />
                            <Image className='w-full min-h-[200px]' src={img10} alt='' />
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Award;