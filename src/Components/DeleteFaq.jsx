'use client'
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const DeleteFaq = ({ id }) => {
    const axiosSecure = useAxiosSecure();
    const handleDelete = (id) => {
        // Show confirmation dialog before deleting
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete this FAQ? This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#FFE500',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Show loading state
                Swal.fire({
                    title: 'Deleting...',
                    text: 'Please wait while the FAQ is being deleted.',
                    icon: 'info',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });

                // Perform delete operation
                axiosSecure.delete(`/faq/${id}`)
                    .then((response) => {
                        // Close the loading state and show success message
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'The FAQ has been deleted successfully.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        });
                    })
                    .catch((error) => {
                        // Close the loading state and show error message
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to delete the FAQ. Please try again.',
                            icon: 'error',
                            confirmButtonText: 'OK',
                        });
                    });
            }
        });
    };
    return (
        <FaTrash onClick={() => handleDelete(id)} color={'red'} size={'2rem'} className="icon icon-minus hidden" />
    );
};

export default DeleteFaq;