'use client';
import { useEffect, useState } from 'react';
import '../Components/faq.css'

const Description = ({ description }) => {
    const [sanitizedDescription, setSanitizedDescription] = useState('');

    useEffect(() => {
        // Dynamically import DOMPurify only on the client side
        const sanitizeHTML = async () => {
            const DOMPurify = (await import('dompurify')).default;
            setSanitizedDescription(DOMPurify.sanitize(description));
        };

        sanitizeHTML();
    }, [description]);

    return (
        <p
            className='2xl:text-[22px] xl:text-base text-xs mt-2 text-[#00000080] faq-des'
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }} // Render HTML safely
        />
    );
};

export default Description;
