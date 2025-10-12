/* eslint-disable @next/next/no-img-element */
'use client'
import useAuth from '@/Hooks/useAuth';
import FaArrowDown from '@/icons/FaArrowDown';
import CountryFlagList from '@/js/GetFlags';
import GetFlags from '@/js/GetFlags';
import profileImage from '../../public/Profile_avatar_placeholder_large.png'
import watermanCrown from '@/js/getWatermanCrown';
import convertToFranceTime from '@/lib/convertTime';
import sortDataByTime from '@/lib/getDataByCategory';
import LeadBoard from '@/ui/LeadBoard';
import React, { useState, useEffect } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Image from 'next/image';

const SelectTab = ({ pointTable }) => {
    const categories = ['Wingfoil', 'Windfoil', 'dockstart', 'surfFoil', 'dw', 'Parawing'];
    const [tabIndex, setTabIndex] = useState(0);
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPays, setFilterPays] = useState('');
    const [filterAge, setFilterAge] = useState('');
    const [filterTeam, setFilterTeam] = useState('');
    const [displayMode, setDisplayMode] = useState('name'); // 'name' or 'team'
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const { user } = useAuth();
    const userData = pointTable?.find(p => p?.uid === user?.uid) || null;

    const handleOpen = (pos) => {
        if (index === pos) {
            setOpen(o => !o);
        } else {
            setIndex(pos);
            setOpen(true);
        }
    };

    return (
        <div>
            <Tabs selectedIndex={tabIndex} onSelect={(i) => { setTabIndex(i); setPage(1); }}>
                <TabList className={'flex items-center 2xl:justify-center xl:justify-center justify-between 2xl:gap-10 xl:gap-10 gap-4 cursor-pointer w-full px-1 overflow-x-auto'}>
                    {categories.map((c, idx) => (
                        <Tab
                            key={c}
                            className={`capitalize ${tabIndex === idx ? 'text-blue-400 underline decoration-blue-400 decoration-2 underline-offset-2' : ''}`}
                        >
                            {c}
                        </Tab>
                    ))}
                </TabList>

                {categories?.map((category, i) => {
                    const sorted = sortDataByTime(pointTable, category) || [];
                    const paysOptions = Array.from(new Set(sorted.map(s => s?.pays).filter(Boolean)));
                    const ageOptions = Array.from(new Set(sorted.map(s => s?.age).filter(Boolean))).sort((a, b) => a - b);
                    const teamOptions = Array.from(new Set(sorted.map(s => s?.team).filter(Boolean)));

                    // apply search and filters
                    const normalizedSearch = searchTerm.trim().toLowerCase();
                    let filtered = sorted.filter(item => {
                        if (normalizedSearch) {
                            const name = (item?.displayName || '').toLowerCase();
                            if (!name.includes(normalizedSearch)) return false;
                        }
                        if (filterPays && item?.pays !== filterPays) return false;
                        if (filterAge && String(item?.age) !== String(filterAge)) return false;
                        if (filterTeam && item?.team !== filterTeam) return false;
                        return true;
                    });

                    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
                    const startIndex = (page - 1) * pageSize;
                    const paginated = filtered.slice(startIndex, startIndex + pageSize);

                    return (
                        <TabPanel key={i} className={'2xl:mt-20 xl:mt-12 mt-8'}>
                            <div className="overflow-x-auto">
                                {/* Search and filters */}
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search participant..."
                                        value={searchTerm}
                                        onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                                        className="input input-sm input-bordered w-full md:w-1/3 ring-0 outline-0 focus:ring-0 focus:outline-0"
                                    />
                                    <select
                                        value={displayMode}
                                        onChange={(e) => { setDisplayMode(e.target.value); setPage(1); }}
                                        className="select select-sm select-bordered w-full md:w-1/12 ring-0 outline-0 focus:ring-0 focus:outline-0"
                                    >
                                        <option value='name'>Name</option>
                                        <option value='team'>Team</option>
                                    </select>
                                    <select
                                        value={filterPays}
                                        onChange={(e) => { setFilterPays(e.target.value); setPage(1); }}
                                        className="select select-sm select-bordered w-full md:w-1/6 ring-0 outline-0 focus:ring-0 focus:outline-0"
                                    >
                                        <option value=''>All countries</option>
                                        {paysOptions.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                    <input
                                        type="number"
                                        min={0}
                                        placeholder="Age"
                                        value={filterAge}
                                        onChange={(e) => { setFilterAge(e.target.value); setPage(1); }}
                                        className="input input-sm input-bordered w-full md:w-1/6 ring-0 outline-0 focus:ring-0 focus:outline-0"
                                    />
                                    <select
                                        value={filterTeam}
                                        onChange={(e) => { setFilterTeam(e.target.value); setPage(1); }}
                                        className="select select-sm select-bordered w-full md:w-1/6 ring-0 outline-0 focus:ring-0 focus:outline-0"
                                    >
                                        <option value=''>All teams</option>
                                        {teamOptions.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                    <div className='ml-auto'>
                                        <button
                                            type='button'
                                            className='btn btn-outline btn-sm ring-0 outline-0 focus:ring-0 focus:outline-0'
                                            onClick={() => {
                                                setSearchTerm('');
                                                setFilterPays('');
                                                setFilterAge('');
                                                setFilterTeam('');
                                                setPage(1);
                                            }}
                                        >
                                            Clear filters
                                        </button>
                                    </div>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className='font-semibold 2xl:text-lg xl:text-sm text-xs border-b-[1px] border-[#00000033] text-black'>#</th>
                                            <th className='font-semibold 2xl:text-lg xl:text-sm text-xs border-b-[1px] border-[#00000033] text-black'>Participant</th>
                                            <th className='font-semibold 2xl:text-lg xl:text-sm text-xs border-b-[1px] border-[#00000033] text-black'></th>
                                            <th className='font-semibold 2xl:text-lg xl:text-sm text-xs border-b-[1px] border-[#00000033] text-black'></th>
                                            <th className='text-right font-semibold 2xl:text-lg xl:text-sm text-xs border-b-[1px] border-[#00000033] text-black'>Total time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            paginated.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className='text-center py-6'>No participants found matching the selected filters.</td>
                                                </tr>
                                            ) : paginated.map((d, idx) => {
                                                const pagedPos = startIndex + idx + 1;
                                                const time = d.lastUploadedTime;
                                                const userPosition = sorted.indexOf(userData) + 1;
                                                // compute global (previous) position from the full sorted list
                                                const globalPos = sorted.findIndex(s => s?.uid === d?.uid) + 1;
                                                const displayPos = searchTerm.trim() ? globalPos : pagedPos;
                                                return (
                                                    <React.Fragment key={d?.uid || pagedPos}>
                                                        <tr onClick={() => handleOpen(pagedPos)} className={`${pagedPos === 1 && userPosition !== 1 ? 'first' : pagedPos === 2 && userPosition !== 2 ? 'second' : pagedPos === 3
                                                            && userPosition !== 3 ? 'third' : userPosition === pagedPos ? 'my-position' : ''} cursor-pointer border-b-[1px] border-[#00000033]`}>
                                                            <th>{displayPos}.</th>
                                                            <td>
                                                                <div className='flex items-center gap-2'>
                                                                    <CountryFlagList countries={[d?.pays]} />
                                                                    {
                                                                        d?.photoURL ?
                                                                            <img alt='profile-image' className='2xl:w-[40px] 2xl:h-[40px] xl:w-[25px] xl:h-[25px] w-[24px] h-[24px] rounded-[50%]' src={d?.photoURL} />
                                                                            :
                                                                            <Image alt='profile-image' className='2xl:w-[40px] 2xl:h-[40px] xl:w-[25px] xl:h-[25px] w-[24px] h-[24px] rounded-[50%]' src={profileImage} />
                                                                    }
                                                                    <h3 className='2xl:text-lg xl:text-sm font-semibold'>{displayMode === 'team' ? (d?.team || d?.displayName) : d?.displayName}</h3>
                                                                </div>
                                                            </td>
                                                            <td className='font-semibold 2xl:text-lg xl:text-sm text-[8px] border-b-[1px] border-[#00000033] text-black'></td>
                                                            <td className='font-semibold 2xl:text-lg xl:text-sm text-[8px] border-b-[1px] border-[#00000033] text-black'></td>
                                                            <td className='text-right font-semibold  2xl:text-lg xl:text-sm flex items-center gap-2 justify-end '><span>
                                                                {d[category].toFixed(2) + ' ' + 'hours' || 'n/a'}
                                                            </span>
                                                            </td>
                                                        </tr>
                                                        {index === pagedPos && open && (
                                                            <tr>
                                                                <td colSpan={'9'} className='p-0'>
                                                                    <div className='bg-black rounded-[20px] 2xl:p-10 xl:p-6 p-4 grid 2xl:grid-cols-4 xl:grid-cols-4 grid-cols-2 2xl:gap-0 xl:gap-0 gap-6'>
                                                                        <div className='border-r-2 border-[#FFF]'>
                                                                            <h2 className='2xl:text-3xl xl:text-xl text-xs font-semibold text-white'>{d.city} {d.pays}</h2>
                                                                            <p className='2xl:text-sm xl:text-xs text-[8px] text-[#FFFFFF80] 2xl:mt-2 xl:mt-1 mt-[2px]'>CITY, COUNTRY</p>
                                                                        </div>
                                                                        <div className='2xl:border-r-2 xl:border-r-2 2xl:border-[#FFF] xl:border-[#FFF] 2xl:ml-2 xl:ml-2'>
                                                                            <div className='2xl:w-fit 2xl:mx-auto xl:w-fit xl:mx-auto'>
                                                                                <h2 className='2xl:text-3xl xl:text-xl text-xs font-semibold text-white'>{convertToFranceTime(time).date}</h2>
                                                                                <p className='2xl:text-sm xl:text-xs text-[8px] text-[#FFFFFF80] 2xl:mt-2 xl:mt-1 mt-[2px] uppercase'>last session</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='border-r-2 border-[#FFF] 2xl:ml-2 xl:ml-2'>
                                                                            <div className='2xl:w-fit 2xl:mx-auto xl:w-fit xl:mx-auto'>
                                                                                <h2 className='2xl:text-3xl xl:text-xl text-xs font-semibold text-white'>{d[`${category}Session`]}</h2>
                                                                                <p className='2xl:text-sm xl:text-xs text-[8px] text-[#FFFFFF80] 2xl:mt-2 xl:mt-1 mt-[2px]'>TOTAL NUMBER OF SESSIONS</p>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div className='w-fit 2xl:ml-auto xl:ml-auto'>
                                                                                <h2 className='2xl:text-3xl xl:text-xl text-xs font-semibold text-white'>{(d[`${category}Distance`]).toFixed(2)
                                                                                } KM</h2>
                                                                                <p className='2xl:text-sm xl:text-xs text-[8px] text-[#FFFFFF80] 2xl:mt-2 xl:mt-1 mt-[2px]'>TOTAL DISTANCE</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                                {/* daisyUI pagination controls */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center mt-6">
                                        <div className="btn-group">
                                            <button
                                                className="btn btn-sm"
                                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                                disabled={page === 1}
                                            >
                                                Prev
                                            </button>
                                            {Array.from({ length: totalPages }).map((_, pIdx) => {
                                                const pageNum = pIdx + 1;
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        className={`btn btn-sm ${page === pageNum ? 'btn-active' : ''}`}
                                                        onClick={() => setPage(pageNum)}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                            <button
                                                className="btn btn-sm"
                                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                                disabled={page === totalPages}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </TabPanel>
                    )
                })}
            </Tabs>
        </div>
    );
};

export default SelectTab;