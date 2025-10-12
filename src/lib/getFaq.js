const getFaq = async () => {
    const response = await fetch(`https://afs-backend-vhta.vercel.app//faq`, {
        cache: 'no-cache'
    });
    return response.json()
};

export default getFaq;