'use client'
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import React, { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';


const ExportGPXData = () => {
    const [data, setData] = useState([]);
    const axiosPublic = useAxiosPublic();
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        // setLoading(true);
        const fetch = async () => {
            const response = await axiosPublic.get('/gpxExcelData');
            const data = await response.data;
            setData(data);
            setLoading(false);
        }
        return () => fetch();
    }, [axiosPublic])

    const exportToExcel = () => {
        const worksheetData = data?.map((user, i) => ({
            category: user?.category,
            distance: user.distance,
            createdTime: user?.createdTime,
            uploadedTime: user?.lastUploadedTime,
            email: user?.email,
            uploadedBy: user?.name,
            spentTime:user?.totalTime,
            status: user.status,
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");

        // Create a custom filename with a timestamp
        const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
        const filename = `user_data_${timestamp}.xlsx`;

        // Download file
        XLSX.writeFile(workbook, filename);
    };
    return (
        <div>
            {
                isLoading ? <p>Loading....</p>
                    :
                    <button onClick={exportToExcel} className="download-table-xls-button text-white bg-green-600 btn">
                        Export Data to Excel Sheet
                    </button>
            }
        </div>
    )
};

export default ExportGPXData;
