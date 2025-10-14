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
import TableHead from '@/Components/TableHead';
import TableRow from '@/Components/TableRow';
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
    const [itemsToShow, setItemsToShow] = useState(10);
    const { user } = useAuth();
    const userData = pointTable?.find(p => p?.uid === user?.uid) || null;

    // Combined dataset for the multi-discipline table (sorted by total)
    const base = (pointTable || []).filter(Boolean);
    const sortedAll = [...base].sort((a, b) => (b.total || 0) - (a.total || 0));
    const normalizedSearchAll = searchTerm.trim().toLowerCase();
    const newData = sortedAll.filter(item => {
        if (normalizedSearchAll) {
            if (displayMode === 'team') {
                const team = (item?.team || '').toLowerCase();
                if (!team.includes(normalizedSearchAll)) return false;
            } else {
                const name = (item?.displayName || '').toLowerCase();
                if (!name.includes(normalizedSearchAll)) return false;
            }
        }
        if (filterPays && String((item?.pays) || '') !== String(filterPays)) return false;
        if (filterAge && String((item?.age) || '') !== String(filterAge)) return false;
        if (filterTeam && String((item?.team) || '') !== String(filterTeam)) return false;
        return true;
    });
    const paginatedAll = newData.slice(0, itemsToShow);

    const handleOpen = (pos) => {
        if (index === pos) {
            setOpen(o => !o);
        } else {
            setIndex(pos);
            setOpen(true);
        }
    };

    return (
        <div className='lg:px-0 px-4'>
            <div className="lg:px-0 px-4">
                {(() => {
                    const currentCategory = categories[tabIndex];
                    const currentSorted = sortDataByTime(pointTable, currentCategory) || [];
                    // Use the combined base dataset for filter options so filters work across the 'All' view
                    const paysOptions = Array.from(new Set(base.map(s => s?.pays).filter(Boolean)));
                    const ageOptions = Array.from(new Set(base.map(s => s?.age).filter(Boolean))).sort((a, b) => a - b);
                    const teamOptions = Array.from(new Set(base.map(s => s?.team).filter(Boolean)));
                    return (
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
                                <option value='name'>Player</option>
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
                                    className='btn btn-outline text-white btn-sm ring-0 outline-0 focus:ring-0 focus:outline-0'
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
                    )
                })()}
            </div>
            <div className='w-full overflow-x-auto'>
                <div className="overflow-x-auto w-full 2xl:mt-10 xl:mt-6 mt-3">
                    <table className="table">
                                <TableHead profile={true} tableHead={['#', 'Participant', 'Wingfoil', 'Windfoil', 'Dockstart', 'Surffoil', 'DW', 'Parawing', 'Total Time']} />
                        <tbody>
                            {
                                paginatedAll?.map((d, i) => {
                                    const pos = sortedAll.indexOf(d) + 1;
                                    return (
                                        <React.Fragment key={d?.uid || i}>
                                            <TableRow data={d} uid={userData?.uid} position={pos} onClick={() => handleOpen(pos)} displayMode={displayMode} isOpen={index === pos && open} />
                                            {index === pos && open && (
                                                <tr>
                                                    <td colSpan={'9'} className='p-0'>
                                                        <div className='bg-black rounded-[20px] 2xl:p-10 xl:p-6 p-4 grid 2xl:grid-cols-4 xl:grid-cols-4 grid-cols-2 2xl:gap-0 xl:gap-0 gap-6'>
                                                            <div className='border-r-2 border-[#FFF]'>
                                                                <h2 className='2xl:text-3xl xl:text-xl text-xs font-semibold text-white'>{d.city} {d.pays}</h2>
                                                                <p className='2xl:text-sm xl:text-xs text-[8px] text-[#FFFFFF80] 2xl:mt-2 xl:mt-1 mt-[2px]'>CITY, COUNTRY</p>
                                                            </div>
                                                            <div className='2xl:border-r-2 xl:border-r-2 2xl:border-[#FFF] xl:border-[#FFF] 2xl:ml-2 xl:ml-2'>
                                                                <div className='2xl:w-fit 2xl:mx-auto xl:w-fit xl:mx-auto'>
                                                                    <h2 className='2xl:text-3xl xl:text-xl text-xs font-semibold text-white'>{convertToFranceTime(d.lastUploadedTime).date}</h2>
                                                                    <p className='2xl:text-sm xl:text-xs text-[8px] text-[#FFFFFF80] 2xl:mt-2 xl:mt-1 mt-[2px] uppercase'>last session</p>
                                                                </div>
                                                            </div>
                                                            <div className='border-r-2 border-[#FFF] 2xl:ml-2 xl:ml-2'>
                                                                <div className='2xl:w-fit 2xl:mx-auto xl:w-fit xl:mx-auto'>
                                                                    <h2 className='2xl:text-3xl xl:text-xl text-xs font-semibold text-white'>{d[`${categories[tabIndex]}Session`]}</h2>
                                                                    <p className='2xl:text-sm xl:text-xs text-[8px] text-[#FFFFFF80] 2xl:mt-2 xl:mt-1 mt-[2px]'>TOTAL NUMBER OF SESSIONS</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className='w-fit 2xl:ml-auto xl:ml-auto'>
                                                                    <h2 className='2xl:text-3xl xl:text-xl text-xs font-semibold text-white'>{(d[`${categories[tabIndex]}Distance`] || 0).toFixed(2)} KM</h2>
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
                </div>

                {newData?.length > itemsToShow && (
                    <div className='flex justify-center mt-6'>
                        <button onClick={() => setItemsToShow(s => s + 10)} className='btn btn-outline text-white w-fit mx-auto'>See More</button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default SelectTab;