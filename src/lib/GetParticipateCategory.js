// 'use client'
// import useAxiosSecure from "@/Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";

// const GetParticipateCategory = (uid, category) => {
//     const axiosSecure = useAxiosSecure();
//     console.log(uid, category);

//     const { isLoading, isError, error, data, refetch } = useQuery({
//         // Include `uid` in queryKey to refetch if `uid` changes
//         queryFn: async () => {
//             try {
//                 const response = await axiosSecure.patch(`/changeCategory?category=${category}&uid=${uid}`);
//                 return response.data;
//             } catch (err) {
//                 console.error("Error fetching user data:", err);
//                 throw err; // Rethrow the error to be caught by React Query
//             }
//         },
//     });
//     return { isLoading, isError, error, data, refetch };
// }

// export default GetParticipateCategory;