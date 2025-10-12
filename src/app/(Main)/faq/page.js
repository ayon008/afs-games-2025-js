import React from 'react';
import { morgana } from '../layout';
import Join from '@/Shared/Join';
import getFaq from '@/lib/getFaq';
import Description from '../../../Components/FaqLink';

const FaqPage = async () => {
    const items = await getFaq();
    const categories = [...new Set(items?.map(item => item.category))];

    const data = (category) => {
        return items?.filter(item => item.category === category);
    }

    return (
        <div className=''>
            <div className='max-h-[750px] min-h-[550px] flex flex-col'>
                <div className='m-auto'>
                    <h1 className={`${morgana.className} text-center 2xl:text-9xl xl:text-7xl text-5xl text-white uppercase`}>GUIDES ⏐ FAQ</h1>
                </div>
            </div>
            <div className='bg-white 2xl:p-20 xl:p-20 p-6 rounded-t-[50px]'>
                {
                    categories?.map((category, i) => {
                        const d = data(category);
                        return (
                            <>
                                <h2 className={`${morgana.className} ${!i === 0 && 'mt-10'} uppercase text-center 2xl:text-7xl xl:text-5xl text-3xl`}>{category}</h2>
                                <div className='2xl:px-20 xl:px-14 px-6 grid 2xl:grid-cols-2 xl:grid-cols-2 grid-cols-1 2xl:mt-24 xl:mt-16 mt-10 2xl:gap-6 xl:gap-4 gap-y-6 mb-20'>
                                    {
                                        d?.map((item, i) => {
                                            return (
                                                <div style={{
                                                    boxShadow: "0px 5px 16px 0px rgba(8, 15, 52, 0.06)"
                                                }} key={i} className="collapse rounded-2xl bg-[#FFF] 2xl:px-7 2xl:py-10 xl:px-4 xl:py-7 h-fit">
                                                    <input type="checkbox" id={`${item.title}`} className="hidden" />
                                                    <label htmlFor={`${item.title}`} className="collapse-title cursor-pointer faq 2xl:text-[22px] xl:text-lg text-sm font-medium flex items-center justify-between">
                                                        {item.title}
                                                        <span className="icon-container ml-5">
                                                            <svg className="icon icon-plus" xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 47 47" fill="none">
                                                                <rect x="0.802734" y="0.493774" width="45.7867" height="45.7867" rx="8" fill="#FFE500" />
                                                                <path d="M23.5928 13.3075C22.9576 13.3075 22.4428 13.8223 22.4428 14.4575V32.3168C22.4428 32.9519 22.9576 33.4668 23.5928 33.4668H23.7994C24.4345 33.4668 24.9494 32.9519 24.9494 32.3168V14.4575C24.9494 13.8223 24.4345 13.3075 23.7994 13.3075H23.5928Z" fill="black" stroke="#6F6C90" stroke-width="0.3" stroke-linecap="round" />
                                                                <path d="M14.7666 22.1338C14.1315 22.1338 13.6166 22.6487 13.6166 23.2838V23.4904C13.6166 24.1255 14.1315 24.6404 14.7666 24.6404H32.6259C33.261 24.6404 33.7759 24.1255 33.7759 23.4904V23.2838C33.7759 22.6487 33.261 22.1338 32.6259 22.1338H14.7666Z" fill="black" stroke="#6F6C90" stroke-width="0.3" stroke-linecap="round" />
                                                            </svg>
                                                            <svg className="icon icon-minus hidden" xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
                                                                <rect x="0.195312" y="0.131775" width="45.7867" height="45.7867" rx="8" fill="#FFE500" />
                                                                <path d="M14.1582 21.7719C13.5231 21.7719 13.0082 22.2867 13.0082 22.9219V23.1285C13.0082 23.7636 13.5231 24.2785 14.1582 24.2785H32.0175C32.6526 24.2785 33.1675 23.7636 33.1675 23.1285V22.9219C33.1675 22.2867 32.6526 21.7719 32.0175 21.7719H14.1582Z" fill="black" stroke="#6F6C90" stroke-width="0.3" stroke-linecap="round" />
                                                            </svg>
                                                        </span>
                                                    </label>

                                                    <div className="collapse-content">
                                                        <Description description={item.description} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        )
                    })
                }
            </div>
            <Join />
        </div>
    );
};

export default FaqPage;