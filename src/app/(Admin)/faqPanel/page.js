
import { morgana } from '@/app/(Main)/layout';
import AddFaq from '@/Components/AddFaq';
import DeleteFaq from '@/Components/DeleteFaq';
import Description from '@/Components/FaqLink';
import getFaq from '@/lib/getFaq';
import React from 'react';
import { FaTrash } from 'react-icons/fa';


const page = async () => {
    const items = await getFaq();
    const categories = [...new Set(items?.map(item => item.category))];

    const data = (category) => {
        return items?.filter(item => item.category === category);
    }

    return (
        <div className='p-10'>
            <div className='mb-10'>
                <h3 className='text-2xl font-semibold text-center'>Add Faq</h3>
                <p className='text-xs text-center font-semibold mt-2'>Manage FAQ</p>
            </div>
            <AddFaq />
            <div className='bg-white 2xl:p-8 xl:p-8 p-6 rounded-t-[50px]'>
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
                                                    <label htmlFor={`${item.title}`} className="collapse-title cursor-pointer 2xl:text-[22px] xl:text-lg text-sm font-medium flex items-center justify-between">
                                                        {item.title}
                                                        <span className="icon-container">
                                                            <FaTrash color={'#CA8A04'} size={'2rem'} className={'icon icon-plus'} />
                                                            <DeleteFaq id={item?._id} />
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
        </div>
    );
};

export default page;