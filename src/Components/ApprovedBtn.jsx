'use client'
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import React from 'react';
import Swal from 'sweetalert2';


const ApprovedBtn = ({ id, refetch }) => {
    


    return (
        <button onClick={() => handleClick(id)} className='btn btn-outline text-green-500 hover:text-white hover:bg-green-500'>
            Accept
        </button>
    );
};

export default ApprovedBtn;