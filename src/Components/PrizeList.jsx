'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAxiosPublic from '@/Hooks/useAxiosPublic';

const PrizeList = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        try {
            // Check if an image file is selected
            if (data.image && data.image[0]) {
                // Prepare FormData to send the image
                const formData = new FormData();
                formData.append('image', data.image[0]);

                // Upload the image to ImgBB
                const response = await axiosPublic.post('https://api.imgbb.com/1/upload', formData, {
                    params: {
                        key: "9a38563b80c5197bc652b9f720cb5b06"  // Replace with your ImgBB API key
                    }
                });

                // Get the URL from the response
                const imageUrl = response.data.data.url;
                data.imageUrl = imageUrl;

                // Optionally, you can set the image URL to a form field or state
                setValue('imageUrl', imageUrl);
            }

            // Process other form data
            console.log(data);

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <div>
                <h3 className='text-2xl font-semibold text-center'>Prize List</h3>
                <p className='text-xs text-center font-semibold mt-2'>Manage Prize List</p>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-3 gap-2 mt-16'>
                        {/* Other form fields */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Category</span>
                            </div>
                            <select
                                className="select select-bordered w-full"
                                {...register('category', { required: 'Category is required' })}
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="Wingfoil">Wingfoil</option>
                                <option value="Windfoil">Windfoil</option>
                                <option value="Dockstart">Dockstart</option>
                                <option value="Surffoil">Surffoil</option>
                                <option value="DW">DW</option>
                                <option value="Watermen Crown">Watermen Crown</option>
                            </select>
                            {errors.category && <span className="text-red-500">{errors.category.message}</span>}
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Position</span>
                            </div>
                            <select
                                className="select select-bordered w-full"
                                {...register('position', { required: 'Position is required' })}
                            >
                                <option value="" disabled>Select Position</option>
                                <option value="1st">1st</option>
                                <option value="2nd">2nd</option>
                                <option value="3rd">3rd</option>
                            </select>
                            {errors.position && <span className="text-red-500">{errors.position.message}</span>}
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                {...register('priceName', { required: 'Price Name is required' })}
                            />
                            {errors.priceName && <span className="text-red-500">{errors.priceName.message}</span>}
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Prize Image</span>
                            </div>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full"
                                {...register('image')}
                            />
                        </label>
                    </div>
                    <input
                        type='submit'
                        value='Save'
                        className='mt-6 btn btn-outline text-blue-400'
                    />
                </form>
            </div>
        </div>
    );
};

export default PrizeList;
