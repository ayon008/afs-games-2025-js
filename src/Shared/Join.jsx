import { morgana } from '@/app/(Main)/layout';
import logo from '../../public/logo afs games (3).svg'
import Image from 'next/image';
import RegisBtn from '@/Components/RegisBtn';

const Join = ({ home }) => {
    return (
        <div className='bg-black'>
            <div className={`relative flex items-start lg:flex-row flex-col justify-between max-w-[1150px] w-full mx-auto px-4 2xl:py-20 xl:py-[60px] py-10`}>
                <div className='rounded-[10px] z-40 lg:w-1/2 w-full 2xl:mt-10 xl:mt-8 mt-6'>
                    <div className={``}>
                        <Image src={logo} className='2xl:w-[176px] xl:w-[150px] w-[100px] h-auto' alt='' />
                        <p className={`text-white 2xl:text-2xl xl:text-xl text-lg mt-8`}>
                            <span className="">Join us</span> and take part in the first edition of the <span className={`text-[#FFE500]`}>AFS GAMES ONLINE 2024</span>, meet passionate and participate in new challenges.
                        </p>

                        <p className={`text-white 2xl:text-2xl xl:text-xl text-lg mt-8`}>Don’t miss this unique opportunity to experience the Foiling Spirit!</p>

                        {/* <p className='text-[#666] 2xl:text-sm xl:text-[10px] xl:leading-[10px] text-[10px] font-normal mt-5'>
                        <span className='text-[#FFE500]'>*</span>An AFS customer is defined as a practitioner who owns at least one AFS foil and uses it for the challenges. The choice of board and wing is free.
                    </p> */}
                    </div>
                </div>
                <div className='z-40'>
                    <RegisBtn />
                    <div className='lg:mt-44 mt-10'>
                        <ul className='list-disc text-white space-y-2'>
                            <li className='text-lg [&::marker]:text-[#FFE500] [&::marker]:text-2xl'>Price : Free</li>
                            <li className='text-lg [&::marker]:text-[#FFE500] [&::marker]:text-2xl'>Date : Not Yet</li>
                        </ul>
                    </div>
                </div>
                <div className={`${home ? 'filter blur-[12.5px] absolute block inset-0 z-20' : 'hidden'}`}>
                    {/* Optional overlay when `home` is true */}
                </div>
            </div>
        </div>

    );
};

export default Join;
