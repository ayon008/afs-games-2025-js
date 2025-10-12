import React from 'react';

const FaArrow = ({ className, color }) => {
    return (
        <svg color='black' xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 14 14" fill="none">
            <path d="M12 2L2 12M12 2H3M12 2V11" stroke={color} strokeWidth="2" />
        </svg>
    );
};

export default FaArrow;