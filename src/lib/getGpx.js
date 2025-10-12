'use client'
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const GetGpx = () => {
    const axiosSecure = useAxiosSecure();
    const { isLoading, isError, error, data: gpx, refetch } = useQuery({
        queryKey: ['gpx'],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/geoJson`);
                return response.data;
            } catch (err) {
                console.error("Error fetching user data:", err);
                throw err; // Rethrow the error to be caught by React Query
            }
        },
    });
    return { isLoading, isError, error, gpx, refetch };
}

export default GetGpx;








// https://afs-backend-vhta.vercel.app/