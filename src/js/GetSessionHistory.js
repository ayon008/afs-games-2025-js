'use client'
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// useGetSessionHistory: hook to fetch session history for a user
const useGetSessionHistory = (uid) => {
    const axiosSecure = useAxiosSecure();

    const query = useQuery({
        queryKey: ["sessionHistory", uid],
        queryFn: async () => {
            if (!uid) return null;
            try {
                const response = await axiosSecure.get(`/geoJson/${uid}`);
                return response.data;
            } catch (err) {
                console.error("Error fetching user data:", err);
                throw err;
            }
        },
        enabled: !!uid,
    });

    const sessionHistory = query.data ?? null;
    return { ...query, sessionHistory };
}

export default useGetSessionHistory;






// https://afs-backend-vhta.vercel.app/