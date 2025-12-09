const getFaq = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/faq`, {
        cache: 'no-cache'
    });
    return response.json()
};

export default getFaq;