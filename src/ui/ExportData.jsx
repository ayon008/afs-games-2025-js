import React from 'react';
import * as XLSX from 'xlsx';

const ExportData = ({data}) => {
    const exportToExcel = () => {
        const worksheetData = data?.map((user, i) => ({
            Name: user.displayName,
            City: user.city,
            Country: user.pays,
            Email: user.email,
            Invoice: user.invoiceURL || 'n/a',
            Wingfoil: user.Wingfoil ? 'participated' : 'n/a',
            Windfoil: user.Windfoil ? 'participated' : 'n/a',
            Dockstart: user.Dockstart ? 'participated' : 'n/a',
            Downwind: user.Downwind ? 'participated' : 'n/a',
            Surffoil: user.Surffoil ? 'participated' : 'n/a',
            WatermanCrown: user.WatermanCrown ? 'participated' : 'n/a',
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
            <button onClick={exportToExcel} className="download-table-xls-button text-white bg-green-600 btn">
                Export Data to Excel Sheet
            </button>
        </div>
    )
};

export default ExportData;