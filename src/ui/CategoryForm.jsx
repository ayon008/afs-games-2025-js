import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CategoryForm = ({ user, refetch }) => {
    const { register, handleSubmit, reset, watch, setValue } = useForm();
    const axiosSecure = useAxiosSecure();
    const isWatermanCrownSelected = watch('WatermanCrown');
    const isWingfoilSelected = watch('Wingfoil');
    const isWindfoilSelected = watch('Windfoil');
    const isDownWindSelected = watch('DownWind');
    // Assuming the `user` is available for setting default values
    const onSubmit = async (data) => {
        try {
            // Show loading Swal
            Swal.fire({
                title: 'Saving...',
                text: 'Please wait while we update your categories.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Make the API request
            const response = await axiosSecure.patch(`/changeCategory/${user?._id}`, { ...data, uid: user?.uid });

            // Show success message when done
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your categories have been updated.',
            });
            refetch();
            console.log(response.data);
        } catch (error) {
            // Show error message in case of failure
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an issue updating your categories. Please try again.',
            });
            console.error(error);
        }
    };

    const categories = ['Wingfoil', 'Windfoil', 'Dockstart', 'Surffoil', 'Downwind', 'WatermanCrown'];

    // Reset form with default values based on user data
    useEffect(() => {
        if (user) {
            reset({
                Windfoil: user[`Windfoil`] || false,
                Wingfoil: user[`Wingfoil`] || false,
                Dockstart: user[`Dockstart`] || false,
                Downwind: user[`Downwind`] || false,
                Surffoil: user[`Surffoil`] || false,
                WatermanCrown: user[`WatermanCrown`] || false,
            });
        }

    }, [user, reset]);

    useEffect(() => {
        if (isWatermanCrownSelected) {
            // Set Wingfoil, Windfoil, and Downwind to true
            setValue('Wingfoil', true);
            setValue('Windfoil', true);
            setValue('Downwind', true);
            // Set the other categories to false
            setValue('Dockstart', false);
            setValue('Surffoil', false);
        }
        if (isWindfoilSelected && isWindfoilSelected && isDownWindSelected) {
            setValue('WatermanCrown', true);
        }
    }, [isWatermanCrownSelected, isWindfoilSelected, isDownWindSelected, isWingfoilSelected, setValue]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    categories?.map((category, i) => {
                        return (
                            <div key={i} className={`p-2 border-b-2 form-control border-black flex items-center flex-row gap-2`}>
                                <input
                                    id={i}
                                    type="checkbox"
                                    name={category}
                                    className="radio radio-warning"
                                    {...register(category)}
                                />
                                <label className='' htmlFor={category}>{category}</label>
                            </div>
                        )
                    })
                }
                <div className='py-4 pe-4 form-control'>
                    <input className='w-fit py-1 ml-auto btn bg-[#FFE500]' type='submit' value={'save'} />
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;
