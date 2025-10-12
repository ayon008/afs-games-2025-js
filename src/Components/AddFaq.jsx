'use client'
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddFaq = () => {
    // Initialize React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    // Function to handle form submission
    const onSubmit = (data) => {
        // Show loading state
        Swal.fire({
            title: 'Soumettre...',
            text: 'Veuillez patienter pendant que nous soumettons vos données.',
            icon: 'info',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        // Submit the form data using Axios
        axiosSecure.post('/faq', data)
            .then((response) => {
                // Close the loading state and show success message
                Swal.fire({
                    title: 'Success!',
                    text: 'FAQ has been successfully added.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            })
            .catch((error) => {
                // Close the loading state and show error message
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add FAQ. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 justify-center items-center gap-2'>
                    {/* Category Field */}
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Category</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            className={`input input-bordered w-full ${errors.category ? 'border-red-500' : ''}`}
                            {...register('category', { required: 'Category is required' })}
                        />
                        {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
                    </label>

                    {/* Title Field */}
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Title</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            className={`input input-bordered w-full ${errors.title ? 'border-red-500' : ''}`}
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                    </label>

                    {/* Description Field */}
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        {/* Use textarea to allow multiline input and links */}
                        <textarea
                            placeholder="Type here and add links (e.g. <a href='https://example.com'>Link</a>)"
                            className={`textarea textarea-bordered w-full ${errors.description ? 'border-red-500' : ''}`}
                            {...register('description', { required: 'Description is required' })}
                            rows="5" // Set appropriate height for the textarea
                        />
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                    </label>
                </div>

                {/* Submit Button */}
                <div className='w-fit mx-auto my-10'>
                    <button type='submit' className='btn btn-outline text-[#FFE500]'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddFaq;
