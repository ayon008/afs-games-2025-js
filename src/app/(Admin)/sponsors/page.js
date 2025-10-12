/* eslint-disable @next/next/no-img-element */
'use client'
import DeleteButton from '@/Components/DeleteButton';
import GetSponsors from '@/lib/getSponsors';
import AddSponsors from '@/ui/AddSponsors';
import React from 'react';

const Page = () => {
    const { isLoading, isError, error, sponsors, refetch } = GetSponsors();

    return (
        <div className='p-10'>
            <div>
                <h3 className='text-2xl font-semibold text-center'>Sponsors List</h3>
                <p className='text-xs text-center font-semibold mt-2'>Manage your sponsors</p>
            </div>
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Sponsor Logo</th>
                            <th>Sponsor Website</th>
                            <th>Show in Home</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            sponsors?.map((sponsor, i) => {
                                return (
                                    <tr key={i}>
                                        <th>
                                            {i + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-start gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={sponsor?.sponsorPicture}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='font-semibold'>
                                            {sponsor?.sponsorName}
                                        </td>
                                        <td>{sponsor.showInHome ? 'Yes' : 'No'}</td>
                                        <td>
                                            <DeleteButton id={sponsor?._id} refetch={refetch} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <AddSponsors refetch={refetch} />
        </div>
    );
};

export default Page;