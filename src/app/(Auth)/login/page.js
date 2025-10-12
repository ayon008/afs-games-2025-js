'use client'
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '@/Hooks/useAuth';
import FaArrow from '@/icons/FaArrow';
import Google from '@/icons/Google';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import useAxiosSecure from '@/Hooks/useAxiosSecure';

const Page = ({ searchParams }) => {

    const { message, redirect } = searchParams;
    const { register, handleSubmit, formState: { errors }, reset, isSubmitting } = useForm();
    const { signIn, createWithGoogle } = useAuth();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const axiosSecure = useAxiosSecure();

    // Show/hide password toggle
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const onSubmit = async (data) => {
        try {
            const { email, password } = data;
            await signIn(email, password);
            Swal.fire({
                title: 'Success!',
                text: 'Your action has been successfully completed.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            if (redirect) {
                return router.push('/');
            }
            return router.push('/')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Connection failed!',
                text: error.code?.split('auth/')[1],
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await createWithGoogle();
            const user = result.user;
            axiosSecure.get(`/user/${user?.uid}`)
                .then(response => {
                    console.log(response);
                    if (redirect) {
                        return router.push('/');
                    }
                    return router.push('/')
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
                title: 'Google connection failed!',
                text: error.code?.split('auth/')[1],
            });
        }
    };


    return (
        <div className='xl:w-1/3 2xl:w-1/2 w-[90%] mx-auto'>
            <div className='bg-[#111] rounded-lg relative'>
                <span className='text-gray-500 absolute right-4 top-2'>
                    <Link href={'/'}>X</Link>
                </span>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-[1px]">
                    <div className='text-white text-center'>
                        <p className={`${message ? 'block' : 'hidden'} text-red-600 font-semibold`}>{message}</p>
                        <h3 className='font-semibold 2xl:text-[28px] xl:text-2xl text-lg tracking-wide'>Sign in</h3>
                        <h5 className='2xl:text-base xl:text-sm text-[10px] 2xl:mb-2 xl:mb-2 mb-1 tracking-wide text-[#FFFFFF99]'>Add your own records for everyone to see</h5>
                    </div>
                    {/* Email Field */}
                    <div className="form-control relative">
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            placeholder="Email Address"
                            className="input input-bordered border-2 border-[#666] bg-[#1F1F1F] text-white"
                        />
                    </div>
                    {errors.email && <p className="text-red-500 2xl:text-xs xl:text-xs text-[8px] mt-1">{errors?.email?.message}</p>}

                    {/* Password Field */}
                    <div className="form-control relative mb-0">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', { required: 'Password is required' })}
                            placeholder="Password"
                            className="input input-bordered border-2 border-[#666] bg-[#1F1F1F] text-white"
                        />
                        <FaEye
                            className='text-[#999999] absolute right-4 top-1/2 bottom-1/2 cursor-pointer'
                            onClick={togglePasswordVisibility}
                            style={{ transform: "translateY(-50%)" }}
                        />
                    </div>
                    {errors.password && <p className="text-red-500 2xl:text-xs xl:text-xs text-[8px] mt-1">{errors?.password?.message}</p>}

                    <div className='flex items-center gap-1'>
                        <p className='w-fit flex-grow-0'>
                            <span
                                className='text-[#FFE500] 2xl:text-sm xl:text-sm text-xs  cursor-pointer'
                                onClick={() => router.push('/forgotPassword')}
                            >
                                Forget your password?
                            </span>
                        </p>
                        <FaArrow className={'h-[10px] w-[10px] mt-1'} />
                    </div>
                    {/* Google Sign-In */}

                    {/* Submit Button */}
                    <div className="form-control">
                        <input
                            type="submit"
                            className="btn bg-[#FFE500] border-none text-white"
                            value={isSubmitting ? 'Logging in...' : 'CONTINUE'}
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Sign Up Link */}
                    <div className='flex items-center w-fit mx-auto gap-2'>
                        <p className='text-sm text-[#FFFFFF99]'>Need an account?</p>
                        <div className='flex items-baseline gap-1'>
                            <p><Link href={"/register"} className='text-[#FFE500] text-sm'>Create account</Link></p>
                            <FaArrow className={'h-[10px] w-[10px] mt-1'} />
                        </div>
                    </div>
                </form>
            </div>
            <p className={`text-[#FFFFFF99] text-center Alliance 2xl:text-lg lg:text-base mt-2`}>
                By signing up, I confirm that I have read and accepted Foil&Co.’s
                <span className='text-[#FFE500]'> Terms & Conditions</span> and
                <span className='text-[#FFE500]'> Privacy Policy</span>.
            </p>
        </div>
    );
};

export default Page;
