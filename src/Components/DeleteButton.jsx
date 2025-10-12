'use client'
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import React from 'react';
import Swal from 'sweetalert2';

const DeleteButton = ({ id, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        axiosSecure.delete(`/sponsors/${id}`)
            .then(res => {
                if (res) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Deleted',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    refetch(); // Refetch data after successful deletion
                }
            })
    }

    return (
        <button onClick={() => handleDelete(id)} className='btn btn-outline text-red-600 hover:bg-red-600 hover:text-white'>
            Delete
        </button>
    );
};

export default DeleteButton;