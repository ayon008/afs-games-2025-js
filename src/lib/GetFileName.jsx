'use client'
import useAuth from '@/Hooks/useAuth';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const GetFileName = () => {
    const axiosPublic = useAxiosPublic();
    const { user, loader } = useAuth();
    const [uid, setUid] = useState(null);
    useEffect(() => {
        const uid = user?.uid;
        setUid(uid);
    }, [user])

    const { isLoading, isError, error, data: files, refetch } = useQuery({
        queryKey: ['fileName', uid], // Include `uid` in queryKey to refetch if `uid` changes
        queryFn: async () => {
            try {
                const response = await axiosPublic.get(`/fileName/${uid}`);
                const data = await response.data;
                console.log(data, 'fileName');
                return data;
            } catch (err) {
                console.error("Error fetching user data:", err);
                throw err; // Rethrow the error to be caught by React Query
            }
        },
        // Only run this query once we know loading is finished and we have a uid
        enabled: !!uid && !loader,
        // Provide a default value so consumers don't have to check for undefined
        initialData: [],
    });

    return { isLoading, isError, error, files: files || [], refetch };
};

export default GetFileName;