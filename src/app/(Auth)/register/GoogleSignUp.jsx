'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useAuth from '@/Hooks/useAuth';
import Google from '@/icons/Google';
import Link from 'next/link';
import FaArrow from '@/icons/FaArrow';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const GoogleSignUp = () => {
    const { createWithGoogle } = useAuth();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    const handleGoogleLogin = async () => {
        try {
            const result = await createWithGoogle();
            const user = result.user;
            axiosSecure.get(`/user/${user?.uid}`)
                .then(response => {
                    console.log(response);
                    return router.push('/');
                })
                .catch(error => {
                    if (error) {
                        console.log(error?.response?.data?.message);
                        if (error.response && error.response.status === 404) {
                            return router.push('register/usercredentials/categories');
                        }
                    }

                })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'The Google login failed!',
                text: error.code?.split('auth/')[1],
            });
        }
    };

    const onSubmit = async (data) => {
        try {
            // Check if window is defined (client-side) before accessing localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem('email', JSON.stringify(data.email));
            }
            router.push('register/usercredentials');
        } catch (error) {
            console.error('Error during form submission:', error);
            alert('Form submission failed. Please try again.');
        }
    };

    return (
        <div className="card-body space-y-[1px] bg-[#111] rounded-lg relative">
            <span className='text-gray-500 absolute right-4 top-2'>
                <Link href={'/'}>X</Link>
            </span>
            <div className='text-white text-center'>
                <h3 className='font-semibold text-[28px] Alliance tracking-wide'>Sign up</h3>
                <h5 className='Alliance tracking-wide text-[#FFFFFF99] 2xl:text-lg xl:text-base text-base'>Add your own records for everyone to see</h5>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                <div className="form-control">
                    <input
                        type="email"
                        placeholder="Email Address"
                        {...register('email', { required: 'Email is required' })}
                        className="input input-bordered border-2 border-[#666] bg-[#1F1F1F] text-white Alliance"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div className="form-control">
                    <input type="submit" className="btn bg-[#FFE500] border-none text-black Alliance" value={'CONTINUE'} />
                </div>
            </form>
            <div className='flex items-center w-fit mx-auto gap-2'>
                <p className='text-sm text-[#FFFFFF99] w-fit'>Already have an account?</p>
                <div className='flex items-center gap-1'>
                    <Link href="/login" className='text-[#FFE500] text-sm'>Login</Link>
                    <FaArrow className='w-[10px] h-[10px] mt-1 text-[#FFE500]' />
                </div>
            </div>
        </div>
    );
};

export default GoogleSignUp;
