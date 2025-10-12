/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import TableHead from '@/Components/TableHead';
import FaArrowDown from '@/icons/FaArrowDown';
import convertToFranceTime from '@/lib/convertTime';
import CountryFlagList from '@/js/GetFlags';
import profileImage from '../../public/Profile_avatar_placeholder_large.png'
import Image from 'next/image';

const LeadBoard = ({ pointTable, userPosition, userData, LeadBoard }) => {
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(10);
    const [data, setData] = useState([...pointTable].slice(0, 10)); // Initialize with first 10 items
    const [flags, setFlags] = useState({}); // State to store flags

    const handleOpen = (i, open) => {
        setIndex(i + 1);
        setOpen(!open);
    };

    useEffect(() => {
        setData([...pointTable].slice(0, show));
    }, [pointTable, show]);

    const handleShowMore = () => {
        setShow((prevShow) => prevShow + 10);
    };

    return (
        <div className="overflow-x-auto w-full 2xl:mt-10 xl:mt-6">
            <table className="table">
                <TableHead tableHead={['#', 'Participant', 'Wingfoil', 'Windfoil', 'DW', 'Total Time']} />
                <tbody>
                    {data?.map((d, i) => {
                        const { displayName, photoURL, Wingfoil, Windfoil, dw, dockstart, surfFoil, total, pays, WatermanCrown } = d;
                        const pos = pointTable.indexOf(d) + 1;
                        const time = d.lastUploadedTime;
                        console.log('ayon', userPosition);

                        return (
                            <React.Fragment key={i}>
                                {/* First Row */}
                                <tr
                                    onClick={() => handleOpen(i, open)}
                                    className={`relative cursor-pointer ${pos === 1 && userPosition !== 1 ? 'first' : pos === 2 && userPosition !== 2 ? 'second' : pos === 3
                                        && userPosition !== 3 ? 'third' : userPosition === pos ? 'my-position' : ''} border-b-[1px] border-[#00000033]`}
                                >
                                    <td className="font-semibold 2xl:text-lg xl:text-base z-20">{i + 1 < 10 ? `0${i + 1}` : i + 1}.</td>
                                    <td>
                                        <div className='flex items-center gap-2'>
                                            <CountryFlagList countries={[d?.pays]} />
                                            {
                                                d?.photoURL ?
                                                    <img alt='profile-image' className='2xl:w-[40px] 2xl:h-[40px] xl:w-[25px] xl:h-[25px] w-[24px] h-[24px] rounded-[50%]' src={d?.photoURL} />
                                                    :
                                                    <Image alt='profile-image' className='2xl:w-[40px] 2xl:h-[40px] xl:w-[25px] xl:h-[25px] w-[24px] h-[24px] rounded-[50%]' src={profileImage} />
                                            }
                                            <h3 className='2xl:text-lg xl:text-sm font-semibold'>{d?.displayName}</h3>
                                        </div>
                                    </td>
                                    <td className="2xl:text-lg xl:text-sm font-semibold">{Wingfoil ? Wingfoil.toFixed(2) + ' hours' : '0 hours'}</td>
                                    <td className="2xl:text-lg xl:text-sm font-semibold">{Windfoil ? Windfoil.toFixed(2) + ' hours' : <span className="text-[#11111166]">0 hours</span>}</td>
                                    <td className="2xl:text-lg xl:text-sm font-semibold">{dw ? dw.toFixed(2) + ' hours' : <span className="text-[#11111166]">0 hours</span>}</td>
                                    <td className="2xl:text-lg xl:text-sm font-semibold text-right">
                                        {WatermanCrown ? (parseFloat(Wingfoil || 0) + parseFloat(Windfoil || 0) + parseFloat(dw || 0)).toFixed(2) + ' hours' : <span className="text-[#11111166]">0 hours</span>}
                                    </td>
                                </tr>
                                {index === i + 1 && open && (
                                    <tr>
                                        <td colSpan={'9'} className="p-0">
                                            <div className="bg-black rounded-[20px] 2xl:p-10 xl:p-6 p-2 grid grid-cols-4">
                                                <div className="border-r-2 border-[#FFF] px-2">
                                                    <h2 className="2xl:text-3xl xl:text-xl text-base font-semibold text-white">{d.city} {d.pays}</h2>
                                                    <p className="2xl:text-sm xl:text-xs text-[8px] text-[#FFFFFF80] 2xl:mt-2 xl:mt-1 mt-[2px]">CITY, COUNTRY</p>
                                                </div>
                                                <div className="border-r-2 border-[#FFF] px-2">
                                                    <div className="w-fit mx-auto">
                                                        <h2 className="2xl:text-3xl xl:text-xl text-base font-semibold text-white">{convertToFranceTime(time).date}</h2>
                                                        <p className="2xl:text-sm xl:text-xs text-[8px] text-[#FFFFFF80] 2xl:mt-2 xl:mt-1 mt-[2px]">last session</p>
                                                    </div>
                                                </div>
                                                <div className="border-r-2 border-[#FFF] px-2">
                                                    <div className="w-fit mx-auto">
                                                        <h2 className="2xl:text-3xl xl:text-xl text-base font-semibold text-white">{d.session}</h2>
                                                        <p className="2xl:text-sm xl:text-xs text-[8px] text-[#FFFFFF80] 2xl:mt-2 xl:mt-1 mt-[2px] uppercase">total number of sessions
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="w-fit ml-auto px-2">
                                                        <h2 className="2xl:text-3xl xl:text-xl text-base font-semibold text-white">{(d.distance).toFixed(2)} KM</h2>
                                                        <p className="2xl:text-sm xl:text-xs text-[8px] text-[#FFFFFF80] 2xl:mt-2 xl:mt-1 mt-[2px]">TOTAL DISTANCE</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
            {
                pointTable.length > 10 &&
                <div className={`w-fit mx-auto mt-10`}>
                    <button onClick={() => handleShowMore()} className="btn bg-white border-none flex items-center gap-0">
                        <span>See More</span> <span className="mt-1"><FaArrowDown /></span>
                    </button>
                </div>
            }

        </div>
    );
};

export default LeadBoard;
