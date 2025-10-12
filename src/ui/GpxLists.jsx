/* eslint-disable @next/next/no-img-element */
'use client'
import UploadedUser from '@/Components/UploadedUser';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import convertToFranceTime from '@/lib/convertTime';
import GetGpx from '@/lib/getGpx';
import React from 'react';
import Swal from 'sweetalert2';
import ExportGPXData from './ExportGPXData';

const GpxLists = () => {
    const { isLoading, isError, error, gpx, refetch } = GetGpx();
    const axiosSecure = useAxiosSecure();
    const handleAccept = (id) => {
        // Show loading alert before making the request
        Swal.fire({
            title: 'Updating...',
            text: 'Please wait while we update the status.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(); // Show the loading spinner
            },
        });

        // Make the API request to update status
        axiosSecure.patch(`/updateStatus/${id}`, { status: true })
            .then(() => {
                // Close the loading alert after success
                Swal.close();

                // Show success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Status updated successfully!',
                    confirmButtonText: 'OK',
                });

                // Refetch data after successful update
                refetch();
            })
            .catch((error) => {
                // Close the loading alert if there's an error
                Swal.close();

                // Show error alert
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to update status. Please try again.',
                    confirmButtonText: 'OK',
                });
            });
    };


    const handleReject = (id) => {
        // Show loading alert before making the request
        Swal.fire({
            title: 'Rejecting...',
            text: 'Please wait while we reject the status.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(); // Show loading spinner
            },
        });

        // Make the API request to reject status
        axiosSecure.patch(`/updateStatus/${id}`, { status: false })
            .then(() => {
                // Close the loading alert after success
                Swal.close();

                // Show success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Rejected!',
                    text: 'Status has been rejected successfully.',
                    confirmButtonText: 'OK',
                });

                // Optionally, you can refetch data here if needed
                refetch();
            })
            .catch((error) => {
                // Close the loading alert if there's an error
                Swal.close();

                // Show error alert
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to reject status. Please try again.',
                    confirmButtonText: 'OK',
                });
            });
    };

    return (
        <div className='p-10'>
            <div>
                <h3 className='text-2xl font-semibold text-center'>All GPX files</h3>
                <p className='text-xs text-center font-semibold mt-2'>Manage gpx files</p>
            </div>
            <ExportGPXData data={gpx} />
            <div className="overflow-x-auto mt-10">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Category</th>
                            <th>Uploaded Time</th>
                            <th>Distance</th>
                            <th>Total Time</th>
                            <th>Filename</th>
                            <th>Uploaded By</th>
                            <th>Email</th>
                            <th>Created GPX</th>
                            <th>Download GPX</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            gpx?.map((g, i) => {
                                const { category, distance, totalTime, filename, status, uid,
                                    lastUploadedTime, _id, gpxURL, createdTime } = g;
                                const time = convertToFranceTime(lastUploadedTime).time;
                                const date = convertToFranceTime(lastUploadedTime).date;
                                const isoDateString = createdTime;
                                const dateObject = new Date(isoDateString);
                                // Options to format the date as "July 6, 2024"
                                const options = {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    timeZone: 'Europe/Paris' // To ensure it's in France's time zone
                                };

                                const franceTime = dateObject.toLocaleDateString('en-US', options);

                                return (
                                    <tr key={i}>
                                        <th>{i + 1}</th>
                                        <td className='uppercase font-semibold text-xs'>{category}</td>
                                        <td>{time}, {date}</td>
                                        <td>{distance.toFixed(2)} KM</td>
                                        <td>{totalTime.toFixed(2)} hr</td>
                                        <td>{filename}</td>
                                        <UploadedUser uid={uid} />
                                        <td>{franceTime}</td>
                                        <td>{
                                            gpxURL &&
                                            <a className='text-blue-500 underline cursor-pointer' target='_blank' href={gpxURL}>Download</a>
                                        }</td>
                                        <td>
                                            {status === true && 'Approved'}
                                            {status === false && 'Not approved'}
                                        </td>
                                        {
                                            !status ?
                                                <td className='flex items-center gap-1'>
                                                    <button onClick={() => handleAccept(_id)} className='btn btn-outline text-green-600 hover:bg-green-600 hover:text-white'>Accept</button>
                                                </td>
                                                :
                                                <td className='flex items-center gap-1'>
                                                    <button onClick={() => handleReject(_id)} className='btn btn-outline text-red-600 hover:bg-red-600 hover:text-white'>Reject</button>
                                                </td>
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GpxLists;