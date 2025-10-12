/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
// components/SponsorPic.js
'use client';

import Image from 'next/image';
import React, { useState, forwardRef } from 'react';
import axios from 'axios';
import image from '@/../public/image_wrap.png';

const SponsorPic = forwardRef(({ onChange, onBlur, name, ...props }, ref) => {
    const [error, setError] = useState('');
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxFileSize = 2 * 1024 * 1024; // 2MB in bytes
    const imgbbApiKey = "9a38563b80c5197bc652b9f720cb5b06"; // Replace with your Imgbb API key
    const [uploadedImage, setUploadedImage] = useState('');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && allowedTypes.includes(file.type)) {
            if (file.size <= maxFileSize) {
                setError('');

                try {
                    const formData = new FormData();
                    formData.append('image', file);

                    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                        params: { key: imgbbApiKey }
                    });

                    if (response.data && response.data.data && response.data.data.url) {
                        setUploadedImage(response.data.data.url);

                        const customEvent = {
                            target: { name, value: response.data.data.url }
                        };

                        if (onChange) {
                            onChange(customEvent);
                        }
                    }
                } catch (uploadError) {
                    setError('Failed to upload the image. Please try again.');
                    console.error(uploadError);
                }
            } else {
                setError('File size must be less than 2MB.');
            }
        } else {
            setError('Please select a valid image file (.jpg, .jpeg, .png, .webp).');
        }
    };

    return (
        <>
            <div className='w-fit'>
                <input
                    type="file"
                    id={name}
                    className="hidden"
                    onChange={handleFileChange}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                    {...props}
                />
                <label htmlFor={name} className="cursor-pointer relative">
                    <img src={uploadedImage} className='w-[100px] h-[100px] rounded-[50%]' alt='' />
                    <Image src={image} alt='profile' className='absolute z-20 top-0' />
                </label>

            </div>
            {error && <p className="mt-2 text-red-500">{error}</p>}
        </>
    );
});

export default SponsorPic;
