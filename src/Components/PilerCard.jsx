import { antiHero } from "@/app/(Main)/layout";
import React from "react";

const PilerCard = ({ stage, heures, description, points, bgColor, minHeight, maxHeight, note, KM }) => {
    return (
        <section
            className={`flex flex-col flex-1 shrink justify-between 2xl:p-4 xl:p-4 rounded-xl basis-0 ${bgColor}`}
            style={{ maxHeight, minHeight: minHeight }} // Apply height and maxHeight as inline styles
        >
            <header className="2xl:text-base xl:text-xs font-semibold tracking-normal leading-none uppercase text-white">
                palier <span className={`${antiHero.className} text-[#FFE500]`}>{stage}.</span>
            </header>
            <div className="flex flex-col mt-auto w-full max-md:mt-10">
                <div className="flex flex-col w-full">
                    <div className="flex justify-center w-full whitespace-nowrap">
                        <h2 className="my-auto 2xl:text-6xl font-medium tracking-tighter leading-none text-white uppercase xl:text-4xl">
                            {heures}
                        </h2>
                        <span className="flex-1 shrink 2xl:text-base xl:text-sm font-semibold leading-6 basis-0 text-white">
                            {KM || 'heure'}
                        </span>
                    </div>
                    <p className="text-opacity-60 text-white 2xl:text-xs xl:text-[10px]">{note}</p>
                    <p className="2xl:text-sm font-semibold xl:text-xs leading-5 text-white text-opacity-70 uppercase">{description}</p>
                </div>
                <footer className="gap-5 text-center self-stretch 2xl:pt-4 xl:pt-2 2xl:mt-4 xl:mt-2 w-full 2xl:text-base xl:text-sm font-semibold leading-none text-amber-400 uppercase border-t border-solid border-t-white">
                    {points} points
                </footer>
            </div>
        </section>
    );
};

export default PilerCard;
