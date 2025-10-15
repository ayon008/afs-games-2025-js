"use client"
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import React from 'react';

const Page = () => {
    const axiosPublic = useAxiosPublic();
    const handleDelete = () => {
        const response = axiosPublic.delete("/gpxData");
        console.log(response);

    }
    return (
        <div className='pt-[140px]'>
            <button onClick={() => handleDelete()} className='btn btn-outline text-white'>
                Delete
            </button>
        </div>
    );
};

export default Page;