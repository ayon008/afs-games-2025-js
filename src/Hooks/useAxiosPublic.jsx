import axios from "axios";
const useAxiosPublic = () => {
    const instance = axios.create({
        baseURL: 'https://afs-backend-vhta.vercel.app',
    });
    return instance;
};

export default useAxiosPublic;

// https://afs-backend-vhta.vercel.app//