import { morgana } from '@/app/(Main)/layout';
import logo from '../../public/logo afs games (3).svg'
import Image from 'next/image';
import RegisBtn from '@/Components/RegisBtn';

const Join = ({ home }) => {
    return (
        <div className='bg-black'>
            <div className={`relative flex items-stretch lg:flex-row flex-col justify-between xl:px-16 px-4 2xl:py-[60px] xl:py-12 py-8 gap-10 h-full`}>
                <div className='rounded-[10px] z-40 lg:w-1/2 w-full h-full'>
                    <div className={``}>
                        <Image src={logo} className='2xl:w-[176px] xl:w-[150px] w-[100px] h-auto' alt='' />
                        <p className={`text-white 2xl:text-2xl xl:text-xl text-lg 2xl:mt-12 xl:mt-10 mt-8`}>
                            <span className="">Join us</span> and take part in the second edition of the <span className={``}>AFS GAMES ONLINE 2025</span>, meet passionate and participate in new challenges.
                        </p>

                        <p className={`text-white 2xl:text-2xl xl:text-xl text-lg mt-10`}>Don’t miss this unique opportunity to experience the Foiling Spirit!</p>
                    </div>
                </div>
                <div className='z-40 flex flex-col justify-end ml-0 h-full'>
                    <div className='w-fit lg:ml-auto'>
                        <RegisBtn />
                    </div>
                    <div className='xl:mt-[170px] 2xl:mt-[190px] mt-10 ml-5 lg:ml-0'>
                        <ul className='list-disc text-white space-y-2'>
                            <li className='text-lg [&::marker]:text-[#FFE500] [&::marker]:text-2xl'>Price : Free</li>
                            <li className='text-lg [&::marker]:text-[#FFE500] [&::marker]:text-2xl'>Date : 20th October- 8th December </li>
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
