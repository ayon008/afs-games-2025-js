/* eslint-disable @next/next/no-img-element */
import Marquee from 'react-fast-marquee';
import getAllSponsors from '@/lib/getAllSponsors';

const Sponsor = async () => {
    const sponsors = await getAllSponsors();
    const data = sponsors?.filter(s => s?.showInHome === 'true');
    
    return (
        <div className='relative'>
            {/* Left blur overlay */}
            <div aria-hidden className="pointer-events-none absolute left-0 top-0 h-full w-24 sm:w-32 md:w-40 lg:w-48 z-10">
                <div className="h-full w-full blur-3xl" style={{background: 'linear-gradient(90deg, rgba(0,0,0,0.75), rgba(0,0,0,0))'}} />
            </div>

            {/* Right blur overlay */}
            <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-full w-24 sm:w-32 md:w-40 lg:w-48 z-10">
                <div className="h-full w-full blur-3xl" style={{background: 'linear-gradient(270deg, rgba(0,0,0,0.75), rgba(0,0,0,0))'}} />
            </div>

            <div className='relative'>
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
        </div>
    );
};

export default Sponsor;
