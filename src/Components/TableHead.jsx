import React from 'react';

const TableHead = ({ tableHead, profile }) => {
    return (
        <thead>
            <tr>
                {
                    tableHead?.map((head, index) => (
                        <th className={`${head === 'Total Time' ? 'text-right' : 'text-left'} ${profile ? 'text-white' : 'text-black'} font-semibold 2xl:text-lg xl:text-sm text-xs border-b-[1px] border-[#00000033] `} key={index}>{head === 'Surffoil' ? 'Prone Foil' : head === 'DW' ? 'Downwind' : head}</th>
                    ))
                }
            </tr>
        </thead>
    );
};

export default TableHead;