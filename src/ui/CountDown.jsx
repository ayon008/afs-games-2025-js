'use client';
import GetCountDown from '@/lib/GetCountdown';
import Countdown from 'react-countdown';
import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const { date } = GetCountDown(); // Fetch the date from your custom hook
    const [targetDate, setTargetData] = useState(null); // Set initial state to null

    // Log the date to verify it's correct
    console.log(date?.date,'date');

    useEffect(() => {
        if (date?.date) {
            // Create a timestamp for the target date with a time of 08:00:00
            const targetTimestamp = new Date(`${date.date}T08:00:00`).getTime();
            setTargetData(targetTimestamp); // Set the timestamp to the state
        }
    }, [date?.date]);

    // Log the targetDate to debug
    console.log(targetDate);

    // Renderer to customize the countdown display
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // What to render when the countdown completes
            return (
                <div className=''>
                    <div className='text-white'>
                        <span className='2xl:text-[220px] xl:text-[170px] text-6xl font-semibold'>
                            00 :
                        </span>
                        <span className='2xl:text-[220px] xl:text-[170px] text-6xl font-semibold'> 00 : </span>
                        <span className='2xl:text-[220px] xl:text-[170px] text-6xl font-semibold'> 00</span>
                    </div>
                    <div className='flex justify-between'>
                        <p className='2xl:text-6xl xl:text-4xl text-xl text-white mt-10'>Days</p>
                        <p className='2xl:text-6xl xl:text-4xl text-xl text-white mt-10'>Hours</p>
                        <p className='2xl:text-6xl xl:text-4xl text-xl text-white mt-10'>Minutes</p>
                    </div>
                </div>
            );
        } else {
            // Render the countdown
            return (
                <div className=''>
                    <div className='text-white'>
                        <span className='2xl:text-[220px] xl:text-[170px] text-6xl font-semibold'>
                            {days} :
                        </span>
                        <span className='2xl:text-[220px] xl:text-[170px] text-6xl font-semibold'> {hours} : </span>
                        <span className='2xl:text-[220px] xl:text-[170px] text-6xl font-semibold'> {minutes}</span>
                    </div>
                    <div className='flex justify-between'>
                        <p className='2xl:text-6xl xl:text-4xl text-xl text-white mt-10'>Days</p>
                        <p className='2xl:text-6xl xl:text-4xl text-xl text-white mt-10'>Hours</p>
                        <p className='2xl:text-6xl xl:text-4xl text-xl text-white mt-10'>Minutes</p>
                    </div>
                </div>
            );
        }
    };

    // Only render the Countdown if targetDate is available
    return (
        <div>
            {targetDate ? <Countdown date={targetDate} renderer={renderer} /> : <p className="text-center text-white text-3xl">Loading...</p>}
        </div>
    );
};

export default CountdownTimer;
