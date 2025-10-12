const getUserLeaderBoard = async () => {
    const response = await fetch(`http://localhost:5000/totalPoints`,
        {
            cache:'no-cache'
        }
    );
    return response.json()
};

export default getUserLeaderBoard;