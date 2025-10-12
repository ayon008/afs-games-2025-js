import PilerCard from '@/Components/PilerCard';
import React from 'react';

const CardsByDistance = () => {
    const tierData = [
        {
            stage: '01',
            // tier
            heures: '20',
            // Kilometers
            description: 'environ 1 ou 2 sessions',
            // sessions
            points: '500',
            bgColor: 'bg-neutral-700',
            maxHeight: "360px",
            minHeight: '240px',
        },
        {
            stage: '02',
            // tier
            heures: '50',
            // Kilometers
            description: 'environ 3 à 5 sessions',
            // sessions
            points: '1000',
            bgColor: 'bg-zinc-800',
            maxHeight: "400px",
            minHeight: '280px',
        },
        {
            stage: '03',
            // tier
            heures: '150',
            // Kilometers
            description: 'environ 2 semaines de challenge',
            // sessions
            points: '1500',
            bgColor: 'bg-stone-900',
            maxHeight: "440px",
            minHeight: '320px'
        },
        {
            stage: '04',
            // tier
            heures: '250',
            // Kilometers
            description: 'environ 3 semaines de challenge',
            // sessions
            points: '2000',
            bgColor: 'bg-neutral-900',
            maxHeight: "480px",
            minHeight: '360px'
        },
        {
            stage: '05',
            // tier
            heures: '300',
            // Kilometers
            description: 'environ 4 à 5 semaines de challenge',
            // sessions
            points: '3000',
            bgColor: 'bg-black',
            maxHeight: "520px",
            minHeight: '400px'
        }
    ];
    return (
        <div className="flex 2xl:flex-nowrap w-full xl:flex-nowrap items-end 2xl:gap-5 xl:gap-3">
            {tierData.map((stage) => (
                <PilerCard key={stage.stage} {...stage} KM={'KM'} />
            ))}
        </div>
    );
};

export default CardsByDistance;