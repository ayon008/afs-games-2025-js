"use client"
import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import GetUserData from '@/lib/getUserData';
import React from 'react';
import Swal from "sweetalert2";

const ChangeCategory = () => {
    const { user } = useAuth();
    const { isLoading, isError, error, userInfo, refetch } = GetUserData(user?.uid);
    const axiosSecure = useAxiosSecure();
    const uid = userInfo?.uid;
    console.log(userInfo);

    const handleChange = async (category) => {
        try {
            const result = await Swal.fire({
                title: "Change Discipline?",
                text: "Do you want to participate in another discipline?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#22c55e", // Tailwind green-500
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, change it!",
                cancelButtonText: "Cancel",
            });

            if (!result.isConfirmed) return; // stop if user cancels

            const response = await axiosSecure.patch(`/changeCategory?category=${category}&uid=${uid}`);

            if (response.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Category Updated!",
                    text: response.data.message || "The category has been updated successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });
                refetch();
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "No changes made",
                    text: response.data.message || "No updates were applied.",
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Update Failed!",
                text: error.response?.data?.message || "Something went wrong. Please try again.",
            });
        }
    };



    return (
        <div className="text-white">
            <h2 className="font-semibold 2xl:text-5xl xl:text-3xl">
                Your Register Category
            </h2>
            <p className="2xl:text-2xl xl:text-lg 2xl:mt-14 xl:mt-7 font-semibold">
                Want to participate another category?
            </p>
            <div className='mt-10 overflow-x-hidden w-full'>
                <table className='table'>
                    <thead>
                        <tr className='text-white'>
                            <th>#</th>
                            <th>Category</th>
                            <th className='text-right'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <tr>
                                <td>Loading...</td>
                            </tr> :
                                <>
                                    <tr>
                                        <td className='font-medium'>1</td>
                                        <td className='font-medium'>
                                            Dockstart
                                        </td>
                                        <td className='text-right'>
                                            {
                                                userInfo?.Dockstart ? <button className="btn border text-green-500 border-green-500 hover:bg-green-500 hover:text-black
               disabled:border-[#FFE500] disabled:text-[#FFE500] disabled:hover:bg-[#FFE500]
               disabled:hover:text-black"
                                                    disabled>
                                                    Participated
                                                </button>
                                                    :
                                                    <button onClick={() => handleChange("Dockstart")} className='btn btn-outline text-green-500'>
                                                        Participate
                                                    </button>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='font-medium'>2</td>
                                        <td className='font-medium'>
                                            Downwind
                                        </td>
                                        <td className='text-right'>
                                            {
                                                userInfo?.Downwind
                                                    ? <button className="btn border text-green-500 border-green-500 hover:bg-green-500 hover:text-black
               disabled:border-[#FFE500] disabled:text-[#FFE500] disabled:hover:bg-[#FFE500]
               disabled:hover:text-black" disabled>
                                                        Participated
                                                    </button>
                                                    :
                                                    <button onClick={() => handleChange("Downwind")} className='btn btn-outline text-green-500'>
                                                        Participate
                                                    </button>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='font-medium'>3</td>
                                        <td className='font-medium'>
                                            Surffoil
                                        </td>
                                        <td className='text-right'>
                                            {
                                                userInfo?.Surffoil
                                                    ? <button className="btn border text-green-500 border-green-500 hover:bg-green-500 hover:text-black
               disabled:border-[#FFE500] disabled:text-[#FFE500] disabled:hover:bg-[#FFE500]
               disabled:hover:text-black" disabled>
                                                        Participated
                                                    </button>
                                                    :
                                                    <button onClick={() => handleChange("Surffoil")} className='btn btn-outline text-green-500'>
                                                        Participate
                                                    </button>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='font-medium'>4</td>
                                        <td className='font-medium'>
                                            Windfoil
                                        </td>
                                        <td className='text-right'>
                                            {
                                                userInfo?.Windfoil
                                                    ? <button className="btn border text-green-500 border-green-500 hover:bg-green-500 hover:text-black
               disabled:border-[#FFE500] disabled:text-[#FFE500] disabled:hover:bg-[#FFE500]
               disabled:hover:text-black" disabled>
                                                        Participated
                                                    </button>
                                                    :
                                                    <button onClick={() => handleChange("Windfoil")} className='btn btn-outline text-green-500'>
                                                        Participate
                                                    </button>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='font-medium'>5</td>
                                        <td className='font-medium'>
                                            Wingfoil
                                        </td>
                                        <td className='text-right'>
                                            {
                                                userInfo?.Wingfoil
                                                    ? <button className="btn border text-green-500 border-green-500 hover:bg-green-500 hover:text-black
               disabled:border-[#FFE500] disabled:text-[#FFE500] disabled:hover:bg-[#FFE500]
               disabled:hover:text-black" disabled>
                                                        Participated
                                                    </button>
                                                    :
                                                    <button onClick={() => handleChange(" Wingfoil")} className='btn btn-outline text-green-500'>
                                                        Participate
                                                    </button>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='font-medium'>6</td>
                                        <td className='font-medium'>
                                            Parawing
                                        </td>
                                        <td className='text-right'>
                                            {
                                                userInfo?.Parawing
                                                    ? <button className="btn border text-green-500 border-green-500 hover:bg-green-500 hover:text-black
               disabled:border-[#FFE500] disabled:text-[#FFE500] disabled:hover:bg-[#FFE500]
               disabled:hover:text-black" disabled>
                                                        Participated
                                                    </button>
                                                    :
                                                    <button onClick={() => handleChange("Parawing")} className='btn btn-outline text-green-500'>
                                                        Participate
                                                    </button>
                                            }
                                        </td>
                                    </tr></>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChangeCategory;