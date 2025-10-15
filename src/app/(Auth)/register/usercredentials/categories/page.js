'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import FaArrow from '@/icons/FaArrow';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const Categories = () => {
    const { register, handleSubmit, watch, setValue, resetField } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        if (!data.Wingfoil && !data.Windfoil && !data.Downwind && !data.Dockstart && !data.Surffoil && !data.Parawing) {
            Swal.fire({
                title: 'Erreur',
                text: 'Please select at least one category.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }
        // Proceed with the form submission
        localStorage.setItem('categories', JSON.stringify(data));
        router.push('createUser')
    };


    return (
        <div className='xl:w-1/3 2xl:w-1/2 w-[90%] mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-[0px] bg-[#111] rounded-lg relative">
                <span className='text-gray-500 absolute right-3 top-1 cursor-pointer'>
                    <Link href={'/'}>X</Link>
                </span>
                <span className='text-gray-500 absolute left-2 top-1 cursor-pointer' onClick={() => router.back()}>
                    <FaArrowLeft />
                </span>
                <div className='text-white text-center'>
                    <h3 className='font-semibold 2xl:text-[28px] xl:text-2xl text-lg'>Select Categories</h3>
                    <h5 className='2xl:text-base xl:text-sm text-[10px] 2xl:mb-2 xl:mb-2 mb-1 tracking-wide text-[#FFFFFF99]'>
                        Select categories you want to sign up
                    </h5>
                </div>

                {/* Wingfoil */}
                <div className="form-control">
                    <label className="cursor-pointer label justify-between">
                        <span className="label-text text-white 2xl:text-lg xl:text-sm">Wingfoil</span>
                        <input
                            type="checkbox"
                            {...register('Wingfoil')}
                            className="checkbox checkbox-warning w-[12px] h-[12px]"
                        />
                    </label>
                </div>

                {/* Windfoil */}
                <div className="form-control">
                    <label className="cursor-pointer label justify-between">
                        <span className="label-text text-white 2xl:text-lg xl:text-sm">Windfoil</span>
                        <input
                            type="checkbox"
                            {...register('Windfoil')}
                            className="checkbox checkbox-warning w-[12px] h-[12px]"
                        />
                    </label>
                </div>

                {/* Downwind SUPfoil */}
                <div className="form-control">
                    <label className="cursor-pointer label justify-between">
                        <span className="label-text text-white 2xl:text-lg xl:text-sm">Downwind SUPfoil</span>
                        <input
                            type="checkbox"
                            {...register('Downwind')}
                            className="checkbox checkbox-warning w-[12px] h-[12px]"
                        />
                    </label>
                </div>

                {/* Dockstart */}
                <div className="form-control">
                    <label className="cursor-pointer label justify-between">
                        <span className="label-text text-white 2xl:text-lg xl:text-sm">Dockstart</span>
                        <input
                            type="checkbox"
                            {...register('Dockstart')}
                            className="checkbox checkbox-warning w-[12px] h-[12px]"
                        />
                    </label>
                </div>

                {/* Surffoil */}
                <div className="form-control">
                    <label className="cursor-pointer label justify-between">
                        <span className="label-text text-white 2xl:text-lg xl:text-sm">Surffoil</span>
                        <input
                            type="checkbox"
                            {...register('Surffoil')}
                            className="checkbox checkbox-warning w-[12px] h-[12px]"
                        />
                    </label>
                </div>

                {/* Parawing */}
                <div className="form-control">
                    <label className="cursor-pointer label justify-between">
                        <span className="label-text text-white 2xl:text-lg xl:text-sm">Parawing</span>
                        <input
                            type="checkbox"
                            {...register('Parawing')}
                            className="checkbox checkbox-warning w-[12px] h-[12px]"
                        />
                    </label>
                </div>

                {/* Submit Button */}
                <div className="form-control">
                    <button type="submit" className="btn bg-[#FFE500] border-none text-white">CONTINUE</button>
                </div>

                {/* Footer */}
                <div className='flex items-center w-fit mx-auto gap-2'>
                    <p className='text-sm text-[#FFFFFF99]'>Already have an account?</p>
                    <div className='flex items-baseline gap-1'>
                        <p><Link href={"/login"} className='text-[#FFE500] text-sm'>Log In</Link></p>
                        <FaArrow className={'w-[10px] h-[10px]'} />
                    </div>
                </div>
            </form>

            <p className={`text-[#FFFFFF99] text-center Alliance 2xl:text-lg xl:text-[6px] mt-2`}>
                By signing up, I confirm that I have read and accepted Foil&Co.’s
                <span className='text-[#FFE500]'> Terms & Conditions</span> and
                <span className='text-[#FFE500]'> Privacy Policy</span>.
            </p>
        </div>
    );
};

export default Categories;
