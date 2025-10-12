import { cookies } from 'next/headers'

const getUserInfo = async (uid) => {
    const cookieStore = cookies();
    const cookieObj = cookieStore.get('userToken');
    const token = cookieObj?.value;
    const response = await fetch(`https://afs-backend-vhta.vercel.app//user/${uid}`, {
        method: 'GET',  // Optional if GET is the default
        cache: 'no-cache',
        headers: {
            'authorization': `Bearer ${token}`,  // Add Authorization header
            'content-Type': 'application/json'   // Add other headers if needed
        }
    });

    return response.json();
};

export default getUserInfo;
