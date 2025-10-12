'use client'
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import GetCountDown from '@/lib/GetCountdown';
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Page = () => {

    const axiosSecure = useAxiosSecure();
    const { date, refetch } = GetCountDown();

    console.log(date);

    const handleDate = event => {
        event.preventDefault();

        // Get the date value
        const dateValue = event.target.date.value;
        console.log(dateValue);

        // Display loading Swal before sending the request
        Swal.fire({
            title: 'Submitting...',
            text: 'Please wait while we process your request.',
            allowOutsideClick: false, // Disable outside clicks while loading
            didOpen: () => {
                Swal.showLoading(); // Show the loading spinner
            }
        });

        // Make a PATCH request using axiosSecure
        axiosSecure.patch('/targetedDate/67067fa3adad600b40fda96c', { date: dateValue })
            .then(response => {
                // Close the loading Swal
                Swal.close();

                // Show success response
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Date has been successfully submitted.',
                    confirmButtonText: 'OK'
                });
                refetch();
            })
            .catch(error => {
                // Close the loading Swal
                Swal.close();

                // Error handling
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'There was an issue submitting the date.',
                    confirmButtonText: 'Try Again'
                });
            });

        // Reset the form after submission
        event.target.reset();
    };


    const handleBlock = event => {
        event.preventDefault();

        // Get the date value
        const dateValue = event.target.date.value;
        const message = event.target.message.value;

        // Display loading Swal before sending the request
        Swal.fire({
            title: 'Submitting...',
            text: 'Please wait while we process your request.',
            allowOutsideClick: false, // Disable outside clicks while loading
            didOpen: () => {
                Swal.showLoading(); // Show the loading spinner
            }
        });

        // Make a PATCH request using axiosSecure
        axiosSecure.patch('/targetedDate/6706bdd4a8317f059a67151a', { date: dateValue, message: message })
            .then(response => {
                // Close the loading Swal
                Swal.close();

                // Show success response
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Date has been successfully submitted.',
                    confirmButtonText: 'OK'
                });
                refetch();
            })
            .catch(error => {
                // Close the loading Swal
                Swal.close();

                // Error handling
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'There was an issue submitting the date.',
                    confirmButtonText: 'Try Again'
                });
            });

        // Reset the form after submission
        event.target.reset();
    }


    return (
        <div className="p-10">
            <h3 className="text-center font-semibold text-3xl">Manage Events</h3>
            <p className="text-left mt-6 text-lg font-semibold inter">CountDown</p>
            {/* Countdown Input */}
            <form onSubmit={handleDate} >
                <div className="form-control relative mt-6 w-1/4">
                    <label className="label items-center justify-normal bg-white w-fit h-fit py-0 gap-1 absolute left-[12px] -top-[10px]">
                        <span className="label-text text-[#666] text-sm font-semibold py-0">CountDown Date</span>
                        <FaCheck size={'0.85rem'} color='#2A7029' />
                    </label>
                    <input
                        type="date"
                        name="date"
                        className={`input input-bordered border-2 border-[#666] bg-white text-black Alliance`}
                        required
                    />
                </div>
                <input className="btn bg-green-500 text-white mt-3" type="submit" />
            </form>
            <p className="mt-6">{date?.date}</p>
            <form onSubmit={handleBlock}>
                <div className="form-control relative mt-10 w-1/4">
                    <label className="label items-center justify-normal bg-white w-fit h-fit py-0 gap-1 absolute left-[12px] -top-[10px]">
                        <span className="label-text text-[#666] text-sm font-semibold py-0">Block Date</span>
                        <FaCheck size={'0.85rem'} color='#2A7029' />
                    </label>

                    <input
                        type="date"
                        name="date"
                        className={`input input-bordered border-2 border-[#666] bg-white text-black Alliance`}
                        required
                    />

                    <textarea
                        type="text"
                        name="message"
                        className={`textarea textarea-bordered mt-6 border-2 border-[#666] bg-white text-black Alliance`}
                        required
                    />
                </div>

                <input className="btn bg-green-500 text-white mt-3" type="submit" />
            </form>
        </div>
    );
};

export default Page;