import useAxiosSecure from '@/Hooks/useAxiosSecure';
import convertToFranceTime from '@/lib/convertTime';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function formatDateTime(isoDateString) {
    const date = new Date(isoDateString);

    // Extract time components and add leading zeros
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    // Extract date components and add leading zeros
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is zero-indexed
    const year = date.getFullYear();

    // Combine time and date into the desired format
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const formattedDate = `${day}/${month}/${year}`;

    return `${formattedTime}, ${formattedDate}`;
}

const GetDetails = ({ uid, user }) => {
    const axiosSecure = useAxiosSecure();
    const { data, isLoading, error, refetch } = useQuery(
        {
            queryKey: ['gpx'],
            queryFn: async () => {
                try {
                    const response = await axiosSecure.get(`getDetails/${uid}`);
                    return response.data;
                } catch (err) {
                    console.error("Error fetching user data:", err);
                    throw err; // Rethrow the error to be caught by React Query
                }
            },
        }
    );

    if (isLoading) {
        return <div>Loading...</div>; // Loading state
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Error handling
    }

    const pointTable = data?.pointTable;
    const files = data?.files;
    console.log(files);

    const time = pointTable?.lastUploadedTime;

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
                refetch()
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
                refetch()
            })
            .catch((error) => {
                // Close the loading alert if there's an error
                Swal.close();

                // Show error alert
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to reject status. Please try again.',
                    confirmButtonText: 'Ok',
                });
            });
    };


    return (
        <>
            <tr>
                <td colSpan={'9'} className='p-0'>
                    <div className='bg-black rounded-t-[20px] 2xl:p-10 xl:p-6 p-4 grid 2xl:grid-cols-4 xl:grid-cols-4 grid-cols-2 2xl:gap-0 xl:gap-0 gap-6'>
                        <div className='border-r-2 border-[#FFE500]'>
                            <h2 className='2xl:text-3xl xl:text-xl text-xs font-semibold text-white'>{user?.city} {user?.pays}</h2>
                            <p className='2xl:text-sm xl:text-xs text-[8px] text-[#FFFFFF80] 2xl:mt-2 xl:mt-1 mt-[2px]'>CITY, COUNTRY</p>
                        </div>
                        <div className='2xl:border-r-2 xl:border-r-2 2xl:border-[#FFE500] xl:border-[#FFE500] 2xl:ml-2 xl:ml-2'>
                            <div className='2xl:w-fit 2xl:mx-auto xl:w-fit xl:mx-auto'>
                                <h2 className='2xl:text-3xl xl:text-xl text-xs font-semibold text-white'>{time || 'N/A'}</h2>
                                <p className='2xl:text-sm xl:text-xs text-[8px] text-[#FFFFFF80] 2xl:mt-2 xl:mt-1 mt-[2px] uppercase'>last session</p>
                            </div>
                        </div>
                        <div className='border-r-2 border-[#FFE500] 2xl:ml-2 xl:ml-2'>
                            <div className='2xl:w-fit 2xl:mx-auto xl:w-fit xl:mx-auto'>
                                <h2 className='2xl:text-3xl xl:text-xl text-xs font-semibold text-white'>{Math.abs(parseInt(pointTable?.session)) || 'N/A'}</h2>
                                <p className='2xl:text-sm xl:text-xs text-[8px] text-[#FFFFFF80] 2xl:mt-2 xl:mt-1 mt-[2px]'>TOTAL NUMBER OF SESSIONS</p>
                            </div>
                        </div>
                        <div>
                            <div className='w-fit 2xl:ml-auto xl:ml-auto'>
                                {
                                    (pointTable?.total) ? <h2 className='2xl:text-3xl xl:text-xl text-xs font-semibold text-white'>{Math.abs(parseInt((pointTable?.total)))?.toFixed(2)} KM</h2> : <h2 className='2xl:text-3xl xl:text-xl text-xs font-semibold text-white'>N/A</h2>

                                }

                                <p className='2xl:text-sm xl:text-xs text-[8px] text-[#FFFFFF80] 2xl:mt-2 xl:mt-1 mt-[2px]'>TOTAL DISTANCE</p>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr className='bg-black'>
                <td colSpan={'9'} className='uppercase text-white 2xl:p-10 xl:p-6 p-4'>manage “User name” all GPX </td>
            </tr>
            <tr className='bg-black'>
                <td colSpan={'9'} className='rounded-b-[20px]'>
                    <table className='w-full px-0'>
                        <thead className='text-white'>
                            <tr>
                                <th>Category</th>
                                <th>Uploaded Time</th>
                                <th>Distance</th>
                                <th>Total Time</th>
                                <th>Filename</th>
                                <th>Created GPX</th>
                                <th>Download GPX</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                files?.map((file, i) => {
                                    const time = file?.lastUploadedTime;
                                    const createdTime = file?.createdTime;
                                    const status = file?.status;
                                    return (
                                        <tr key={i}>
                                            <td className='uppercase text-white'>{file.category}</td>
                                            <td className='uppercase text-white'>{formatDateTime(time)}</td>
                                            <td className='uppercase text-white'>{file?.distance?.toFixed(2)} KM</td>
                                            <td className=' text-white'>{file?.totalTime?.toFixed(2)} hr</td>
                                            <td className=' text-white'>{file?.filename}</td>
                                            <td className='uppercase text-white'>{formatDateTime(createdTime)}</td>
                                            <td className='text-white'>
                                                <a href={file?.gpxURL} target='_blank' className='text-blue-500 underline'>Download</a>
                                            </td>
                                            <td className='uppercase text-white'>{file?.status ? 'Approved' : 'Rejected'}</td>
                                            {
                                                !status ?
                                                    <td className='flex items-center gap-1'>
                                                        <button onClick={() => handleAccept(file?._id)} className='btn btn-outline text-green-600 hover:bg-green-600 hover:text-white'>Accept</button>
                                                    </td>
                                                    :
                                                    <td className='flex items-center gap-1'>
                                                        <button onClick={() => handleReject(file?._id)} className='btn btn-outline text-red-600 hover:bg-red-600 hover:text-white'>Reject</button>
                                                    </td>
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </td>
            </tr>
        </>
    );
};

export default GetDetails;