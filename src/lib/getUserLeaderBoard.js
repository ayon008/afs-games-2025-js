const getUserLeaderBoard = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/totalPoints`,
        {
            cache: 'no-cache'
        }
    );
    return response.json()
};

export default getUserLeaderBoard;