'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '@/Hooks/useAuth';

const Page = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
    const { changePassword } = useAuth();
    const onSubmit = async (data) => {
        const { email } = data;
        try {
            changePassword(email)
            Swal.fire({
                icon: 'success',
                title: 'The email has been sent successfully, please check your email',
                showConfirmButton: false,
                timer: 1500,
            });

            reset();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Reset failed!',
                text: error.message,
            });
        }
    };

    return (
        <div className="xl:w-1/3 2xl:w-1/2 w-[90%] mx-auto">
            <div className="bg-[#111] rounded-lg p-8">
                <h2 className="text-white text-center 2xl:text-[28px] xl:text-2xl text-lg mb-4">Enter your email</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* New Password Field */}
                    <div className="form-control relative">
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            placeholder="Email Address"
                            className="input input-bordered border-2 border-[#666] bg-[#1F1F1F] text-white"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    {/* Submit Button */}
                    <div className="form-control">
                        <input
                            type="submit"
                            className="btn text-[#FFE500] border-none"
                            value={isSubmitting ? 'Resetting...' : 'Reset Password'}
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
