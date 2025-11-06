'use client';
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCheck, FaPlus, FaTimes, FaTrashAlt, FaStrava } from 'react-icons/fa';
import Cloud from '@/icons/Cloud';
import * as toGeoJSON from 'togeojson';
import { DOMParser } from 'xmldom';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import calculateTotalTimeAndDistance from '@/js/calculateTotalTimeAndDistance';
import useAuth from '@/Hooks/useAuth';
import Swal from 'sweetalert2';
import GetFileName from '@/lib/GetFileName';
import gpx from '../../public/file.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GetUserData from '@/lib/getUserData';
import storeGPX from '@/js/storeGpx';
import storeGeojson from '@/js/storeGeojson';
import GetBlock from '@/lib/getBlock';
import { getStravaAuthUrl } from '@/lib/strava';
import { set } from 'react-hook-form';

const UploadGPX = ({ data }) => {
    const { user, loader } = useAuth();
    const [geojson, setGeojson] = useState(null);
    const [category, setCategory] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [importSource, setImportSource] = useState('device');
    const [stravaActivities, setStravaActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [loading, setLoading] = useState(false);

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const router = useRouter();

    // Only proceed with user-dependent operations after auth is loaded
    const { files, refetch } = GetFileName();
    const { isLoading, isError, error, userInfo } = !loader && user?.uid ?
        GetUserData(user.uid) :
        { isLoading: true, isError: false, error: null, userInfo: null };
    const isDisabled = userInfo?.approved;


    // Defensive: always have a fallback object
    const { date: blockData } = GetBlock();
    const [obj, setObj] = useState({ date: '', message: '' });

    useEffect(() => {
        if (blockData && typeof blockData === 'object') {
            setObj({
                date: blockData.date || '',
                message: blockData.message || '',
            });
        } else {
            setObj({ date: '', message: '' });
        }
    }, [blockData]);

    const currentDate = new Date();
    const september30 = obj?.date ? new Date(`${obj.date}`) : new Date('2099-12-31');

    const resetTime = (date) => {
        date.setHours(0, 0, 0, 0);
        return date;
    };

    const currentDateWithoutTime = resetTime(new Date(currentDate));
    const september30WithoutTime = resetTime(new Date(september30));

    // Show the alert if it's before September 30, 2024
    const showDateErrorAlert = () => {
        Swal.fire({
            text: `${obj?.message}`,
            heightAuto: false,
            confirmButtonColor: '#FFE500',
            customClass: {
                popup: 'custom-swal-popup'
            }
        });
    };

    // Strava auth handler
    const handleStravaAuth = () => {
        const authUrl = getStravaAuthUrl();
        window.location.href = authUrl;
    };

    // Handle Strava token refresh
    const refreshStravaToken = async (refreshToken) => {
        try {
            console.log('Refreshing token...');
            const response = await fetch('/api/strava/callback', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh_token: refreshToken })
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const data = await response.json();
            console.log('Token refreshed successfully');
            localStorage.setItem('stravaAccessToken', data.access_token);
            localStorage.setItem('stravaRefreshToken', data.refresh_token);
            localStorage.setItem('stravaTokenExpiry', data.expires_at);
            return data.access_token;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    };

    // Fetch Strava activities with debug and error UI
    const [stravaDebug, setStravaDebug] = useState({ step: '', error: '', tokens: {}, activities: [] });
    useEffect(() => {
        const fetchActivities = async () => {
            if (importSource !== 'strava' || loader || !user) return;

            setLoading(true);
            setStravaDebug(d => ({ ...d, step: 'Fetching tokens', error: '' }));
            try {
                const accessToken = localStorage.getItem('stravaAccessToken');
                const refreshToken = localStorage.getItem('stravaRefreshToken');
                const tokenExpiresAt = localStorage.getItem('stravaTokenExpiry');
                setStravaDebug(d => ({ ...d, tokens: { accessToken, refreshToken, tokenExpiresAt } }));

                if (!accessToken || !refreshToken) {
                    setStravaDebug(d => ({ ...d, error: 'No Strava tokens found. Please connect your Strava account.' }));
                    setLoading(false);
                    return;
                }

                // Check if token needs refresh
                let currentToken = accessToken;
                if (tokenExpiresAt && Date.now() / 1000 > parseInt(tokenExpiresAt)) {
                    setStravaDebug(d => ({ ...d, step: 'Refreshing Strava token...' }));
                    currentToken = await refreshStravaToken(refreshToken);
                }

                setStravaDebug(d => ({ ...d, step: 'Fetching Strava activities...' }));
                const response = await fetch(`/api/strava/activities?access_token=${currentToken}`);
                if (!response.ok) {
                    setStravaDebug(d => ({ ...d, error: `Failed to fetch activities: ${response.status}` }));
                    throw new Error(`Failed to fetch activities: ${response.status}`);
                }

                const activities = await response.json();
                setStravaDebug(d => ({ ...d, step: 'Activities fetched', activities }));
                setStravaActivities(activities || []);
            } catch (error) {
                setStravaDebug(d => ({ ...d, error: error.message || 'Unknown error' }));
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch Strava activities. Please try reconnecting.',
                });

                // Clear tokens on authentication error
                if (error.message && (error.message.includes('auth') || error.message.includes('401'))) {
                    localStorage.removeItem('stravaAccessToken');
                    localStorage.removeItem('stravaRefreshToken');
                    localStorage.removeItem('stravaTokenExpiry');
                    setStravaActivities([]);
                }
            }
            setLoading(false);
        };

        fetchActivities();
    }, [importSource, loader, user]);

    // Handle Strava activity selection
    const handleStravaActivitySelect = async (activity) => {
        setLoading(true);
        try {
            console.log('Selecting activity:', activity.id);
            const accessToken = localStorage.getItem('stravaAccessToken');
            if (!accessToken) {
                throw new Error('No access token found');
            }

            const response = await fetch(
                `/api/strava/activity/${activity.id}?access_token=${accessToken}`
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch activity data: ${response.status}`);
            }

            const gpxData = await response.text();
            console.log('GPX data received, parsing...');

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(gpxData, 'text/xml');
            const geojsonData = toGeoJSON.gpx(xmlDoc);

            if (!geojsonData || !geojsonData.features || geojsonData.features.length === 0) {
                throw new Error('Invalid GPX data received');
            }

            console.log('Setting activity data...');
            setGeojson(geojsonData);
            setSelectedActivity(activity);
            setUploadedFiles([{
                name: `strava_${activity.id}.gpx`,
                path: `strava_${activity.id}.gpx`,
                size: new Blob([gpxData]).size
            }]);
        } catch (error) {
            console.error('Error fetching activity GPX:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch activity data. Please try again.',
            });
            setSelectedActivity(null);
            setGeojson(null);
            setUploadedFiles([]);
        }
        setLoading(false);
    };

    const { getRootProps, getInputProps, acceptedFiles, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: '.gpx',
        multiple: false,
        maxSize: 10 * 1024 * 1024, // 10 MB
        onDrop: (files) => {
            setUploadedFiles(files);
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const gpxData = e.target.result;
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(gpxData, 'text/xml');
                const geojsonData = toGeoJSON.gpx(xmlDoc);
                setGeojson(geojsonData);
            };
            reader.readAsText(file);
        },
        disabled: !isDisabled
    });

    const getDropzoneStyle = () => {
        if (isDragActive) return 'border-blue-500';
        if (isDragReject) return 'border-red-500';
        if (isDragAccept) return 'border-green-500';
        return 'border-gray-300';
    };

    const handleSave = async () => {
        if (!category) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'A category must be selected.',
            });
            return;
        }

        if (geojson) {
            const { totalTime, totalDistance } = calculateTotalTimeAndDistance(geojson);
            const createdTime = geojson?.features[0]?.properties?.time;

            Swal.fire({
                title: 'Saving...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            try {
                const gpxURL = await storeGPX(uploadedFiles[0]);
                const geojsonURL = await storeGeojson(geojson, uploadedFiles[0]?.name);

                if (gpxURL && geojsonURL) {
                    await axiosPublic.post('/geoJson', {
                        totalTime,
                        distance: totalDistance,
                        uid: user?.uid,
                        category,
                        createdTime,
                        filename: uploadedFiles[0]?.name,
                        gpxURL,
                        geojsonURL,
                        time: new Date(),
                        status: true,
                    });

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Duration, distance, and filename have been successfully saved!',
                    });
                    refetch();
                    router.push(`/profile?uid=${user?.uid}`);
                    setGeojson(null);
                    setCategory('');
                    setUploadedFiles([]);
                } else {
                    throw new Error('Failed to store files');
                }
            } catch (error) {
                console.error('Error saving data:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to save the data.',
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No GeoJSON data to save.',
            });
        }
    };

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleting...',
                    text: 'Please wait while the file is being deleted',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                axiosSecure.delete(`/fileName/${id}`)
                    .then(response => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'The file has been deleted successfully.',
                        });
                        refetch();
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to delete the file. Please try again.',
                        });
                        console.error(error);
                    });
            }
        });
    };

    if (loader) {
        return <p>Loading ....</p>
    }

    return (
        <>
            {/* Import Source Toggle */}
            <div className="flex justify-center gap-4 my-6">
                <button
                    className={`btn ${importSource === 'device' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setImportSource('device')}
                >
                    Import from Device
                </button>
                <button
                    className={`btn ${importSource === 'strava' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'} flex items-center gap-2`}
                    onClick={() => setImportSource('strava')}
                >
                    <FaStrava size={20} />
                    Import from Strava
                </button>
            </div>

            {/* Device Upload UI */}
            {importSource === 'device' && (
                <div className='bg-white w-fit mx-auto 2xl:mt-10 xl:mt-6 mt-3 flex items-center justify-center'>
                    <div>
                        <div className={`2xl:w-[500px] xl:w-[500px] w-fit mx-auto ${getDropzoneStyle()} border-2 border-dashed p-6 rounded`}>
                            <div {...getRootProps({
                                onClick: (event) => {
                                    if (currentDateWithoutTime.getTime() < september30WithoutTime.getTime()) {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        showDateErrorAlert();
                                        return;
                                    }
                                },
                                onDragEnter: (event) => {
                                    if (currentDateWithoutTime.getTime() < september30WithoutTime.getTime()) {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        showDateErrorAlert();
                                        return;
                                    }
                                }
                            })} className='flex flex-col items-center justify-center w-full'>
                                <input {...getInputProps()} />
                                <Cloud />
                                <div className='my-6'>
                                    <h3 className='2xl:text-xl xl:text-base font-semibold text-center'>
                                        {isDragActive ? 'Drop the file here...' : 'Choose a file or drag it here'}
                                    </h3>
                                    <p className='2xl:text-lg xl:text-xs text-center font-semibold text-gray-400'>
                                        GPX formats up to 10 MB
                                    </p>
                                </div>
                                <button className='text-center flex w-fit mx-auto bg-[#FFE500] btn text-white' disabled={!isDisabled}>
                                    <span className='text-white'>Browse the file</span>
                                    <FaPlus className='mt-1' size={'0.8rem'} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Strava Import UI with debug/error output */}
            {importSource === 'strava' && (
                <div className="flex flex-col items-center justify-center my-10 w-full">
                    {/* Debug/Status Box */}
                    <div className="bg-gray-900 text-gray-100 p-4 rounded mb-4 w-full max-w-2xl">
                        <div className="mb-1"><b>Strava Import Debug</b></div>
                        <div><b>Step:</b> {stravaDebug.step}</div>
                        <div><b>Error:</b> <span className="text-red-400">{stravaDebug.error}</span></div>
                        <div><b>Tokens:</b> <span className="break-all">{JSON.stringify(stravaDebug.tokens)}</span></div>
                        <div><b>Activities:</b> {Array.isArray(stravaDebug.activities) ? stravaDebug.activities.length : 0}</div>
                    </div>
                    {!stravaActivities.length ? (
                        <button
                            className="btn bg-orange-500 text-white px-6 py-3 rounded shadow hover:bg-orange-600 flex items-center gap-2"
                            onClick={handleStravaAuth}
                            disabled={loading}
                        >
                            <FaStrava size={24} />
                            {loading ? 'Connecting...' : 'Connect with Strava'}
                        </button>
                    ) : (
                        <div className="w-full max-w-4xl">
                            <h3 className="text-xl font-semibold mb-4 text-white">Select an activity to import:</h3>
                            <div className="grid gap-4">
                                {stravaActivities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className={`p-4 border rounded cursor-pointer hover:border-orange-500 flex justify-between items-center ${selectedActivity?.id === activity.id ? 'border-orange-500 bg-orange-50' : 'bg-white'
                                            }`}
                                        onClick={() => handleStravaActivitySelect(activity)}
                                    >
                                        <div>
                                            <h4 className="font-semibold">{activity.name}</h4>
                                            <p className="text-sm text-gray-600">
                                                {new Date(activity.start_date).toLocaleDateString()} -
                                                {(activity.distance / 1000).toFixed(2)}km
                                            </p>
                                        </div>
                                        {selectedActivity?.id === activity.id && (
                                            <FaCheck className="text-green-500" size={20} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div>
                {uploadedFiles.length > 0 && (
                    <ul className='list-disc mt-4 w-fit mx-auto'>
                        {uploadedFiles?.map(file => (
                            <li key={file.path} className='text-white'>
                                {file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <p className={`${!isDisabled ? 'block' : 'hidden'} text-center text-red-600 font-semibold mt-6`}>
                Your account has not been approved yet
            </p>

            <div className='my-10'>
                {files?.map((f) => (
                    <div key={f._id} className='my-4 w-3/4 mx-auto flex justify-between'>
                        <div className='flex gap-2 items-center'>
                            <Image className='h-[32px] w-[32px]' alt="logo" src={gpx} />
                            <p className='text-white'>{f.filename}</p>
                        </div>
                        <div className='flex items-center gap-6'>
                            <p className={`${f?.status === true ? 'block' : 'hidden'} flex items-center gap-2`}>
                                <span className='text-white'>Complete</span>
                                <FaCheck color='green' />
                            </p>
                            <p className={`${f?.status === false ? 'block' : 'hidden'} flex items-center gap-2`}>
                                <span className='text-white'>Rejected</span>
                                <FaTimes color='red' />
                            </p>
                            <button onClick={() => handleDelete(f?._id)} className={`${f?.status && 'hidden'} btn`}>
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex items-center 2xl:flex-row xl:flex-row flex-col justify-between w-3/4 mx-auto 2xl:gap-2 xl:gap2 gap-y-6 2xl:mt-20 xl:mt-14 pb-20'>
                <div className="form-control relative">
                    <label className="label items-center justify-normal w-fit h-fit py-0 gap-1 absolute left-[12px] -top-[10px]">
                        <span className="label-text text-[#666] text-sm font-semibold py-0">Discipline </span>
                        <FaCheck size={'0.85rem'} color='#2A7029' />
                    </label>
                    <select
                        className="select select-bordered w-[300px] bg-black text-white"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="" disabled className='text-white'>Select a category</option>
                        <option className={`${userInfo?.Wingfoil || userInfo?.WatermanCrown ? 'block' : 'hidden'} uppercase text-white`} value={'Wingfoil'}>
                            wingfoil
                        </option>
                        <option className={`${userInfo?.Windfoil || userInfo?.WatermanCrown ? 'block' : 'hidden'} uppercase text-white`} value={'Windfoil'}>
                            windfoil
                        </option>
                        <option className={`${userInfo?.Dockstart ? 'block' : 'hidden'} uppercase text-white`} value={'dockstart'}>
                            dockstart
                        </option>
                        <option className={`${userInfo?.Surffoil ? 'block' : 'hidden'} uppercase text-white`} value={'surfFoil'}>
                            surf foil
                        </option>
                        <option className={`${userInfo?.Downwind ? 'block' : 'hidden'} uppercase text-white`} value={'dw'}>
                            downwind
                        </option>
                        <option className={`${userInfo?.Parawing ? 'block' : 'hidden'} uppercase text-white`} value={'Parawing'}>
                            Parawing
                        </option>
                    </select>
                </div>
                <div className='flex gap-2'>
                    <button className='uppercase text-gray-600 bg-gray-300 btn'>
                        cancel
                    </button>
                    <button onClick={handleSave} className='uppercase text-white bg-blue-500 btn'>
                        save
                    </button>
                </div>
            </div>
        </>
    );
};

export default UploadGPX;