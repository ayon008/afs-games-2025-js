/* eslint-disable @next/next/no-img-element */
'use client'
import GetUserData from '@/lib/getUserData';
import React from 'react';

const UploadedUser = ({ uid }) => {
    const { isLoading, isError, error, userInfo } = GetUserData(uid);
    const uploadedBy = userInfo;
    return (
        <>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={uploadedBy?.photoURL}
                                alt="user-profile" />
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold">{uploadedBy?.displayName}</div>
                        <div className="text-sm opacity-50">{uploadedBy?.city} , {uploadedBy?.pays}</div>
                    </div>
                </div>
            </td>
            <td>
                {uploadedBy?.email}
            </td>
        </>
    );
};

export default UploadedUser;