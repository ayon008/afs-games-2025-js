import React from "react";
import PilerCard from "@/Components/PilerCard";

const stages = [
    {
        stage: "01",
        heures: "02",
        note: 'Accessible et motivant. assuré de passer 1 palier',
        description: "Environ 1 ou 2 sessions dans la semaine",
        points: 500,
        bgColor: "bg-neutral-700",
        maxHeight: "360px",
        minHeight: '240px'
    },
    {
        stage: "02",
        heures: "06",
        description: "Environ 1 ou 2 semaines de challeng",
        points: 1000,
        bgColor: "bg-zinc-800",
        maxHeight: "400px",
        minHeight: '280px',
    },
    {
        stage: "03",
        heures: "10",
        description: "Environ 2 ou 3 semaines de challenge",
        points: 1500,
        bgColor: "bg-neutral-800",
        maxHeight: "440px",
        minHeight: '320px'
    },
    {
        stage: "04",
        heures: "15",
        description: "Environ 3 ou 4 semaines de challenge",
        points: 2000,
        bgColor: "bg-zinc-900",
        maxHeight: "480px",
        minHeight: '360px'
    },
    {
        stage: "05",
        heures: "20",
        description: "Environ 4 ou 5 semaines de challenge",
        points: 3000,
        bgColor: "bg-stone-950",
        maxHeight: "520px",
        minHeight: '400px'
    }
];

const Cards = () => {
    return (
        <div className="flex 2xl:flex-nowrap xl:flex-nowrap items-end 2xl:gap-5 xl:gap-3">
            {stages.map((stage) => (
                <PilerCard key={stage.stage} {...stage} />
            ))}
        </div>
    );
};

export default Cards;