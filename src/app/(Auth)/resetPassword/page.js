'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import useAuth from '@/Hooks/useAuth';
import { FaEye } from 'react-icons/fa';

const ResetPassword = ({ searchParams }) => {
    const code = searchParams?.oobCode;
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
    const { verifyPassword } = useAuth();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    // Show/hide password toggle
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const onSubmit = async (data) => {
        const { password } = data;
        try {
            verifyPassword(code, password)
            Swal.fire({
                icon: 'success',
                title: 'Password reset successful!',
                showConfirmButton: false,
                timer: 1500,
            });
            router.push('/login'); // Redirect to login page after successful reset
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
                <h2 className="text-white text-center 2xl:text-[28px] xl:text-2xl text-lg mb-4">Reset Password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* New Password Field */}
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
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="form-control">
                        <input
                            type="submit"
                            className="btn bg-[#FFE500] text-white border-none"
                            value={isSubmitting ? 'Resetting...' : 'Reset Password'}
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
