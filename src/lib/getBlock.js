'use client'
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const GetBlock = () => {
    const axiosSecure = useAxiosSecure();
    const { isLoading, isError, error, data: dateRaw, refetch } = useQuery({
        queryKey: ['block'],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/targetedDate/6706bdd4a8317f059a67151a`);
                // Defensive: if response.data is not an object, return default
                if (!response.data || typeof response.data !== 'object') {
                    return { date: '', message: '' };
                }
                return response.data;
            } catch (err) {
                console.error("Error fetching user data:", err);
                // Return default object on error
                return { date: '', message: '' };
            }
        },
    });
    // Defensive: always return an object with date/message keys
    const date = dateRaw && typeof dateRaw === 'object' ? dateRaw : { date: '', message: '' };
    return { isLoading, isError, error, date, refetch };
}

export default GetBlock;