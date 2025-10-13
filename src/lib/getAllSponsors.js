const getAllSponsors = async () => {
    const response = await fetch(`https://afs-backend-vhta.vercel.app/sponsors`,
        {
            cache: 'no-cache'
        }
    );
    return response.json()
};

export default getAllSponsors;