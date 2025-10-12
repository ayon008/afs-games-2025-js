'use client'
/* eslint-disable @next/next/no-img-element */
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import GetAwards from '@/lib/getAwards';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddAwards = ({ sponsors }) => {
    const categories = ['Wingfoil', 'Windfoil', 'dockstart', 'surfFoil', 'dw', 'waterman crown'];
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { isLoading, isError, error, awards, refetch } = GetAwards();
    const axiosSecure = useAxiosSecure();
    const getSortedAwardsByCategory = (awards, category) => {
        return awards
            ?.filter(award => award.category.toLowerCase() === category.toLowerCase())
            ?.sort((a, b) => parseInt(a.position) - parseInt(b.position));
    };
    const Wingfoil = getSortedAwardsByCategory(awards, 'Wingfoil');
    const Windfoil = getSortedAwardsByCategory(awards, 'Windfoil');
    const dockstart = getSortedAwardsByCategory(awards, 'dockstart');
    const surfFoil = getSortedAwardsByCategory(awards, 'surfFoil');
    const dw = getSortedAwardsByCategory(awards, 'dw');
    const watermanCrown = getSortedAwardsByCategory(awards, 'waterman crown');
    const data = [
        { category: 'Wingfoil', data: Wingfoil },
        { category: 'Windfoil', data: Windfoil },
        { category: 'Dockstart', data: dockstart },
        { category: 'Surf Foil', data: surfFoil },
        { category: 'DW', data: dw },
        { category: 'Waterman Crown', data: watermanCrown }
    ];

    // Form submission handler
    const onSubmit = (data) => {
        // Show loading state using SweetAlert
        Swal.fire({
            title: 'Submitting...',
            text: 'Please wait while we submit the form.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(); // Show loading spinner
            },
        });

        // Send the form data via axios
        axiosSecure.post('/addAwards', data)
            .then((response) => {
                // On success, show success message
                Swal.close();
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'The form has been submitted successfully.',
                    confirmButtonText: 'OK',
                });
                refetch();
                reset();
            })
            .catch((error) => {
                // On error, show error message
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Something went wrong. Please try again later.',
                    confirmButtonText: 'OK',
                });
            });
    };


    const handleDelete = id => {
        Swal.fire({
            title: 'Deleting...',
            text: 'Please wait while we delete the award.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        // Perform the delete operation
        axiosSecure.delete(`/award/${id}`)
            .then(() => {
                // Close the loading alert
                Swal.close();
                // Show success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'The award has been successfully deleted.',
                    confirmButtonText: 'OK',
                });

                // Refetch or update your state here
                refetch();
            })
            .catch((error) => {
                // Close the loading alert
                Swal.close();
                // Show error alert
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to delete award. Please try again.',
                    confirmButtonText: 'OK',
                });
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-10 grid grid-cols-2 2xl:gap-10 xl:gap-6 gap-3">
                    <div>
                        <label htmlFor="category" className="block mb-2">
                            Add Category
                        </label>
                        <select id="category" className="select select-bordered w-full" {...register("category", { required: true })}>
                            <option selected>Pick Category</option>
                            {categories?.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {errors.category && <span className="text-red-500">Category is required</span>}
                    </div>

                    <div>
                        <label htmlFor="position" className="block mb-2">
                            Position
                        </label>
                        <select id="position" className="select select-bordered w-full" {...register("position", { required: true })}>
                            <option selected>Pick Position</option>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                            <option value="3rd">3rd</option>
                        </select>
                        {errors.position && <span className="text-red-500">Position is required</span>}
                    </div>
                    <div>
                        <label htmlFor="sponsors1" className="block mb-2">
                            Sponsors 1
                        </label>
                        <select id="sponsors1" className="select select-bordered w-full" {...register("sponsors1", { required: true })}>
                            <option selected value={''}>Pick Sponsors</option>
                            {sponsors?.filter(s => s.showInPrize === "true")?.map((sponsor, i) => (
                                <option key={i} value={sponsor.sponsorPicture}>
                                    {sponsor.sponsorName}
                                </option>
                            ))}
                        </select>
                        {errors.sponsors1 && <span className="text-red-500">Sponsors are required</span>}
                    </div>
                    <div>
                        <label htmlFor="sponsors2" className="block mb-2">
                            Sponsors 2
                        </label>
                        <select id="sponsors2" className="select select-bordered w-full" {...register("sponsors2")}>
                            <option selected value={''}>Pick Sponsors</option>
                            {sponsors?.filter(s => s.showInPrize === "true")?.map((sponsor, i) => (
                                <option key={i} value={sponsor.sponsorPicture}>
                                    {sponsor.sponsorName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sponsors3" className="block mb-2">
                            Sponsors 3
                        </label>
                        <select id="sponsors3" className="select select-bordered w-full" {...register("sponsors3")}>
                            <option selected value={''}>Pick Sponsors</option>
                            {sponsors?.filter(s => s.showInPrize === "true")?.map((sponsor, i) => (
                                <option key={i} value={sponsor.sponsorPicture}>
                                    {sponsor.sponsorName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sponsors4" className="block mb-2">
                            Sponsors 4
                        </label>
                        <select id="sponsors4" className="select select-bordered w-full" {...register("sponsors4")}>
                            <option selected value={''}>Pick Sponsors</option>
                            {sponsors?.filter(s => s.showInPrize === "true")?.map((sponsor, i) => (
                                <option key={i} value={sponsor.sponsorPicture}>
                                    {sponsor.sponsorName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sponsors5" className="block mb-2">
                            Sponsors 5
                        </label>
                        <select id="sponsors5" className="select select-bordered w-full" {...register("sponsors5")}>
                            <option selected value={''}>Pick Sponsors</option>
                            {sponsors?.filter(s => s.showInPrize === "true")?.map((sponsor, i) => (
                                <option key={i} value={sponsor.sponsorPicture}>
                                    {sponsor.sponsorName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sponsors6" className="block mb-2">
                            Sponsors 6
                        </label>
                        <select id="sponsors6" className="select select-bordered w-full" {...register("sponsors6")}>
                            <option selected value={''}>Pick Sponsors</option>
                            {sponsors?.filter(s => s.showInPrize === "true")?.map((sponsor, i) => (
                                <option key={i} value={sponsor.sponsorPicture}>
                                    {sponsor.sponsorName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sponsors7" className="block mb-2">
                            Sponsors 7
                        </label>
                        <select id="sponsors7" className="select select-bordered w-full" {...register("sponsors7")}>
                            <option selected value={''}>Pick Sponsors</option>
                            {sponsors?.filter(s => s.showInPrize === "true")?.map((sponsor, i) => (
                                <option key={i} value={sponsor.sponsorPicture}>
                                    {sponsor.sponsorName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="prize1" className="block mb-2">
                            Prize 1
                        </label>
                        <input
                            id="prize1"
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            {...register("prize1", { required: true })}
                        />
                        {errors.prize && <span className="text-red-500">Prize is required</span>}
                    </div>
                    <div>
                        <label htmlFor="prize2" className="block mb-2">
                            Prize 2
                        </label>
                        <input
                            id="prize2"
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            {...register("prize2")}
                        />

                    </div>
                    <div>
                        <label htmlFor="prize3" className="block mb-2">
                            Prize 3
                        </label>
                        <input
                            id="prize3"
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            {...register("prize3")}
                        />
                    </div>
                </div>
                {/* Submit Button */}
                <div className="w-fit mx-auto">
                    <button type="submit" className="btn bg-[#FFE500] text-white border-none mb-10 mt-6 btn-primary w-full">Submit</button>
                </div>
            </form>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Category</th>
                                <th>Position</th>
                                <th>Prize</th>
                                <th>Sponsors</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                data?.map((d, i) => {
                                    return (
                                        <>
                                            <tr className=''>
                                                <th>{i + 1}</th>
                                                <th>{d.category}</th>
                                                <td rowSpan={3}>
                                                    {
                                                        d?.data?.map((w, i) => {
                                                            return (
                                                                <div key={i} className='my-3'>
                                                                    {w.position}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </td>
                                                <td rowSpan={3}>
                                                    {
                                                        d?.data?.map((w, i) => {
                                                            return (
                                                                <div key={i} className={i == 1 && 'my-3'}>
                                                                    {w[`prize1`]} , {w[`prize2`]} , {w[`prize3`]}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </td>
                                                <td rowSpan={3}>
                                                    {
                                                        d?.data?.map((w, i) => {
                                                            return (
                                                                <div key={i} className={`${i == 1 && 'my-3'} flex items-center gap-2`}>
                                                                    <div className={w[`sponsors1`] === "" ? "hidden" : "block"}>
                                                                        <img src={w[`sponsors1`]} alt="" className='h-auto w-[50px]' />
                                                                    </div>
                                                                    <div className={w[`sponsors2`] === "" ? "hidden" : "block"}>
                                                                        <img className='h-auto w-[50px]' src={w[`sponsors2`]} alt="" />
                                                                    </div>
                                                                    <div className={w[`sponsors3`] === "" ? "hidden" : 'block'}>
                                                                        <img className='h-auto w-[50px]' src={w[`sponsors3`]} alt="" />
                                                                    </div>
                                                                    <div className={w[`sponsors4`] === "" ? "hidden" : 'block'}>
                                                                        <img className='h-auto w-[50px]' src={w[`sponsors4`]} alt="" />
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </td>
                                                <td rowSpan={3}>
                                                    {
                                                        d?.data?.map(w => {
                                                            console.log(w._id);

                                                            return (
                                                                <div key={w._id} className='my-2'>
                                                                    <button onClick={() => handleDelete(w._id)} key={w._id} className='btn btn-outline text-red-600'>
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </td>
                                            </tr>
                                            <tr></tr>
                                            <tr></tr>
                                            <tr></tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AddAwards;