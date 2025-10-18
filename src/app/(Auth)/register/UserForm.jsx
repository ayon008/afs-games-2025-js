'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import Swal from 'sweetalert2';
import useAuth from '@/Hooks/useAuth';
import { useRouter } from 'next/navigation';
import countries from '@/js/countries';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import uploadPdfToFirebase from '@/js/uploadPdf';
import sendDataToWebhook from '@/js/kalviyoSubscribe';
import FaArrow from '@/icons/FaArrow';

const UserForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const userInfo = useAuth();
    const { createAccount, updatedProfile, reauthenticateAndDelete, logOut, user } = userInfo;
    const router = useRouter();
    const axiosPublic = useAxiosPublic();


    const onSubmit = async (data) => {
        // Show loading indicator
        Swal.fire({
            title: "Creating an account...",
            text: 'Please wait while we create your account',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        const { name, surName, city, pays, AfsGear, age, team } = data;
        const invoice = AfsGear[0];
        let email = '';
        let password = '';
        let categories;
        const invoiceURL = await uploadPdfToFirebase(invoice)
        // Ensure localStorage is accessed on the client side only
        if (typeof window !== "undefined") {
            email = JSON.parse(localStorage.getItem('email'));
            password = JSON.parse(localStorage.getItem('password'));
            categories = JSON.parse(localStorage.getItem('categories'));
        }

        if (!email || !password || !categories) {
            Swal.fire({
                title: 'Error',
                text: `${email, password, categories, invoice}`,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#FFE500',
            });
            return;
        }

        try {
            const result = await createAccount(email, password);
            const user = result.user;
            // Update user profile
            await updatedProfile(name, user?.photoURL);
            try {

                const response2 = await fetch('/api/klaviyo/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, name, surName, pays }),
                });
                const data2 = await response2.json();
                console.log(data2);


                const userData = { name, surName, city, pays, age, team, ...user, invoiceURL, ...categories, approved: false };
                await axiosPublic.post('/user', userData);

            }
            catch (error) {
                console.log(error.message);
                axiosPublic.delete(`/user/${user?.uid}`);
                reauthenticateAndDelete(user, password);
                Swal.fire({
                    title: 'Error',
                    text: error.code?.split('auth/')[1],
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#FFE500',
                });
                return;
            }
            // Clear sensitive data from localStorage
            if (typeof window !== "undefined") {
                localStorage.removeItem('password');
                localStorage.removeItem('email');
                localStorage.removeItem('categories');
            }
            // Success feedback
            Swal.fire({
                title: 'Account Created',
                text: 'Your account has been created successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#FFE500',
            }).then(() => {
                logOut();
                router.push('/login');
            });
        } catch (error) {
            // Error feedback
            console.log(error.message);

            Swal.fire({
                title: 'Error',
                text: `Error during account creation: ${error.code?.split('auth/')[1]}`,
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#FFE500',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="relative card-body 2xl:space-y-2 xl:space-y-[1px] bg-[#111] rounded-lg xl:py-2">
            <span className='text-gray-500 absolute right-3 top-1 cursor-pointer'>
                <Link href={'/'}>X</Link>
            </span>
            <span className='text-gray-500 absolute left-2 top-1 cursor-pointer' onClick={() => router.back()}>
                <FaArrowLeft />
            </span>
            <div className="text-white text-center">
                <h3 className="font-semibold 2xl:text-[20px] xl:text-base tracking-wide">Create Your Account</h3>
                <h5 className="2xl:text-base xl:text-xs tracking-wide text-[#FFFFFF99]">Your name will be seen in the leaderboard</h5>
            </div>

            <div className='grid grid-cols-2 gap-2'>
                {/* Name Field */}
                <div className="form-control relative">
                    <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Name"
                        className="input input-bordered border-2 border-[#666] bg-[#1F1F1F] text-white xl:h-[40px]"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Surname Field */}
                <div className="form-control relative">
                    <input
                        type="text"
                        {...register('surName', { required: 'Surname is required' })}
                        placeholder="Surname"
                        className="input input-bordered border-2 border-[#666] bg-[#1F1F1F] text-white xl:h-[40px]"
                    />
                    {errors.surName && <p className="text-red-500 text-xs mt-1">{errors.surName.message}</p>}
                </div>

                {/* City Field */}
                <div className="form-control relative">
                    <input
                        type="text"
                        {...register('city', { required: 'city is required' })}
                        placeholder="City"
                        className="input input-bordered border-2 border-[#666] bg-[#1F1F1F] text-white xl:h-[40px]"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                </div>
                {/* Affiliation/Team */}
                <div className="form-control relative">
                    <label className="label p-0 mb-1 flex items-center gap-2 absolute top-1/2 -translate-y-1/2 right-2">
                        <span className="relative group inline-block">
                            <span className="w-4 h-4 rounded-full bg-[#FFE500] text-black text-[10px] font-bold flex items-center justify-center">?</span>
                            <span className="absolute left-1/2 -translate-x-1/2 -top-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">Please indicate if you are affiliated with a club association, or school</span>
                        </span>
                    </label>
                    <input
                        type="text"
                        {...register('team', { required: false })}
                        placeholder="Affiliation/Team"
                        className="input input-bordered border-2 border-[#666] bg-[#1F1F1F] text-white xl:h-[40px]"
                    />
                </div>
            </div>
            <div className="form-control relative">
                <input
                    type="text"
                    {...register('age', { required: 'age is required' })}
                    placeholder="Age"
                    className="input input-bordered border-2 border-[#666] bg-[#1F1F1F] text-white xl:h-[40px]"
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
            </div>
            {/* Pays/Country Field */}
            <div className="form-control relative xl:h-[40px]">
                <select
                    {...register('pays', { required: 'Country is required' })}
                    className="select select-bordered border-2 border-[#666] bg-[#1F1F1F] text-white"
                >
                    <option disabled selected className='text-[#666]'>Country</option>
                    {
                        countries?.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))
                    }
                </select>
                {errors.Pays && <p className="text-red-500 text-xs mt-1">{errors.Pays.message}</p>}
            </div>


            {/* AfsGear Field */}
            <div className="form-control relative">
                <label className="label text-white text-xs flex items-center gap-2">Upload Your Afs gear (invoice)
                    <span className="relative group inline-block">
                        <span className="w-4 h-4 rounded-full bg-[#FFE500] text-black text-[10px] font-bold flex items-center justify-center">?</span>
                        <span className="absolute left-1/2 -translate-x-1/2 -top-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">You csn upload your invoice later in your profile</span>
                    </span>
                </label>
                <input
                    type="file"
                    {...register('AfsGear', {
                        validate: {
                            isPdf: (files) => {
                                // Only validate if a file is selected
                                if (!files || files.length === 0) return true;
                                // Check if the selected file is a PDF
                                return files[0]?.type === "application/pdf" || 'Only PDF files are allowed';
                            },
                        },
                    })}
                    className="file-input border-2 border-[#666] bg-[#1F1F1F] text-white xl:h-[40px]"
                    accept="application/pdf" // Only PDF files are allowed
                />
                {errors.AfsGear && <span className="text-red-500 text-xs mt-1">{errors.AfsGear.message}</span>}
            </div>


            {/* Checkbox Fields */}
            <div className="form-control p-0">
                <label className="cursor-pointer label">
                    <span className="label-text text-white text-xs">I agree to participate in the AFS Games and to receive communications related to the event.</span>
                    <input type="checkbox" {...register('agree', { required: 'You must agree to participate' })} className="checkbox checkbox-warning w-[10px] h-[10px]" />
                </label>
                {errors.agree && <p className="text-red-500 text-xs mt-1">{errors.agree.message}</p>}
            </div>

            <div className="form-control p-0">
                <label className="cursor-pointer label">
                    <span className="label-text text-white text-xs">I certify that I own and will use my AFS foil for the competition. (Proof will be required later).</span>
                    <input type="checkbox" {...register('certify', { required: 'You must certify this' })} className="checkbox checkbox-warning w-[10px] h-[10px]" />
                </label>
                {errors.certify && <p className="text-red-500 text-xs mt-1">{errors.certify.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="form-control">
                <button type="submit" className="btn bg-[#FFE500] xl:text-xs p-1 border-none text-black">CREATE ACCOUNT</button>
            </div>

            {/* Footer */}
            <div className="flex items-center w-fit mx-auto gap-2">
                <p className="text-sm text-[#FFFFFF99]">Already have an account?</p>
                <div className='flex items-center gap-1'>
                    <Link href="/login" className='text-[#FFE500] text-sm'>Login</Link>
                    <FaArrow className='w-[10px] h-[10px] mt-1 text-[#FFE500]' />
                </div>
            </div>
        </form>
    );
};

export default UserForm;
