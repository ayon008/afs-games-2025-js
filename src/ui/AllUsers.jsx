/* eslint-disable @next/next/no-img-element */
'use client';
import ApprovedBtn from '@/Components/ApprovedBtn';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import GetAllUser from '@/lib/getAllUsers';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import profileImage from '../../public/Profile_avatar_placeholder_large.png'
import CategoryForm from './CategoryForm';
import GetDetails from './GetDetails';
import * as XLSX from 'xlsx';
import ExportData from './ExportData';

const AllUsers = () => {
    const { isLoading, isError, error, allUsers, refetch } = GetAllUser();
    const axiosSecure = useAxiosSecure();
    const categories = ['Wingfoil', 'Windfoil', 'Dockstart', 'Surffoil', 'Downwind', 'WatermanCrown'];
    // const ExcelFile = ReactExport.ExcelFile;
    // const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const [type, setType] = useState('');
    const [index, setIndex] = useState(0);
    const handleValue = e => {
        const type = e.target.value;
        setType(type);
    }

    // Filter users based on the selected category
    const data = type ? allUsers?.filter(user => {
        return user[type];
    }) : allUsers;

    const containerRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDown(false);
    };

    const handleMouseUp = () => {
        setIsDown(false);
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1; // Adjust the speed here
        containerRef.current.scrollLeft = scrollLeft - walk;
    };



    const handleAdmin = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to make this user an admin?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, make admin!',
            cancelButtonText: 'No, cancel!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Processing...',
                    text: 'Please wait while the admin status is being updated',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                axiosSecure.patch(`/makeAdmin/${id}`, { admin: true })
                    .then(response => {
                        if (response.data.matchedCount > 0 && response.data.modifiedCount > 0) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: 'User has been made an admin successfully.',
                            });
                            refetch(); // Refetch the data after successful update
                        } else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'No Changes Made',
                                text: 'The admin status was not updated. Please try again.',
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to update admin status. Please try again.',
                        });
                        console.error(error);
                    });
            }
        });
    };

    const handleRemoveAdmin = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to remove this user's admin rights?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove admin!',
            cancelButtonText: 'No, cancel!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Processing...',
                    text: 'Please wait while the admin status is being updated',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                axiosSecure.patch(`/removeAdmin/${id}`, { admin: false })
                    .then(response => {
                        if (response.data.matchedCount > 0 && response.data.modifiedCount > 0) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: 'Admin rights have been removed successfully.',
                            });
                            refetch(); // Refetch the data after successful update
                        } else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'No Changes Made',
                                text: 'The admin status was not updated. Please try again.',
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to remove admin rights. Please try again.',
                        });
                        console.error(error);
                    });
            }
        });
    };

    const [open, setOpen] = useState(false);
    const handleOpen = (i, open) => {
        setIndex(i + 1)
        setOpen(!open)
    }

    const handleClick = (id, value) => {
        const approved = { approved: value };
        // Show a loading alert before making the request
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while we update the status.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(); // Show the loading spinner
            },
        });

        axiosSecure.patch(`/approved/${id}`, approved)
            .then(async (response) => {
                // Close the loading alert
                Swal.close();
                refetch();
                // Show success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Approved!',
                    text: 'The status has been successfully updated.',
                    confirmButtonText: 'OK',
                });
            })
            .catch((error) => {
                // Close the loading alert
                Swal.close();

                // Show error alert
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'There was a problem updating the status.',
                    confirmButtonText: 'Try Again',
                });
            });
    };

    if (isLoading) {
        return <>Loading...</>
    }


    return (
        <div className='p-10'>
            <div>
                <h3 className='text-2xl font-semibold text-center'>All Users</h3>
                <p className='text-xs text-center font-semibold mt-2'>Manage users</p>
                <div className='mt-10'>
                    <div className=''>
                        <select onChange={handleValue} className="select select-bordered w-full max-w-xs">
                            <option disabled>Sort by category</option>
                            <option value={''}>All users</option>
                            {categories?.map((c, i) => (
                                <option key={i} value={c === 'Dockstart' ? 'Dockstart' : c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className={`overflow-x-auto mt-10 ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`} ref={containerRef} onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}>
                <ExportData data={data} />
                <table className="table mt-10">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Invoice</th>
                            {/* <th>Participated</th> */}
                            <th>Approve Account</th>
                            <th>Admin</th>
                            <th>Make admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((user, i) => {
                            const { pays, city, email, displayName, photoURL, approved, invoiceURL, Windfoil, Wingfoil, Dockstart, Downwind, Surffoil, WatermanCrown, _id, admin } = user;
                            return (
                                <>
                                    <tr onClick={() => handleOpen(i, open)} className='cursor-pointer' key={_id}>
                                        <td>{i + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        {
                                                            photoURL ?
                                                                <img src={photoURL} alt="user-profile" />
                                                                :
                                                                <Image src={profileImage}
                                                                    width={30}
                                                                    height={30}
                                                                    alt="user-profile" />
                                                        }
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-semibold">{displayName}</div>
                                                    <div className="text-sm opacity-50">{city}, {pays}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{email}</td>
                                        <td>
                                            {invoiceURL && (
                                                <a href={invoiceURL} target='_blank' className='text-[#FFE500] underline'>Invoice URL</a>
                                            )}
                                        </td>
                                        {/* <td className='font-semibold'>
                                            <div className="dropdown">
                                                <div tabIndex={0} role="button" className="btn m-1 select select-bordered min-w-[500px]">
                                                    <p>{Windfoil && 'Windfoil'} {Wingfoil && 'Wingfoil'} {Dockstart && 'Dockstart'} {Downwind && 'Downwind'} {Surffoil && 'Surffoil'} {WatermanCrown && 'Waterman Crown'}</p>
                                                </div>
                                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 z-[1] w-full shadow p-0 border-black border-2 rounded-box">
                                                    <li className='p-2 border-b-2 border-black'>Change the discipline </li>
                                                    <CategoryForm refetch={refetch} user={user} />
                                                </ul>
                                            </div>
                                        </td> */}
                                        <td className='flex items-center gap-3'>
                                            {!approved ? <span>Disapproved</span> : <span>Approved</span>}
                                            {
                                                !approved ? <button onClick={() => handleClick(_id, true)} className='btn btn-outline text-green-500 hover:text-white hover:bg-green-500'>
                                                    Approve
                                                </button>
                                                    :
                                                    <button onClick={() => handleClick(_id, false)} className='btn btn-outline text-red-500 hover:text-white hover:bg-red-500'>
                                                        Disapprove
                                                    </button>
                                            }
                                        </td>
                                        <td>{admin ? 'True' : 'False'}</td>
                                        <td>
                                            {
                                                !admin ?
                                                    <button onClick={() => handleAdmin(_id)} className='btn btn-outline text-green-500 hover:text-white hover:bg-green-500'>
                                                        Make admin
                                                    </button>
                                                    :
                                                    <button onClick={() => handleRemoveAdmin(_id)} className='btn btn-outline text-red-500 hover:text-white hover:bg-red-500'>
                                                        Remove Admin
                                                    </button>
                                            }
                                        </td>
                                    </tr>
                                    {index === i + 1 && open && (
                                        <GetDetails user={user} uid={user?.uid} />
                                    )}
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
