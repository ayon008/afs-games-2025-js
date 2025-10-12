'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaCheck, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import FaArrow from '@/icons/FaArrow';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const SignUp = () => {

    const [email, setEmail] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            email: email
        }
    });

    useEffect(() => {
        // Only run this code on the client side
        if (typeof window !== 'undefined') {
            const email = JSON.parse(localStorage.getItem('email')) || '';
            setEmail(email);
            reset({
                email: email
            });
        }
    }, [reset]);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            Swal.fire({
                title: 'Error',
                text: 'Passwords do not match',
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#FFE500',
            });
            return;
        }
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem('email', JSON.stringify(data.email));
                localStorage.setItem('password', JSON.stringify(data.password));
            }
            router.push('usercredentials/categories');
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Sign-up failed: ' + error.message,
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#FFE500',
            });
        }
    };

    return (
        <div className='xl:w-1/3 2xl:w-1/2 w-[90%] mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-[1px] bg-[#111] rounded-lg relative">
                <span className='text-gray-500 absolute right-3 top-1 cursor-pointer'>
                    <Link href={'/'}>X</Link>
                </span>
                <span className='text-gray-500 absolute left-2 top-1 cursor-pointer' onClick={() => router.back()}>
                    <FaArrowLeft className='' />
                </span>
                <div className='text-white text-center'>
                    <h3 className='font-semibold 2xl:text-[28px] xl:text-2xl text-lg'>Create Your Account</h3>
                    <h5 className='2xl:text-base xl:text-sm text-[10px] 2xl:mb-2 xl:mb-2 mb-1 tracking-wide text-[#FFFFFF99]'>Set your password to continue</h5>
                </div>
                <div className="form-control relative">
                    <label className="label items-center justify-normal bg-[#111] px-2 w-fit h-fit py-0 rounded-3xl gap-1 absolute left-[12px] -top-[10px]">
                        <span className="label-text text-[#666] text-sm font-semibold py-0">EMAIL</span>
                        <span><FaCheck size={'0.85rem'} color='#2A7029' /></span>
                    </label>
                    <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        placeholder="emmma_s@email.com"
                        className="input input-bordered border-2 border-[#666] bg-[#111] text-white Alliance"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div className="form-control relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters long',
                            }
                        })}
                        placeholder="Password"
                        className="input input-bordered border-2 border-[#666] bg-[#111] text-white Alliance"
                    />
                    <span
                        className='text-[#999999] absolute right-4 top-1/2 cursor-pointer'
                        style={{ transform: "translateY(-50%)" }}
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <div className="form-control relative">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword', { required: 'Please confirm your password' })}
                        placeholder="Repeat password"
                        className="input input-bordered border-2 border-[#666] bg-[#111] text-white Alliance"
                    />
                    <span
                        className='text-[#999999] absolute right-4 top-1/2 cursor-pointer'
                        style={{ transform: "translateY(-50%)" }}
                        onClick={() => setShowConfirmPassword(prev => !prev)}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>
                <div className="form-control">
                    <button type="submit" className="btn bg-[#FFE500] border-none text-white Alliance">CONTINUE</button>
                </div>
                <div className='flex items-center w-fit mx-auto gap-2'>
                    <p className='text-sm text-[#FFFFFF99]'>Already have an account?</p>
                    <div className='flex items-baseline gap-1'>
                        <p><Link href={"/login"} className='text-[#FFE500] text-sm'>Log In</Link></p>
                        <FaArrow className={'w-[10px] h-[10px]'} />
                    </div>
                </div>
            </form>
            <p className={`text-[#FFFFFF99] text-center Alliance 2xl:text-lg lg:text-base mt-2`}>
                By signing up, I confirm that I have read and accepted Foil&Co.’s
                <span className='text-[#FFE500]'> Terms & Conditions</span> and
                <span className='text-[#FFE500]'> Privacy Policy</span>.
            </p>
        </div>

    );
};

export default SignUp;
