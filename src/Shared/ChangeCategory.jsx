'use client';
import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import GetUserData from '@/lib/getUserData';
import React from 'react';
import Swal from 'sweetalert2';

const ChangeCategory = () => {
    const { user } = useAuth();
    const { isLoading, isError, error, userInfo, refetch } = GetUserData(user?.uid);
    const axiosSecure = useAxiosSecure();
    const uid = userInfo?.uid;

    const handleChange = async (category) => {
        try {
            const result = await Swal.fire({
                title: "Add To New Discipline?",
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
                    title: "Discipline Updated!",
                    text: response.data.message || "The Discipline has been updated successfully.",
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

    // Reusable Tailwind class strings for buttons
    const baseBtn = "btn px-4 py-2 text-[10px] btn-sm";
    const participateBtn = `${baseBtn} btn-outline text-green-500`;
    const participatedBtn = `${baseBtn} border text-green-500 border-green-500 hover:bg-green-500 hover:text-black disabled:border-[#FFE500] disabled:text-[#FFE500] disabled:hover:bg-[#FFE500] disabled:hover:text-black`;

    const categories = [
        "Dockstart",
        "Downwind",
        "Surffoil",
        "Windfoil",
        "Wingfoil",
        "Parawing",
    ];

    return (
        <div className="text-white">
            <h2 className="font-semibold 2xl:text-5xl xl:text-3xl">
                Your Register Discipline
            </h2>
            <p className="2xl:text-2xl xl:text-lg 2xl:mt-14 xl:mt-7 font-semibold">
                Want to participate another discipline?
            </p>
            <div className="mt-10 overflow-x-hidden w-full">
                <table className="table">
                    <thead>
                        <tr className="text-white">
                            <th>#</th>
                            <th>Discipline</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td>Loading...</td>
                            </tr>
                        ) : (
                            categories.map((category, index) => {
                                const participated = userInfo?.[category];
                                return (
                                    <tr key={category}>
                                        <td className="font-medium 2xl:text-2xl xl:text-xl text-lg">{index + 1}</td>
                                        <td className="font-medium 2xl:text-2xl xl:text-xl text-lg">{category}</td>
                                        <td className="text-right 2xl:text-2xl xl:text-xl text-lg">
                                            {participated ? (
                                                <button className={participatedBtn} disabled>
                                                    Participated
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleChange(category)}
                                                    className={participateBtn}
                                                >
                                                    Participate
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChangeCategory;
