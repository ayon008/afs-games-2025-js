const getUserLeaderBoard = async () => {
    const response = await fetch(`https://afs-backend-vhta.vercel.app/totalPoints`,
        {
            cache:'no-cache'
        }
    );
    return response.json()
};

export default getUserLeaderBoard;