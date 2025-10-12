import { morgana } from '@/app/(Main)/layout';
import logo from '../../public/logo afs games (3).svg'
import Image from 'next/image';

const Join = ({ home }) => {
    return (
        <div className={`relative`}>
            <div className='px-5 rounded-[10px] z-40'>
                <div className={`2xl:px-[140px] xl:px-20 2xl:py-20 xl:py-[60px]  px-4 py-10`}>
                    <Image src={logo} className='2xl:w-[176px] xl:w-[150px] w-[100px] h-auto' alt='' />
                    <p className={`${morgana.className} text-white font-medium text-2xl xl:text-5xl 2xl:text-7xl mt-8`}>
                        <span className="text-[#FFE500]">Join us</span> and take part in the first edition of the <span className={`text-[#FFE500]`}>AFS GAMES ONLINE 2024</span>, meet passionate and participate in new challenges.
                    </p>

                    <p className='text-[#ffffff7f] xl:text-lg text-sm font-semibold 2xl:text-2xl my-7'>Don’t miss this unique opportunity to experience the Foiling Spirit!</p>

                    <div className='2xl:mt-7 xl:mt-5 mt-7 flex 2xl:flex-row xl:flex-row flex-col items-start 2xl:gap-20 xl:gap-16 gap-8'>
                        <p className={`${morgana.className} 2xl:text-[40px] xl:text-3xl text-sm font-semibold text-white`}>PRIZES-<span className={`${morgana.className} text-[#FFE500]`}>Free</span></p>

                        <p className={`${morgana.className} 2xl:text-[40px] xl:text-3xl text-sm font-semibold text-white`}>
                            from <span className='text-[#FFE500]'>September 30</span> to <span className='text-[#FFE500]'>November 3rd</span>
                        </p>
                    </div>
                    <p className='text-[#666] 2xl:text-sm xl:text-[10px] xl:leading-[10px] text-[10px] font-normal mt-5'>
                        <span className='text-[#FFE500]'>*</span>An AFS customer is defined as a practitioner who owns at least one AFS foil and uses it for the challenges. The choice of board and wing is free.
                    </p>
                </div>
            </div>
            <div className={`${home ? 'filter blur-[12.5px] absolute block inset-0 z-20' : 'hidden'}`}>
                {/* Optional overlay when `home` is true */}
            </div>
        </div>
    );
};

export default Join;
