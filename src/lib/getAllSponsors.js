const getAllSponsors = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/sponsors`,
        {
            cache: 'no-cache'
        }
    );
    return response.json()
};

export default getAllSponsors;