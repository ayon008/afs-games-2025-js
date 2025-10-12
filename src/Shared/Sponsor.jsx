/* eslint-disable @next/next/no-img-element */
import Marquee from 'react-fast-marquee';
import getAllSponsors from '@/lib/getAllSponsors';

const Sponsor = async () => {
    const sponsors = await getAllSponsors();
    const data = sponsors?.filter(s => s?.showInHome === 'true');
    
    return (
        <div className='2xl:mt-[60px] xl:mt-10 lg:mt-8 mt-6 2xl:px-24 xl:px-10 lg:px-8 px-10 2xl:pb-40 xl:pb-20'>
            <Marquee
                autoFill={true}
                gradient={false}
            >
                {data?.map((sponsor, index) => (
                    <div key={index} className='flex items-center 2xl:mx-10 xl:mx-10'>
                        <img
                            className='2xl:w-full xl:w-full w-1/2 h-auto'
                            src={sponsor.sponsorPicture}
                            alt={sponsor.alt}
                        />
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default Sponsor;
